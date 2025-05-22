import { EnumStatusOptions } from "./Enums/Status";
import { IItem } from "./IItem";

export interface INovoPedido {
  numero: number;
  status: EnumStatusOptions;
  itens: Array<IItem>;
  comandaId: string;
}
