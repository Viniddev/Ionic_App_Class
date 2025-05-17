import { Status } from './../../../../node_modules/google-gax/node_modules/@grpc/grpc-js/src/constants';
import { IPedido } from 'src/@types/IPedido';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, getDoc, doc, updateDoc, query } from '@angular/fire/firestore';
import { INovoPedido } from 'src/@types/INovoPedido';
import { BehaviorSubject } from 'rxjs';
import { PEDIDOS } from 'src/utils/constants/backEndUrls';
import { MesasFirestoreService } from './mesas-firestore.service';
import { EnumStatusOptions } from 'src/@types/Enums/Status';
import { IItemComanda } from 'src/@types/IItemComanda';

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
    private mesasService: MesasFirestoreService
  ) {}

  notificarAtualizacao() {
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
    //sim, estou retornando duas coisas ao mesmo tempo
    return Array.from([...pedidos]);
  }

  async montarComandas(): Promise<IItemComanda[]> {
    if (!this.pedidos) return [];
    
    return this.pedidos.map(pedido => ({
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

  calculaTotal(pedido: IPedido) {
    let totalPedido = 0;

    for (const item of pedido.itens) {
      totalPedido += item.preco * item.quantidade;
    }
    return totalPedido;
  }
}
