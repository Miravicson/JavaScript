// export enum ResponseCodes {
//   1 =
// }

export enum ResponseCodeEnum {
  APPROVED = '00',
  UNKNOWN_STATUS = '01',
  INVALID_SENDER = '03',
  DO_NOT_HONOR = '05',
  DORMANT_ACCOUNT = '06',
  INVALID_ACCOUNT = '07',
  ACCOUNT_NAME_MISMATCH = '08',
  REQUEST_IN_PROGRESS = '09',
}

export enum TransferChannel {
  BANK_TELLER = 1,
  INTERNET_BANKING = 2,
  MOBILE_PHONES = 3,
  POS_TERMINALS = 4,
  ATM = 5,
  WEB_PORTAL = 6,
  THIRD_PARTY_PLATFORM = 7,
  OTHER = 8,
}

const ReverseResponseCodeMap = new Map([
  ['00', 'Approved or completed successfully'],
  ['01', 'Status unknown, please wait for settlement report'],
  ['03', 'Invalid Sender'],
  ['05', 'Do not honor'],
  ['06', 'Dormant Account'],
  ['07', 'Invalid Account'],
  ['08', 'Account Name Mismatch'],
  ['09', 'Request processing in progress'],
  ['12', 'Invalid transaction'],
  ['13', 'Invalid Amount'],
  ['14', 'Invalid Batch Number'],
  ['15', 'Invalid Session or Record ID'],
  ['16', 'Unknown Bank Code'],
  ['17', 'Invalid Channel'],
  ['18', 'Wrong Method Call'],
  ['21', 'No action taken'],
  ['25', 'Unable to locate record'],
  ['26', 'Duplicate record'],
  ['30', 'Format error'],
  ['34', 'Suspected fraud'],
  ['35', 'Contact sending bank'],
  ['51', 'No sufficient funds'],
  ['57', 'Transaction not permitted to sender'],
  ['58', 'Transaction not permitted on channel'],
  ['61', 'Transfer limit Exceeded'],
  ['63', 'Security violation'],
  ['65', 'Exceeds withdrawal frequency'],
  ['68', 'Response received too late'],
  ['69', 'Unsuccessful Account/Amount block'],
  ['70', 'Unsuccessful Account/Amount unblock'],
  ['71', 'Empty Mandate Reference Number'],
  ['91', 'Beneficiary Bank not available'],
  ['92', 'Routing error'],
  ['94', 'Duplicate transaction'],
  ['96', 'System malfunction'],
  ['97', 'Timeout waiting for response from destination'],
]);

export class ResponseCode {
  constructor(private code: string) {}

  getMessage() {
    return ReverseResponseCodeMap.get(this.code) || `Unknown code with value of ${this.code}`;
  }

  isEqualTo(responseCodeEnum: ResponseCodeEnum) {
    return this.code === responseCodeEnum;
  }

  toString() {
    return `Response code of [${this.code}]; ${this.getMessage()}`;
  }
}
