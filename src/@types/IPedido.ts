import { IItem } from "./IItem";
import { EnumStatusOptions } from "./Enums/Status";

export interface IPedido {
  id: string,
  numero: number;
  status: EnumStatusOptions;
  itens: Array<IItem>;
}

