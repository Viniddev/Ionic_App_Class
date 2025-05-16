import { IItem } from "./IItem";

export interface IItemComanda {
  id: string;
  numero: number;
  itens: Array<IItem>;
  total: number,
}

export interface IItemComandaResumida {
  numero: number;
  itens: Array<IItem>;
  total: number
}
