import { LocalSavePurchases } from "./local-save-purchases";
import { mockPurchases } from "../../tests/mock-purchases";
import { CacheStoreSpy } from "@/data/tests/mock-cache";

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore, timestamp);
  return {
    sut,
    cacheStore
  };
};

describe("LocalSavePurchases", () => {
  test("Should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();

    expect(cacheStore.messages).toEqual([]);
  });

  test("Should not insert new Cache if delete fails", () => {
    const { sut, cacheStore } = makeSut();
    cacheStore.simulateDeleteError();

    const promise = sut.save(mockPurchases());

    expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete]);
    expect(promise).rejects.toThrow();
  });

  test("Should insert new Cache if delete succeeds", async () => {
    const timestamp = new Date();
    const { sut, cacheStore } = makeSut();
    const purchases = mockPurchases();
    const promise = sut.save(purchases);

    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Message.delete,
      CacheStoreSpy.Message.insert
    ]);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.deleteKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual({
      timestamp,
      value: purchases
    });
    await expect(promise).resolves.toBeFalsy()
  });

  test("Should throw if insert throws", async () => {
    const { sut, cacheStore } = makeSut();

    cacheStore.simulateInsertError();

    const promise = sut.save(mockPurchases());

    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Message.delete,
      CacheStoreSpy.Message.insert
    ]);
    await expect(promise).rejects.toThrow();
  });
});
