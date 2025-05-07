import { IItemComanda } from "src/@types/IItemComanda";

export const ListaItens: Array<IItemComanda> = [
    {
      id: 1,
      numero: 11,
      itens: [
        { quantidade: 2, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Coca Cola Zero' }
      ],
      total: 100.00
    },
    {
      id: 2,
      numero: 3,
      itens: [
        { quantidade: 2, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Pizza Carne seca com Cream Cheese' },
        { quantidade: 1, nome: 'Coca Cola Zero' }
      ],
      total: 100.00
    },
    {
      id: 3,
      numero: 5,
      itens: [
        { quantidade: 4, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Coca Cola Lata' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ],
      total: 100.00
    },
    {
      id: 4,
      numero: 13,
      itens: [
        { quantidade: 2, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Pizza Carne Seca com Cream Cheese' },
        { quantidade: 1, nome: 'Coca Cola' },
        { quantidade: 1, nome: 'Guaraná Lata' }
      ],
      total: 100.00
    },
    {
      id: 5,
      numero: 7,
      itens: [
        { quantidade: 4, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ],
      total: 100.00
    },
    {
      id: 6,
      numero: 14,
      itens: [
        { quantidade: 3, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Coca Cola Lata' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ],
      total: 120.00
    }
  ];