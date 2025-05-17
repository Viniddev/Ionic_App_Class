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
import { ChangeDetectorRef } from '@angular/core';

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
  listaMesas: Array<IMesas> = [];
  pedidos: Array<IPedido> = [];

  comandas: Array<IItemComanda> = [];
  listaComandasFiltradas: Array<IItemComanda> = [];

  constructor(
    private router: Router,
    private pedidosService: PedidosFirestoreService,
    private mesasService: MesasFirestoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllOpenPedidos();
  }

  ionViewWillLeave() {
    this.getAllOpenPedidos();
  }

  async getAllOpenPedidos() {
    this.pedidos = await this.pedidosService.getAllPedidosDocuments();
    this.comandas = await this.pedidosService.montarComandas();
    this.listaMesas = await this.mesasService.buscaListaTodasAsMesas();

    this.listaComandasFiltradas = [...this.comandas];
    this.cdr.detectChanges();
  }

  filtrarPedidosPorMesa($event: any) {
    const idMesa = this.mesasService.formatElementIdentificador(
      $event.detail?.value
    );

    const listaFiltrada = this.comandas.filter(
      (element: IItemComanda) => element.numero === idMesa
    );

    this.listaComandasFiltradas = listaFiltrada;
  }

  Voltar() {
    this.router.navigateByUrl(HOME);
  }
}

