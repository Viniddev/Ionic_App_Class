import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { IProdutos } from 'src/@types/IProdutos';
import { PRODUTOS } from 'src/utils/constants/backEndUrls';
import { ListaProdutos } from 'src/utils/mock/lista-produtos';

@Injectable({
  providedIn: 'root',
})
export class CardapioFirestoreService {
  ListaProdutos: Array<IProdutos>;

  constructor(private firestore: Firestore) {}

  get ListaProdutosDisponiveis(){
    return ListaProdutos;
  }

  async getCardapio() {
    const mesas = await getDocs(collection(this.firestore, PRODUTOS));

    let listaProdutos = mesas.docs.map((element: any) => {
      const produto: IProdutos = element.data();

      return {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        categoria: produto.categoria,
        quantidade: produto.quantidade,
        ingredientes: produto.ingredientes,
      } as IProdutos;
    });

    listaProdutos = listaProdutos.sort((a, b) => a.id - b.id);
    this.ListaProdutos = Array.from([...listaProdutos]);
    return Array.from([...listaProdutos]);
  }

  //pra inicializar os dados de cardapio no banco;
  async createPedidosCardapio() {
    const lista = ListaProdutos;

    lista.forEach(async (element: IProdutos) => {
      await addDoc(collection(this.firestore, PRODUTOS), element);
    });
  }
}
