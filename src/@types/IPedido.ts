import { IItem } from "./IItem";

export interface IPedido {
  id: number;
  numero: number;
  status: 'Pronto' | 'Em Produção' | 'Aguardando confirmação' | 'Aguardando confirmação da cozinha';
  itens: Array<IItem>;
}

