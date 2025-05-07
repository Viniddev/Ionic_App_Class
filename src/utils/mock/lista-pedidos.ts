import { IPedido } from "src/@types/IPedido";

export const ListaPedidos: Array<IPedido> = [
    {
      id: 1,
      numero: 11,
      status: 'Pronto',
      itens: [
        { quantidade: 2, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Coca Cola Zero' }
      ]
    },
    {
      id: 2,
      numero: 3,
      status: 'Pronto',
      itens: [
        { quantidade: 2, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Pizza Carne seca com Cream Cheese' },
        { quantidade: 1, nome: 'Coca Cola Zero' }
      ]
    },
    {
      id: 3,
      numero: 5,
      status: 'Em Produção',
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
      status: 'Em Produção',
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
      status: 'Em Produção',
      itens: [
        { quantidade: 4, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ]
    },
    {
      id: 6,
      numero: 14,
      status: 'Aguardando confirmação da cozinha',
      itens: [
        { quantidade: 3, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Coca Cola Lata' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ]
    }
]