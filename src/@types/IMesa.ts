export interface IMesa {
    id: number;
    numero: number;
    status: string;
    itens: {
        quantidade: number;
        nome: string;
    }[];
}
  