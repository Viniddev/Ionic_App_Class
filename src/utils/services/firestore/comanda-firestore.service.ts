import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { IComanda } from 'src/@types/IComanda';
import { COMANDAS, PEDIDOS } from 'src/utils/constants/backEndUrls';
import { ProfileFirestoreService } from './profile-firestore.service';
import { StatusMesa } from 'src/@types/Enums/statusComanda';

@Injectable({
  providedIn: 'root'
})
export class ComandaFirestoreService {
  comandas: Array<IComanda>;

  constructor(
    private firestore: Firestore,
    private profileService: ProfileFirestoreService
  ) { }

  async CriaComanda(mesaSelecionada: string) {
    let user = this.profileService.User;

    if (!user) user = await this.profileService.getUserProfileInformations();

    if (!this.comandas) await this.buscarTodasAsComandas();

    const comandaJaExiste = this.comandas.some((element: IComanda) => element.mesa === mesaSelecionada);

    if (comandaJaExiste) return null;

    const novaComanda: IComanda = {
      mesa: mesaSelecionada,
      criador: user.cpf,
      status: StatusMesa.aberta
    }

    await addDoc(collection(this.firestore, COMANDAS), novaComanda);
  }

  async FechaComandaPorId(idComanda: string) {
    const comanda = await getDoc(doc(this.firestore, COMANDAS, idComanda));

    if (comanda.exists) {
      await updateDoc(comanda.ref, {
        status: StatusMesa.fechada,
      });
      return comanda;
    } else {
      return null;
    }
  }

  async buscarTodasAsComandas() {
    const comandas = await getDocs(collection(this.firestore, COMANDAS));

    var ListaComandas: Array<IComanda> = comandas.docs.map((element: any) => {
      const valores: IComanda = element.data();
      return {
        criador: valores.criador,
        mesa: valores.mesa,
        status: valores.status
      } as IComanda;
    })
    
    this.comandas = Array.from([...ListaComandas]);
    return Array.from([...ListaComandas]);
  }
}
