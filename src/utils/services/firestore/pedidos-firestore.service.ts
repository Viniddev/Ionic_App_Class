import { IPedido } from 'src/@types/IPedido';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidosFirestoreService {
  document = "pedidos";

  constructor(private firestore: Firestore) { }

  async getAllDocuments(): Promise<IPedido[]> {
    const collectionDocs = await getDocs(collection(this.firestore, this.document));

    const pedidos = collectionDocs.docs.map(doc => {
      const pedido = doc.data()

      return {
        id: pedido['id'],
        numero: pedido['numero'],
        status: pedido['status'],
        itens: pedido['itens']
      } as IPedido;
    });

    return pedidos;
  }

}
