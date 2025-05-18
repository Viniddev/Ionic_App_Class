import { Status } from './../../../../node_modules/google-gax/node_modules/@grpc/grpc-js/src/constants';
import { IPedido } from 'src/@types/IPedido';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, getDoc, doc, updateDoc } from '@angular/fire/firestore';
import { INovoPedido } from 'src/@types/INovoPedido';
import { BehaviorSubject } from 'rxjs';
import { PEDIDOS } from 'src/utils/constants/backEndUrls';
import { MesasFirestoreService } from './mesas-firestore.service';
import { EnumStatusOptions } from 'src/@types/Enums/Status';
import { IItemComanda } from 'src/@types/IItemComanda';
import { IProdutos } from 'src/@types/IProdutos';
import { IItem } from 'src/@types/IItem';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PedidosFirestoreService {
  private atualizarPedidos = new BehaviorSubject<boolean>(false);
  atualizarPedidos$ = this.atualizarPedidos.asObservable();

  comandas: Array<IItemComanda> = [];
  pedidos: Array<IPedido> = [];

  constructor(
    private firestore: Firestore,
    private mesasService: MesasFirestoreService,
    private alertController: AlertController
  ) {}

  async notificarAtualizacao() {
    this.atualizarPedidos.next(true);
  }

  async getAllPedidosDocuments(): Promise<IPedido[]> {
    const collectionDocs = await getDocs(collection(this.firestore, PEDIDOS));

    let pedidos = collectionDocs.docs
      .filter((doc) => doc.data()['status'] !== 'Fechado')
      .map((doc) => {
        const pedido = doc.data();

        return {
          id: doc.id,
          numero: pedido['numero'],
          status: pedido['status'],
          itens: pedido['itens'],
        } as IPedido;
      });

    this.pedidos = Array.from([...pedidos]);

    return Array.from([...pedidos]);
  }

  async montarComandas(): Promise<IItemComanda[]> {
    if (!this.pedidos) return [];

    return this.pedidos.map((pedido) => ({
      id: pedido.id,
      numero: pedido.numero,
      itens: pedido.itens,
      total: this.calculaTotal(pedido),
    }));
  }

  async setNewPedidoDocuments(pedido: INovoPedido) {
    await addDoc(collection(this.firestore, PEDIDOS), pedido);
    await this.mesasService.bloqueiaMesa(pedido.numero);
  }

  async getPedidoDocumentById(documentId: string) {
    const pedido = await getDoc(doc(this.firestore, PEDIDOS, documentId));

    if (pedido.exists) {
      const data = pedido.data() as Omit<IPedido, 'id'>;
      return {
        id: pedido.id,
        numero: data.numero,
        status: data.status,
        itens: data.itens,
      };
    } else {
      return null;
    }
  }

  async closePedido(documentId: string, status: EnumStatusOptions) {
    const pedido = await getDoc(doc(this.firestore, PEDIDOS, documentId));
    if (pedido.exists) {
      await updateDoc(pedido.ref, {
        status: status,
      });
    }
  }

  async updateDocumentStatusByDocId(documentId: string, novoStatus: Status) {
    const pedido = await getDoc(doc(this.firestore, PEDIDOS, documentId));

    if (pedido.exists) {
      await updateDoc(pedido.ref, {
        status: novoStatus,
      });
      return pedido;
    } else {
      return null;
    }
  }

  async updateListaPedidos(documentId: string, novaLista: Array<IProdutos>) {
    const listaPedidoMapeado = novaLista.map((element: IProdutos) => {
      return {
        id: element.id,
        nome: element.nome,
        preco: element.preco,
        quantidade: element.quantidade,
      } as IItem;
    });

    const pedido = await getDoc(doc(this.firestore, PEDIDOS, documentId));

    if (pedido.exists) {
      await updateDoc(pedido.ref, {
        itens: listaPedidoMapeado,
      });
      return pedido;
    } else {
      return null;
    }
  }

  async cadastroPedido(
    ProdutosCardapio: Array<IProdutos>,
    mesaSelecionada: string
  ) {
    const lista: Array<IProdutos> = ProdutosCardapio.filter(
      (product: IProdutos) => product.quantidade > 0
    );

    if (lista.length > 0 && mesaSelecionada !== '') {
      mesaSelecionada = mesaSelecionada.replace(/\D/g, '');

      const pedido: INovoPedido = {
        numero: Number(mesaSelecionada),
        status: EnumStatusOptions.AguardandoConfirmacaoCozinha,
        itens: lista
          .filter((item) => item.quantidade > 0)
          .map((item) => ({
            id: item.id,
            nome: item.nome,
            quantidade: item.quantidade,
            preco: item.preco,
          })),
      };

      await this.setNewPedidoDocuments(pedido);
      this.notificarAtualizacao();
    } else {
      this.showAlert(
        'Dados inválidos',
        'É necessário informar o número da mesa e o pedido para finalizar.'
      );
    }
  }

  async editaPedido(
    ProdutosCardapio: Array<IProdutos>, 
    idPedido: string
  ) {
    const lista: Array<IProdutos> = ProdutosCardapio.filter(
      (product: IProdutos) => product.quantidade > 0
    );

    await this.updateListaPedidos(idPedido, lista);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['ok'],
    });

    await alert.present();
  }

  calculaTotal(pedido: IPedido) {
    let totalPedido = 0;

    for (const item of pedido.itens) {
      totalPedido += item.preco * item.quantidade;
    }
    return totalPedido;
  }
}
