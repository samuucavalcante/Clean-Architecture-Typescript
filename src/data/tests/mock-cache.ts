import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases/save-purshases";
export class CacheStoreSpy implements CacheStore {
  messages: Array<CacheStoreSpy.Message> = [];
  deleteKey: string;
  insertKey: string;
  insertValue: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.messages.push(CacheStoreSpy.Message.delete);
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.messages.push(CacheStoreSpy.Message.insert);
    this.insertKey = key;
    this.insertValue = value;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.delete)
      throw new Error();
    });
  }

  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.insert)
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Message {
    delete,
    insert
  }
}
