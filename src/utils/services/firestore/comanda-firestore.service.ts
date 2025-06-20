import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { IComanda, IListarComanda } from 'src/@types/IComanda';
import { COMANDAS } from 'src/utils/constants/backEndUrls';
import { ProfileFirestoreService } from './profile-firestore.service';
import { StatusComanda } from 'src/@types/Enums/statusComanda';
import { colorPalette } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class ComandaFirestoreService {
  comandas: Array<IComanda>;
  docRef: string;

  constructor(
    private firestore: Firestore,
    private profileService: ProfileFirestoreService
  ) { }

  get docId(){
    return this.docRef;
  }

  async CriaComanda(mesaSelecionada: string) {
    let user = this.profileService.User;

    if (!user) user = await this.profileService.getUserProfileInformations();

    if (!this.comandas) await this.buscarTodasAsComandas();

    const comandaJaExiste = this.comandas.some(
      (element: IComanda) => element.mesa === mesaSelecionada && element.status === StatusComanda.aberta);

    if (comandaJaExiste) return null;

    const novaComanda: IComanda = {
      mesa: mesaSelecionada,
      criador: user.cpf,
      status: StatusComanda.aberta
    }

    const docRef = await addDoc(collection(this.firestore, COMANDAS), novaComanda);

    this.docRef = docRef.id;
    return docRef.id
  }

  async FechaComandaPorId(idComanda: string) {
    const comanda = await getDoc(doc(this.firestore, COMANDAS, idComanda));

    if (comanda.exists) {
      await updateDoc(comanda.ref, {
        status: StatusComanda.fechada,
      });
      return comanda;
    } else {
      return null;
    }
  }

  async buscarTodasAsComandas() {
    const comandas = await getDocs(collection(this.firestore, COMANDAS));

    var ListaComandas: Array<IListarComanda> = comandas.docs.map((element: any) => {
      const valores: IComanda = element.data();
      return {
        id: element.id,
        criador: valores.criador,
        mesa: valores.mesa,
        status: valores.status
      } as IListarComanda;
    })

    this.comandas = Array.from([...ListaComandas]);
    return Array.from([...ListaComandas]);
  }

  async ComandaJaExiste(mesaSelecionada: string){
    const listaComandas = await this.buscarTodasAsComandas();

    const comandaExiste = listaComandas.find(
      (element: IListarComanda) => element.mesa === mesaSelecionada && element.status === StatusComanda.aberta);


    return comandaExiste !== null && comandaExiste !== undefined ? comandaExiste.id : "";
  }
}
