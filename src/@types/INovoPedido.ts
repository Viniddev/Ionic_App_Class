import { IProdutos } from "./IProdutos";

export interface INovoPedido{
    produtos: Array<IProdutos>;
    mesa: string;
}