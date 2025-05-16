import { Injectable } from '@angular/core';
import { USUARIOS } from 'src/utils/constants/backEndUrls';
import { FirestoreService } from './firestore.service';
import { getAuth } from '@angular/fire/auth';
import { IUserInformations } from 'src/@types/IUserInformations';

@Injectable({
  providedIn: 'root'
})

export class ProfileFirestoreService {
  constructor(private firestore: FirestoreService) { }

  async getUserInformations() {
    const auth = getAuth();
    let userInfo: IUserInformations;
    console.log('Usuário logado (dados persistidos):', auth.currentUser.email);

    this.firestore.getCollection(USUARIOS).subscribe({
      next: (dados) => {
        console.log('dados', dados)
        userInfo = dados.find((user:IUserInformations)=> user.email === auth.currentUser.email)
      },
      error: (erro) => {
        console.error('Erro ao buscar perfil:', erro);
      }
    });

    return userInfo;
  };

  // async updateDocumentStatusByDocId(documentId: string, novoStatus: any) {
  //   const pedido = await getDoc(doc(this.firestore, PEDIDOS, documentId));

  //   if(pedido.exists) {
  //     await updateDoc(pedido.ref, {
  //       status: novoStatus
  //     });
  //     return pedido;
  //   } else {
  //     return null;
  //   }
  // }
}
