import { Status } from './../../../../node_modules/google-gax/node_modules/@grpc/grpc-js/src/constants';
import { IPedido } from 'src/@types/IPedido';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, getDoc, doc, updateDoc } from '@angular/fire/firestore';
import { INovoPedido } from 'src/@types/INovoPedido';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosFirestoreService {
  document = "pedidos";
  private atualizarPedidos = new BehaviorSubject<boolean>(false);

  atualizarPedidos$ = this.atualizarPedidos.asObservable();

  constructor(private firestore: Firestore) { }

  notificarAtualizacao() {
    this.atualizarPedidos.next(true);
  }

  async getAllPedidosDocuments(): Promise<IPedido[]> {
    const collectionDocs = await getDocs(collection(this.firestore, this.document));

    const pedidos = collectionDocs.docs.map(doc => {
      const pedido = doc.data()

      return {
        id: doc.id,
        numero: pedido['numero'],
        status: pedido['status'],
        itens: pedido['itens']
      } as IPedido;
    });

    return pedidos;
  }

  async setNewPedidoDocuments(pedido: INovoPedido) {
    await addDoc(collection(this.firestore, this.document), pedido);
  }

  async getPedidoDocumentById(documentId: string) {
    const pedido = await getDoc(doc(this.firestore, this.document, documentId));
    if(pedido.exists) {
      const data = pedido.data() as Omit<IPedido, 'id'>
      return { id: pedido.id, numero: data.numero, status: data.status,  itens: data.itens }
    } else {
      return null
    }
  }

  async updateDocumentStatusByDocId(documentId: string, novoStatus: Status) {
    const pedido = await getDoc(doc(this.firestore, this.document, documentId));

    if(pedido.exists) {
      await updateDoc(pedido.ref, {
        status: novoStatus
      });
      return pedido
    } else {
      return null
    }

  }

}
