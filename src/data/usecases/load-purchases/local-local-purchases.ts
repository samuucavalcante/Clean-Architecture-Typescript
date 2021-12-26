import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "../../../domain/usecases/save-purshases";

export class LocalLoadPurchases implements SavePurchases {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly timestamp: Date,
    private readonly key = 'purchases'
  ) {}
  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.replace(this.key, {
      timestamp: this.timestamp,
      value: purchases
    });
  }

  async loadALl(): Promise<void> {
    this.cacheStore.fetch(this.key)
  }
}
