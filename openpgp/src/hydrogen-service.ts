import axios, { AxiosInstance } from 'axios';
import { ResponseCode } from './constants';
import pgpService from './pgp-service';
import { HydrogenTestPayloads } from './test-payload';

export interface HydrogenRequiredInfo {
  SessionID: string | number;
  DestinationInstitutionCode: number;
  ChannelCode: number;
}

export interface NameEnquiryPayload extends HydrogenRequiredInfo {
  AccountNumber: number | string;
}

export interface FundTransferPayload extends HydrogenRequiredInfo {
  NameEnquiryRef?: string | number;
  BeneficiaryAccountName: string;
  BeneficiaryAccountNumber: string | number;
  BeneficiaryBankVerificationNumber: string | number;
  BeneficiaryKYCLevel?: number;
  OriginatorAccountName: string;
  OriginatorAccountNumber: string | number;
  OriginatorBankVerificationNumber: string | number;
  OriginatorKYCLevel?: number;
  TransactionLocation?: string;
  Narration?: string;
  PaymentReference?: string;
  Amount: number;
}

export interface TransactionStatusQueryPayload {
  SourceInstitutionCode: string | number;
  ChannelCode: number;
  SessionID: string | number;
}

export class HydrogenRestService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.HYDROGEN_BASE_URL,
    });
  }

  private async buildRequest(payload: NameEnquiryPayload | FundTransferPayload | TransactionStatusQueryPayload) {
    const request = await pgpService.encryptPayload(payload);
    return { request };
  }

  private async decodeResponse(data: string) {
    const response = await pgpService.decryptResponse(data);
    return response;
  }

  private async makeRequest<T extends FundTransferPayload | TransactionStatusQueryPayload | NameEnquiryPayload>(
    method: 'ne' | 'ft' | 'tsq',
    payload: T,
  ) {
    const { data } = await this.axios.post<any>(method, await this.buildRequest(payload));
    let response: Record<string, unknown>;
    try {
      /**
       * If parsing the data succeeds, it's an indication that there's an error in the request parameter
       */
      const { data: requestDataStr, ...rest } = data;
      const jsonData = JSON.parse(requestDataStr);
      response = jsonData;
    } catch (error) {
      if ((error as Error).name === 'SyntaxError') {
        /**  When syntax error occurs in parsing the data it means the data is an Expected *Encoded Hexadecimal string. We go ahead to decode the string
         *
         *
         */
        const decoded = await this.decodeResponse(data.data);
        response = decoded;
      } else {
        /**
         * If the error is not a syntax error the we go ahead to raise the error
         */
        throw new Error(`Unexpected Error happened: ${(error as Error).message}`);
      }
    }

    console.log(`${this.constructor.name}: ${new ResponseCode(response.ResponseCode as any)}\n`);
    console.log('Response -->', JSON.stringify(response, null, 2), '\n\n');
    return response;
  }

  async nameEnquiry(payload: NameEnquiryPayload = HydrogenTestPayloads.nameEnquiryPayload) {
    return this.makeRequest('ne', payload);
  }

  async fundTransfer(payload: FundTransferPayload = HydrogenTestPayloads.fundTransferPayload) {
    return this.makeRequest('ft', payload);
  }

  async transactionStatusQuery(
    payload: TransactionStatusQueryPayload = HydrogenTestPayloads.transactionStatusQueryPayload,
  ) {
    return this.makeRequest('tsq', payload);
  }
}

const hydrogenRestService = new HydrogenRestService();
export default hydrogenRestService;
