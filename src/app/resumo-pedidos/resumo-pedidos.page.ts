import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { CardComandaItemComponent } from 'src/components/card-comanda-item/card-comanda-item.component';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/constants/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';
import { IItemComanda } from 'src/@types/IItemComanda';
import { IPedido } from 'src/@types/IPedido';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { MesasFirestoreService } from 'src/utils/services/firestore/mesas-firestore.service';
import { IMesas } from 'src/@types/IMesas';

@Component({
  selector: 'app-resumo-pedidos',
  templateUrl: './resumo-pedidos.page.html',
  styleUrls: ['./resumo-pedidos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    CardComandaItemComponent,
    HeaderComponent,
    IonSelect,
    IonSelectOption,
  ],
})
export class ResumoPedidosPage implements OnInit {
  total: number;
  mesaFiltro: string;
  listaMesas: Array<IMesas>;
  pedidos: Array<IPedido> = [];

  comandas: Array<IItemComanda> = [];
  listaComandasFiltradas: Array<IItemComanda> = [];

  constructor(
    private router: Router,
    private pedidosService: PedidosFirestoreService,
    private mesasService: MesasFirestoreService,
  ) {

  }

  ngOnInit() {
    this.getAllOpenPedidos();
    this.listaComandasFiltradas = this.comandas;
  }

  async getAllOpenPedidos() {
    this.pedidos = await this.pedidosService.getAllPedidosDocuments();
    this.listaMesas = await this.mesasService.buscaListaTodasAsMesas();

    this.pedidos.forEach((pedido) => {
      this.comandas.push({
        id: pedido.id,
        numero: pedido.numero,
        itens: pedido.itens,
        total: this.calculaTotal(pedido),
      });
    });
  }

  calculaTotal(pedido: IPedido) {
    let totalPedido = 0;

    for (const item of pedido.itens) {
      totalPedido += item.preco * item.quantidade;
    }
    return totalPedido;
  }

  filtrarPedidosPorMesa($event: any) {
    const idMesa =  this.mesasService.formatElementIdentificador($event.detail?.value);

    const listaFiltrada = this.comandas.filter(
      (element: IItemComanda) => element.numero === idMesa
    );

    this.listaComandasFiltradas = listaFiltrada;
  }

  Voltar() {
    this.router.navigateByUrl(HOME);
  }
}

