import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { TransferChannel } from './constants';
import { FundTransferPayload, NameEnquiryPayload, TransactionStatusQueryPayload } from './hydrogen-service';

export class HydrogenTestPayloads {
  private static channelCode = TransferChannel.POS_TERMINALS;
  private static destinationCode = 999999;
  private static accountNumbers: (number | string)[] = [1010101010, 1111111111, 2222222222, '0126850250'];
  private static sourceInstitutionCode: string = '090470'; // dot bank nibbs code

  private static nameEnquiryResponses = [
    {
      SessionId: '090470230830125817693396697852',
      DestinationInstitutionCode: '999999',
      ChannelCode: '4',
      AccountNumber: '0126850250',
      ResponseCode: '07',
    },
    {
      SessionId: '090470230829164851693324131383',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      AccountNumber: '1010101010',
      AccountName: 'Isobel Amber',
      BankVerificationNumber: '77777777777',
      ResponseCode: '00',
    },
    {
      SessionId: '090470230829165350693324430687',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      AccountNumber: '1111111111',
      AccountName: 'Morgan Freeman',
      BankVerificationNumber: '77777777777',
      ResponseCode: '00',
    },
    {
      SessionId: '090470230829165944693324784021',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      AccountNumber: '2222222222',
      AccountName: 'Michael Jackson',
      BankVerificationNumber: '77777777777',
      ResponseCode: '00',
    },
    {
      SessionId: '090470230830125615693396575458',
      DestinationInstitutionCode: '999999',
      ChannelCode: '4',
      AccountNumber: '2222222222',
      AccountName: 'Michael Jackson',
      BankVerificationNumber: '77777777777',
      ResponseCode: '00',
    },
    {
      SessionId: '090470230829165944693324784021',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      AccountNumber: 'DOT233535353435353',
      AccountName: 'Victor Anderson',
      BankVerificationNumber: 'DOT233535353435353',
      ResponseCode: '00',
    },
  ];

  private static fundTransferResponses = [
    {
      SessionId: '090470230829165559693324559000',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      Amount: '1000',
      BeneficiaryAccountName: 'Morgan Freeman',
      BeneficiaryAccountNumber: '1111111111',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Isobel Amber',
      OriginatorAccountNumber: '1010101010',
      OriginatorBankVerificationNumber: '77777777777',
      ResponseCode: '61',
    },
    {
      SessionId: '090470230829170559693325159730',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      Amount: '1000',
      BeneficiaryAccountName: 'Michael Jackson',
      BeneficiaryAccountNumber: '2222222222',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Morgan Freeman',
      OriginatorAccountNumber: '1111111111',
      OriginatorBankVerificationNumber: '77777777777',
      ResponseCode: '61',
    },
    {
      SessionId: '090470230829170647693325207980',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      Amount: '1000',
      BeneficiaryAccountName: 'Isobel Amber',
      BeneficiaryAccountNumber: '1010101010',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Morgan Freeman',
      OriginatorAccountNumber: '1111111111',
      OriginatorBankVerificationNumber: '77777777777',
      ResponseCode: '61',
    },
    {
      SessionId: '090470230829171008693325408439',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      Amount: '10',
      BeneficiaryAccountName: 'Michael Jackson',
      BeneficiaryAccountNumber: '2222222222',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Isobel Amber',
      OriginatorAccountNumber: '1010101010',
      OriginatorBankVerificationNumber: '77777777777',
      ResponseCode: '61',
    },
    {
      SessionId: '090470230829171059693325459102',
      DestinationInstitutionCode: '999999',
      ChannelCode: '1',
      Amount: '10',
      BeneficiaryAccountName: 'Isobel Amber',
      BeneficiaryAccountNumber: '1010101010',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Michael Jackson',
      OriginatorAccountNumber: '2222222222',
      OriginatorBankVerificationNumber: '77777777777',
      ResponseCode: '61',
    },
    {
      SessionId: '090470230829172407693326247153',
      DestinationInstitutionCode: '999999',
      ChannelCode: '4',
      Amount: '10',
      BeneficiaryAccountName: 'Isobel Amber',
      BeneficiaryAccountNumber: '1010101010',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Michael Jackson',
      OriginatorAccountNumber: '2222222222',
      OriginatorBankVerificationNumber: '77777777777',
      ResponseCode: '61',
    },
    {
      SessionId: '090470230830084305693381385560',
      DestinationInstitutionCode: '999999',
      ChannelCode: '4',
      Amount: '10',
      BeneficiaryAccountName: 'Morgan Freeman',
      BeneficiaryAccountNumber: '1111111111',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Michael Jackson',
      OriginatorAccountNumber: '2222222222',
      OriginatorBankVerificationNumber: '77777777777',
      OriginatorKycLevel: '1',
      ResponseCode: '00',
    },
    {
      SessionId: '090470230830123738693395458368',
      DestinationInstitutionCode: '999999',
      ChannelCode: '4',
      Amount: '1000',
      BeneficiaryAccountName: 'Morgan Freeman',
      BeneficiaryAccountNumber: '1111111111',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Victor Anderson',
      OriginatorAccountNumber: 'DOT233535353435353',
      OriginatorBankVerificationNumber: 'DOT233535353435353',
      OriginatorKycLevel: '1',
      ResponseCode: '00',
    },
    {
      SessionId: '090470230830125523693396523167',
      DestinationInstitutionCode: '999999',
      ChannelCode: '4',
      Amount: '1000',
      BeneficiaryAccountName: 'Morgan Freeman',
      BeneficiaryAccountNumber: '1111111111',
      BeneficiaryBankVerificationNumber: '77777777777',
      BeneficiaryKycLevel: '1',
      OriginatorAccountName: 'Victor Anderson',
      OriginatorAccountNumber: 'DOT233535353435353',
      OriginatorBankVerificationNumber: 'DOT233535353435353',
      OriginatorKycLevel: '1',
      ResponseCode: '00',
    },
  ];

  private static statusQueryResponses = [
    {
      SessionId: '090470230830084305693381385560',
      ChannelCode: '4',
      SourceInstitutionCode: '090470',
      ResponseCode: '00',
    },
    {
      SessionId: '090470230830123738693395458368',
      ChannelCode: '4',
      SourceInstitutionCode: '090470',
      ResponseCode: '00',
    },
  ];

  private static originatorIdx = this.nameEnquiryResponses.length - 1;
  private static beneficiaryIdx = 1;

  private static createSessionId() {
    const timeString = format(new Date(), 'yyMMddHHmmss');
    const twelveCharRandStr = nanoid(12);
    const twelveCharRandNum = Number(`${Date.now()}`.slice(1));

    return `${this.sourceInstitutionCode}${timeString}${twelveCharRandNum}`;
  }

  static nameEnquiryPayload: NameEnquiryPayload = {
    SessionID: this.createSessionId(),
    DestinationInstitutionCode: this.destinationCode,
    ChannelCode: this.channelCode,
    AccountNumber: this.accountNumbers[this.accountNumbers.length - 1],
  };

  static fundTransferPayload: FundTransferPayload = {
    SessionID: this.createSessionId(),
    ChannelCode: this.channelCode,
    DestinationInstitutionCode: this.destinationCode,
    // Amount
    Amount: 1000,
    // Beneficiary details
    BeneficiaryAccountName: this.nameEnquiryResponses[this.beneficiaryIdx].AccountName,
    BeneficiaryAccountNumber: this.nameEnquiryResponses[this.beneficiaryIdx].AccountNumber,
    BeneficiaryBankVerificationNumber: this.nameEnquiryResponses[this.beneficiaryIdx].BankVerificationNumber,
    BeneficiaryKYCLevel: 1,
    // Originator details
    OriginatorAccountName: this.nameEnquiryResponses[this.originatorIdx].AccountName,
    OriginatorAccountNumber: this.nameEnquiryResponses[this.originatorIdx].AccountNumber,
    OriginatorBankVerificationNumber: this.nameEnquiryResponses[this.originatorIdx].BankVerificationNumber,
    // NameEnquiryRef: 'adfdaeetateegds',
    // Narration: 'Testing fund transfer',
    // OriginatorKYCLevel: 1,
    // PaymentReference: '23533535353sagagdgdg',
    // TransactionLocation: '62.23533,23535336',
  };

  static transactionStatusQueryPayload: TransactionStatusQueryPayload = {
    ChannelCode: this.channelCode,
    SessionID: this.fundTransferResponses[this.fundTransferResponses.length - 1].SessionId,
    SourceInstitutionCode: this.sourceInstitutionCode,
  };
}
