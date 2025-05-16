import { EnumStatusOptions } from "./Enums/Status";
import { IItem } from "./IItem";

// export interface INovoPedido{
//   produtos: Array<IProdutos>;
//   mesa: string;
// }

export interface INovoPedido {
  numero: number;
  status: EnumStatusOptions;
  itens: Array<IItem>;
}
