import { CachePolicy, CacheStore } from "@/data/protocols/cache";
import { CacheStoreSpy } from "@/data/tests/mock-cache";
import { PurchaseModel } from "@/domain/models";
import { LoadPurchases, SavePurchases } from "@/domain/usecases";

export class LocalLoadPurchases implements SavePurchases, LoadPurchases {
  constructor(
    private readonly cacheStore: CacheStore,
    private readonly currentDate: Date,
    private readonly key = "purchases"
  ) {}
  async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    this.cacheStore.replace(this.key, {
      timestamp: this.currentDate,
      value: purchases
    });
  }

  async loadAll(): Promise<Array<LoadPurchases.Result>>{
    try {
      const cache = this.cacheStore.fetch(this.key);
      if(CachePolicy.validate(cache.timestamp, this.currentDate)) return cache.value;
      else throw new Error();
    } catch (err) {
      this.cacheStore.delete(this.key);
      return [];
    }
  }
}
