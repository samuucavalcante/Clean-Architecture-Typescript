import { PurchaseModel } from "../models";


export interface SavePurchases {
  save(purshases: Array<SavePurchases.Params>): Promise<void>;

}
export namespace SavePurchases {
  export type Params = PurchaseModel
}
