import { IProdutos } from "src/@types/IProdutos"

export const ListaProdutos: Array<IProdutos> = [
  {
    id: 0,
    nome: 'Pão de queijo Rio de Janeiro',
    ingredientes:
      'Polvilho, queijo minas, leite, ovos, óleo vegetal, sal, fermento e margarina.',
    preco: 120,
  },
  {
    id: 1,
    nome: 'Pão de queijo Minas Gerais',
    ingredientes:
      'Polvilho azedo, queijo meia cura, leite integral, ovos, óleo de soja e sal.',
    preco: 123,
  },
  {
    id: 2,
    nome: 'Pão de queijo São Paulo',
    ingredientes:
      'Queijo prato, polvilho doce, leite, manteiga, sal e ovos caipiras.',
    preco: 112,
  },
  {
    id: 3,
    nome: 'Pão de queijo Espírito Santo',
    ingredientes:
      'Polvilho, queijo parmesão, leite fresco, ovos, óleo de girassol, sal e fermento.',
    preco: 100,
  },
];