export interface LoadPurchases {
  loadAll(): Promise<Array<LoadPurchases.Result>>;

}
export namespace LoadPurchases {
  export type Result = {
    id: string;
    date: Date;
    value: number;
  }
}
