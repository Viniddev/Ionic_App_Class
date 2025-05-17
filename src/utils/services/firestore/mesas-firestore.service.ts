import { Injectable } from '@angular/core';
import { collection, doc, documentId, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { EnumStatusMesa } from 'src/@types/Enums/StatusMesa';
import { IMesas } from 'src/@types/IMesas';
import { MESAS, PEDIDOS } from 'src/utils/constants/backEndUrls';

@Injectable({
  providedIn: 'root',
})
export class MesasFirestoreService {
  listaMesas: Array<IMesas>;

  constructor(private firestore: Firestore) {}

  get listaMesasUteis() {
    return this.listaMesas;
  }

  formatElementIdentificador(identificador: string) {
    return Number(identificador.replace(/\D/g, ''));
  }

  async buscaListaTodasAsMesas() {
    const mesas = await getDocs(collection(this.firestore, MESAS));

    const listaMesasUteis = mesas.docs.map((element: any) => {
      const mesa = element.data();

      return {
        codigo: element.id,
        identificador: mesa.identificador,
        status: mesa.status,
      } as IMesas;
    });

    this.listaMesas = listaMesasUteis;

    return listaMesasUteis;
  }

  async buscaListaMesasVazias() {
    const mesas = await getDocs(collection(this.firestore, MESAS));

    let listaMesasVazias = mesas.docs.filter(
      (element: any) => element.data().status !== EnumStatusMesa.ocupado
    );

    const listaMesasUteis = listaMesasVazias.map((element: any) => {
      const mesa = element.data();

      return {
        codigo: element.id,
        identificador: mesa.identificador,
        status: mesa.status,
      } as IMesas;
    });

    this.listaMesas = listaMesasUteis;

    return listaMesasUteis;
  }

  async bloqueiaMesa(mesaSelecionada: number) {
    await this.buscaListaMesasVazias();

    let mesaDisponivel = this.listaMesas.find(
      (element: IMesas) =>
        this.formatElementIdentificador(element.identificador) ===
        mesaSelecionada
    );

    if (mesaDisponivel !== null || mesaDisponivel !== undefined) {
      await this.atualizaStatusMesa(
        EnumStatusMesa.ocupado,
        mesaDisponivel.codigo
      );
    }
  }

  async desbloqueiaMesa(mesaSelecionada: number) {
    const mesas = await getDocs(collection(this.firestore, MESAS));

    const mesaBloqueada = mesas.docs.find(
      (element: any) =>
        element.data().status === EnumStatusMesa.ocupado &&
        this.formatElementIdentificador(element.data().identificador) ===
          mesaSelecionada
    );

    if (mesaBloqueada.data() !== null || mesaBloqueada.data() !== undefined) {
      await this.atualizaStatusMesa(EnumStatusMesa.vazio, mesaBloqueada.id);
    }
  }

  async buscaMesaPorId(documentId: string) {
    const mesa = await getDoc(doc(this.firestore, MESAS, documentId));

    if (mesa.exists) {
      return mesa.data();
    } else {
      return null;
    }
  }

  async atualizaStatusMesa(status: string, documentId: string) {
    const mesa = await getDoc(doc(this.firestore, MESAS, documentId));

    if (mesa.exists) {
      await updateDoc(mesa.ref, {
        status: status,
      });
      return mesa;
    } else {
      return null;
    }
  }
}