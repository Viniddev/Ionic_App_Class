export interface IPedidosPorMesa {
    id: string;
    numero: number;
    status: string;
    itens: {
        quantidade: number;
        nome: string;
    }[];
}
