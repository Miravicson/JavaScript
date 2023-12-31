import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { In, Repository } from 'typeorm';

import { Transaction, TransactionStatusCode, TransactionStatusMessage } from '@/entity/Transaction';

import { saveJsonAsCsv } from './csvParser';

const outputDir = path.resolve(__dirname, path.join('../scripts', 'output'));

export class TransactionService {
  constructor(private readonly repository: Repository<Transaction>) {}

  private async exportToJson(data: Record<string, any> | Array<any>) {
    const filename = path.resolve(outputDir, `backup-${Date.now()}-.json`);
    await writeFile(filename, JSON.stringify(data, null, 2));
  }
  private async exportToCsv(data: Record<string, any> | Array<any>) {
    const filename = path.resolve(outputDir, `backup-${Date.now()}-.csv`);
    await saveJsonAsCsv(filename, data);
  }

  async getTransactionByReference(transactionReference: string): Promise<Transaction | null> {
    return this.repository.findOneBy({
      transactionReference,
    });
  }

  async bulkBackupData(references: string[]): Promise<Transaction[]> {
    const transactions = await this.repository
      .createQueryBuilder('transaction')
      .where('transaction.transactionReference IN (:...references)', { references })
      .getMany();
    await this.exportToJson(transactions);
    await this.exportToCsv(transactions);
    return transactions;
  }

  async bulkUpdateStatusToFailed(references: string[]) {
    const status = { statusCode: TransactionStatusCode.FAILED, statusMessage: TransactionStatusMessage.FAILED };
    await this.bulkUpdateStatus(status, references);
  }

  async bulkUpdateStatusToSuccess(references: string[]) {
    const status = { statusCode: TransactionStatusCode.SUCCESS, statusMessage: TransactionStatusMessage.SUCCESS };
    await this.bulkUpdateStatus(status, references);
  }

  async bulkUpdateStatus(
    status: { statusCode: TransactionStatusCode; statusMessage: TransactionStatusMessage },
    references: string[],
  ) {
    await this.repository
      .createQueryBuilder()
      .update(Transaction)
      .set({
        statusCode: status.statusCode,
        statusMessage: status.statusMessage,
        isResolved: true,
      })
      .where({ transactionReference: In(references) })
      .execute();
  }

  async updateReferencesToStatus(status: 'failed' | 'success') {
    const inputFile = path.resolve(__dirname, path.join('../scripts', 'input.txt'));
    const fileContent = await readFile(inputFile, { encoding: 'utf8' });
    if (!fileContent) {
      return;
    }

    const references = fileContent.split('\n');
    await this.bulkBackupData(references);

    if (status === 'failed') {
      await this.bulkUpdateStatusToFailed(references);
    } else {
      await this.bulkUpdateStatusToSuccess(references);
    }
  }
}
