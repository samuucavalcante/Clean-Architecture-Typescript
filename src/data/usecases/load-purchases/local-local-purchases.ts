import { CacheStore } from "@/data/protocols/cache";
import { CacheStoreSpy } from "@/data/tests/mock-cache";
import { PurchaseModel } from "@/domain/models";
import { LoadPurchases, SavePurchases } from "@/domain/usecases";

export class LocalLoadPurchases implements SavePurchases, LoadPurchases {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly timestamp: Date,
    private readonly key = "purchases"
  ) {}
  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.replace(this.key, {
      timestamp: this.timestamp,
      value: purchases
    });
  }

  async loadAll(): Promise<Array<LoadPurchases.Result>>{
    try {
      const cache = this.cacheStore.fetch(this.key);
      return  cache.value;
    } catch (err) {
      this.cacheStore.delete(this.key);
      return [];
    }
  }
}
