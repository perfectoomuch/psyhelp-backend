export enum BidStatusEnum {
  IN_AGREEMENT = 'in_agreement',
  CANCELLED = 'cancelled',
  CONFIRMED = 'confirmed',
}

export interface BidFormInterface {
  local_id: number;
  question: string;
  field: string;
  answer: string[];
}

export interface BidCreateInterface {
  chat_id: number;
  specialist_id: string;
  form: BidFormInterface[];
}
