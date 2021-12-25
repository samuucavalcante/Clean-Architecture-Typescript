export interface SavePurshases {
  save(purshases: Array<SavePurshases.Params>): Promise<void>;

}
namespace SavePurshases {
  export type Params = {
    id: string;
    date: Date;
    value: number;
  }
}
