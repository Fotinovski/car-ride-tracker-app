export interface IUserAndCount {
  user: string;
  count: number;
}

export interface IAllRecords {
  records: IRecord[];
  total: number;
}

export interface IRecord {
  log_id?: number;
  user: string;
  timestamp: Date;
}
