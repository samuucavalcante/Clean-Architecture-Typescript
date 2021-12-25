import { SavePurchases } from "@/domain/usecases/save-purshases";
import faker from 'faker';

export const mockPurchases = (): Array<SavePurchases.Params> => [
  {
    id: faker.datatype.uuid(),
    date: faker.date.recent(),
    value: faker.datatype.number()
  },
  {
    id: faker.datatype.uuid(),
    date: faker.date.recent(),
    value: faker.datatype.number()
  }
];
