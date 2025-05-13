import { IItem } from "./IItem";
import { EnumStatusOptions } from "./Enums/Status";

export interface IPedido {
  id: number;
  numero: number;
  status: EnumStatusOptions;
  itens: Array<IItem>;
}

