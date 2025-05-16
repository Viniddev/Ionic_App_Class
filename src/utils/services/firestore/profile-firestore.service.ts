import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getDocs, collection, Firestore } from '@angular/fire/firestore';
import { IUserInformations } from 'src/@types/IUserInformations';
import { USUARIOS } from 'src/utils/constants/backEndUrls';

@Injectable({
  providedIn: 'root'
})

export class ProfileFirestoreService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  async getAllUsers() {
    const pedido = await getDocs(collection(this.firestore, USUARIOS));

     let userInfo = pedido.docs.map((element: any) => {
      let data = element.data();

      if(data.email === this.auth.currentUser.email){
        return {
          cpf: data.cpf,
          email: data.email,
          nome: data.nome,
          telefone: data.telefone
        } as IUserInformations;
      }
    })
    
    console.log("userInfo", userInfo)

    return undefined;
  }
}
