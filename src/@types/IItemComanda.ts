import { IItem } from "./IItem";

export interface IItemComanda {
  id: number;
  numero: number;
  itens: Array<IItem>;
  total: number,
}