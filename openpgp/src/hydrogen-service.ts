import axios, { AxiosInstance } from 'axios';
import pgpService from './pgp-service';
import { HydrogenTestPayloads } from './test-payload';

export interface HydrogenRequiredInfo {
  SessionID: string | number;
  DestinationInstitutionCode: number;
  ChannelCode: number;
}

export interface NameEnquiryPayload extends HydrogenRequiredInfo {
  AccountNumber: number;
}

export interface FundTransferPayload extends HydrogenRequiredInfo {
  NameEnquiryRef: string | number;
  BeneficiaryAccountName: string;
  BeneficiaryAccountNumber: string | number;
  BeneficiaryBankVerificationNumber: string | number;
  BeneficiaryKYCLevel: number;
  OriginatorAccountName: string;
  OriginatorAccountNumber: string | number;
  OriginatorBankVerificationNumber: string | number;
  OriginatorKYCLevel: number;
  TransactionLocation: string;
  Narration: string;
  PaymentReference: string;
  Amount: number;
}

export class HydrogenRestService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.HYDROGEN_BASE_URL,
    });
  }

  private async buildRequest(payload: NameEnquiryPayload | FundTransferPayload) {
    const request = await pgpService.encryptPayload(payload);
    return { request };
  }

  async nameEnquiry(payload: NameEnquiryPayload = HydrogenTestPayloads.nameEnquiryPayload) {
    const { data } = await this.axios.post<any>('ne', await this.buildRequest(payload));
    const { data: requestDataStr, ...rest } = data;
    const response = { ...rest, data: JSON.parse(requestDataStr) };
    console.log('Response -->', JSON.stringify(response, null, 2), '\n\n');
    return response;
  }

  async fundTransfer(payload: FundTransferPayload = HydrogenTestPayloads.fundTransferPayload) {
    const { data } = await this.axios.post<any>('ft', await this.buildRequest(payload));
    const { data: requestDataStr, ...rest } = data;
    const response = { ...rest, data: JSON.parse(requestDataStr) };
    console.log('Response -->', JSON.stringify(response, null, 2), '\n\n');
    return response;
  }
}

const hydrogenRestService = new HydrogenRestService();
export default hydrogenRestService;
