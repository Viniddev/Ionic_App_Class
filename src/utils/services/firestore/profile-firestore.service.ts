import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getDocs, collection, Firestore, doc, getDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { IUserInformations } from 'src/@types/IUserInformations';
import { USUARIOS } from 'src/utils/constants/backEndUrls';

@Injectable({
  providedIn: 'root'
})

export class ProfileFirestoreService {
  UserInformations: IUserInformations;
  UserId: string;

  constructor(private firestore: Firestore, private auth: Auth) { }

  get IdUser(): string {
    return this.UserId;
  }

  get User(){
    return this.UserInformations;
  }

  async getUserProfileInformations() {
    const pedido = await getDocs(collection(this.firestore, USUARIOS));

    let currentUser = pedido.docs.find((element: any) =>
      element.data().email === this.auth.currentUser.email)

    let userData = currentUser.data();

    this.UserId = currentUser.id;
    this.UserInformations = {
      cpf: userData['cpf'],
      email: userData['email'],
      nome: userData['nome'],
      telefone: userData['telefone'],
      cargo: userData['cargo'],
    } as IUserInformations;

    return this.UserInformations;
  }

  async getUser(email: string) {
    const usuariosRef = collection(this.firestore, USUARIOS);
    const queryUser = query(usuariosRef, where("email", "==", email))

    const queryUserSnap = await getDocs(queryUser)

    const userSnap = queryUserSnap.docs[0];
    const user = userSnap.data() as IUserInformations

    return user;
  }

  async updateUserProfileInformations(userData: IUserInformations) {
    const usuario = await getDoc(doc(this.firestore, USUARIOS, this.UserId));

    if (usuario.exists) {
      await updateDoc(usuario.ref, {
        nome: userData.nome,
        cpf: userData.cpf,
        email: userData.email,
        telefone: userData.telefone,
        cargo: userData.cargo,
      });
      return usuario;
    } else {
      return null;
    }
  }
}
