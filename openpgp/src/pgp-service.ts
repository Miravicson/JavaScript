import path from 'node:path';
import * as openpgp from 'openpgp';
import { readTxt, saveOutput } from './utils';

interface GenerateKeyPairsOptions {
  name: string;
  email: string;
}

export class PgpService {
  private PUBLIC_KEY_STRING: string;

  constructor() {
    this.PUBLIC_KEY_STRING = readTxt(path.resolve(__dirname, './encryption-keys/hydrogen-public.key'));
  }

  private async encryptMessage(message: string) {
    const publicKey = await openpgp.readKey({ armoredKey: this.PUBLIC_KEY_STRING });
    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: message }),
      encryptionKeys: publicKey,
      format: 'binary',
    });

    const encryptedHex = Buffer.from(encrypted as Uint8Array).toString('hex');
    console.log(`${this.constructor.name}: EncryptedInformation -->\n`, encryptedHex, '\n\n');
    return encryptedHex;
  }

  async encryptPayload<T extends Object>(payload: T) {
    return this.encryptMessage(JSON.stringify(payload));
  }

  async decryptMessage(message: string) {}

  /**
   * Used to generate pgp public and private keys
   * Example:  pgpService.generateKeyPairs({ name: 'Victor Ughonu', email: 'vcu@dot.ai' });
   *
   * Saves the public and private key in the directory '../output'
   *
   * @param GenerateKeyPairsOptions
   * @returns undefined
   *
   */
  async generateKeyPairs(options: GenerateKeyPairsOptions) {
    const { privateKey, publicKey } = await openpgp.generateKey({
      userIDs: [options],
      curve: 'ed25519',
      passphrase: process.env.PGP_KEY_PASS_PHRASE!,
    });

    saveOutput(privateKey, 'private-key.key');
    saveOutput(publicKey, 'public-key.key');
  }
}

const pgpService = new PgpService();
export default pgpService;
