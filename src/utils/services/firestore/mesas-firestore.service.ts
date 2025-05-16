import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MESAS } from 'src/utils/constants/backEndUrls';

@Injectable({
  providedIn: 'root'
})

export class MesasFirestoreService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  async buscaListaMesasVazias() {
    const mesas = await getDocs(collection(this.firestore, MESAS));

    let listaMesasVazias = mesas.docs.filter(
      (element: any) => element.data().status !== "ocupada"
    );

    console.log("listaMesasVazias", listaMesasVazias);
  }

  async bloqueiaMesa() { }

  async desbloqueiaMesa() { }

  async buscaMesaPorId() { }
}
