import { IItem } from "./IItem";
import { StatusOptions } from "./Status";

export interface IPedido {
  id: number;
  numero: number;
  status: StatusOptions;
  itens: Array<IItem>;
}

