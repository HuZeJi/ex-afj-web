export class Movement {
  amount!: number;
  createdDate!: Date;
  description!: string;
  status!: boolean;
  transactionType!: number;
  userMail!: string;

  constructor(source?: any) {
    this.amount = source?.amount || 0;
    this.createdDate = source?.createdDate || new Date();
    this.description = source?.description || '';
    this.status = source?.status || true;
    this.transactionType = source?.transactionType || 0;
    this.userMail = source?.userMail || '';
  }
}
