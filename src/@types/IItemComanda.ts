import { IItem } from "./IItem";

export interface IItemComanda {
  id: string;
  numero: number;
  itens: Array<IItem>;
  total: number;
  pedidos: Array<string>;
}

export interface IItemComandaResumida {
  numero: number;
  itens: Array<IItem>;
  total: number
}
