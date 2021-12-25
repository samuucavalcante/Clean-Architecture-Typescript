export interface SavePurchases {
  save(purshases: Array<SavePurchases.Params>): Promise<void>;

}
export namespace SavePurchases {
  export type Params = {
    id: string;
    date: Date;
    value: number;
  }
}
