import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


export enum TransactionStatusMessage {
  FAILED = "FAILED",
}

export enum TransactionStatusCode {
  FAILED = '06'
}

@Entity({
  name: 'transactions',
  synchronize: false,
})
@Index('idx_transactions_account_all_count', ['transactionReference', 'fromAccountId', 'toAccountId', 'createdAt'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid', { name: 'transaction_id' })
  transactionId: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'transaction_reference',
    unique: true,
  })
  transactionReference: string;

  @Column({
    type: 'numeric',
    nullable: false,
    name: 'amount',
  })
  amount: number;

  @Column({
    type: 'numeric',
    nullable: false,
    name: 'billed_amount',
  })
  billedAmount: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'from_account_id',
  })
  fromAccountId: string;

  @Column({
    name: 'transaction_type',
    type: 'varchar',
    length: 50,
  })
  transactionType: string;

  @Column({
    name: 'transaction_mode',
    type: 'varchar',
    length: 50,
  })
  transactionMode: string;

  @Column({
    name: 'transaction_medium',
    type: 'varchar',
    length: 50,
  })
  transactionMedium: string;

  @Column({
    name: 'to_bank_name',
    type: 'varchar',
    length: 100,
  })
  toBankName: string;

  @Column({
    name: 'to_bank_account_number',
    type: 'varchar',
    length: 20,
  })
  toBankAccountNumber: string;

  @Column({
    name: 'to_bank_account_name',
    type: 'varchar',
    length: 100,
  })
  toBankAccountName: string;

  @Column({
    name: 'verified',
    type: 'bool',
  })
  isVerified: boolean;

  @Column({
    name: 'to_account_id',
    type: 'varchar',
    length: 50,
  })
  toAccountId: string;

  @Column({
    name: 'description',
    type: 'text',
  })
  description: string;

  @Column({
    name: 'rrn',
    type: 'varchar',
    length: 50,
  })
  RRN: string;

  @Column({
    name: 'masked_pan',
    type: 'varchar',
    length: 50,
  })
  maskedPan: string;

  @Column({
    name: 'stan',
    type: 'varchar',
    length: 50,
  })
  stan: string;

  @Column({
    name: 'route',
    type: 'varchar',
    length: 50,
  })
  route: string;

  @Column({
    name: 'request_time',
    type: 'varchar',
    length: 50,
  })
  requestTime: string;

  @Column({
    name: 'app_version',
    type: 'varchar',
    length: 50,
  })
  appVersion: string;

  @Column({
    name: 'status_code',
    type: 'varchar',
    length: 10,
  })
  statusCode: string;

  @Column({
    name: 'status_message',
    type: 'text',
  })
  statusMessage: string;

  @Column({
    name: 'aid',
    type: 'varchar',
    length: 50,
  })
  aid: string;

  @Column({
    name: 'card_holder',
    type: 'varchar',
    length: 100,
  })
  cardHolder: string;

  @Column({
    name: 'expiry',
    type: 'varchar',
    length: 50,
  })
  expiry: string;

  @Column({
    name: 'sequence_number',
    type: 'varchar',
    length: 50,
  })
  sequenceNumber: string;

  @Column({
    name: 'terminal_id',
    type: 'varchar',
    length: 50,
  })
  terminalId: string;

  @Column({
    name: 'tender_type',
    type: 'varchar',
    length: 50,
  })
  tenderType: string;

  @Column({
    name: 'account_type',
    type: 'varchar',
    length: 50,
  })
  accountType: string;

  @Column({
    name: 'location',
    type: 'varchar',
    length: 50,
  })
  location: string;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  createdBy: string;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  updatedBy: string;

  @Column({
    name: 'transfer_request',
    type: 'text',
  })
  transferRequest: string;

  @Column({
    name: 'transfer_response',
    type: 'text',
  })
  transferResponse: string;

  @Column({
    name: 'session_id',
    type: 'varchar',
    length: 100,
  })
  sessionId: string;

  @Column({
    name: 'transaction_fee',
    type: 'numeric',
    default: 0,
  })
  transactionFee: number;

  @Column({
    name: 'aggregator_commission',
    type: 'numeric',
    default: 0,
  })
  aggregatorCommission: number;

  @Column({
    name: 'commissioned',
    type: 'bool',
    default: false,
  })
  isCommissioned: boolean;

  @Column({
    name: 'aggregator',
    type: 'varchar',
    length: 50,
  })
  aggregator: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({
    name: 'resolution',
    type: 'bool',
    default: false,
  })
  isResolved: boolean;

  @Column({
    name: 'reference_to',
    type: 'varchar',
    length: 50,
  })
  referenceTo: string;

  @Column({
    name: 'serial_no',
    type: 'varchar',
    length: 50,
  })
  serialNumber: string;

  @Column({
    name: 'transaction_time',
    type: 'varchar',
    length: 50,
  })
  transactionTime: string;

  @Column({
    name: 'merchant_id',
    type: 'varchar',
    length: 50,
  })
  merchantId: string;

  @Column({
    name: 'investor',
    type: 'varchar',
    length: 15,
  })
  investor: string;

  @Column({
    name: 'comment',
    type: 'varchar',
    length: 50,
  })
  comment: string;

  @Column({
    name: 'to_bank_code',
    type: 'varchar',
    length: 10,
  })
  toBankCode: string;

  @Column({
    name: 'external_reference',
    type: 'varchar',
    length: 120,
  })
  externalReference: string;

  @Column({
    name: 'flow',
    type: 'varchar',
    length: 30,
  })
  flow: string;

  @Column({
    name: 'currency',
    type: 'varchar',
    length: 3,
    default: 'NGN',
  })
  currency: string;

  @BeforeInsert()
  updateBothDates() {
    const now = new Date();
    this.createdAt = this.updatedAt = now;
  }

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = new Date();
  }
}
