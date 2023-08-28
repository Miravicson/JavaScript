import { FundTransferPayload, NameEnquiryPayload, TransactionStatusQueryPayload } from './hydrogen-service';

export class HydrogenTestPayloads {
  private static channelCode = 1;
  private static destinationCode = 999999;
  private static accountNumbers: number[] = [1010101010, 1111111111, 2222222222];
  private static sourceInstitutionCode: string = '000002';

  static nameEnquiryPayload: NameEnquiryPayload = {
    SessionID: Date.now().toString(),
    DestinationInstitutionCode: this.destinationCode,
    ChannelCode: this.channelCode,
    AccountNumber: this.accountNumbers[0],
  };

  static fundTransferPayload: FundTransferPayload = {
    Amount: 1000,
    BeneficiaryAccountName: 'Anderson Smith',
    BeneficiaryAccountNumber: '0727240486',
    BeneficiaryBankVerificationNumber: '223335353',
    BeneficiaryKYCLevel: 1,
    ChannelCode: this.channelCode,
    DestinationInstitutionCode: this.destinationCode,
    NameEnquiryRef: 'adfdaeetateegds',
    Narration: 'Testing fund transfer',
    OriginatorAccountName: 'Anderson Smith',
    OriginatorAccountNumber: '0126852353',
    OriginatorBankVerificationNumber: '23353535353',
    OriginatorKYCLevel: 1,
    PaymentReference: '23533535353sagagdgdg',
    SessionID: Date.now().toString(),
    TransactionLocation: '62.23533,23535336',
  };

  static transactionStatusQueryPayload: TransactionStatusQueryPayload = {
    ChannelCode: this.channelCode,
    SessionID: Date.now().toString(),
    SourceInstitutionCode: this.sourceInstitutionCode,
  };
}
