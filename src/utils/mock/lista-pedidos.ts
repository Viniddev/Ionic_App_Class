import { IPedido } from "src/@types/IPedido";
import { StatusOptions } from "src/@types/Status";

export const ListaPedidos: Array<IPedido> = [
    {
      id: 1,
      numero: 11,
      status: StatusOptions.Pronto,
      itens: [
        { quantidade: 2, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Coca Cola Zero' }
      ]
    },
    {
      id: 2,
      numero: 3,
      status: StatusOptions.Pronto,
      itens: [
        { quantidade: 2, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Pizza Carne seca com Cream Cheese' },
        { quantidade: 1, nome: 'Coca Cola Zero' }
      ]
    },
    {
      id: 3,
      numero: 5,
      status: StatusOptions.EmProdutocao,
      itens: [
        { quantidade: 4, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Coca Cola Lata' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ]
    },
    {
      id: 4,
      numero: 13,
      status: StatusOptions.EmProdutocao,
      itens: [
        { quantidade: 2, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Pizza Carne Seca com Cream Cheese' },
        { quantidade: 1, nome: 'Coca Cola' },
        { quantidade: 1, nome: 'Guaraná Lata' }
      ]
    },
    {
      id: 5,
      numero: 7,
      status: StatusOptions.EmProdutocao,
      itens: [
        { quantidade: 4, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ]
    },
    {
      id: 6,
      numero: 14,
      status: StatusOptions.AguardandoConfirmacaoCozinha,
      itens: [
        { quantidade: 3, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Coca Cola Lata' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ]
    }
]
