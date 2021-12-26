import { LocalLoadPurchases } from "./local-local-purchases";
import { mockPurchases } from "../../tests/mock-purchases";
import { CacheStoreSpy } from "@/data/tests/mock-cache";

type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);
  return {
    sut,
    cacheStore
  };
};

describe("LocalSavePurchases", () => {
  test("Should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.actions).toEqual([]);
  });

  test("Should call correct key on load", async () => {
    const { cacheStore, sut } = makeSut();

    await sut.loadALl()

    expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.fetch]);
    expect(cacheStore.fetchKey).toBe('purchases');
  });
});
