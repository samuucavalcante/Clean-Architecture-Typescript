import { SavePurchases } from "../../../domain/usecases/save-purshases";
export interface CacheStore {
  delete(key: string): void;
  insert(key: string, value: any): void;
}
