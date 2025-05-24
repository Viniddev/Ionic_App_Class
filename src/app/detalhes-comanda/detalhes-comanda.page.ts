import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { CardListEdicaoPedidoComponent } from 'src/components/card-list-edicao-pedido/card-list-edicao-pedido.component';
import { IPedido } from 'src/@types/IPedido';

@Component({
  selector: 'app-detalhes-comanda',
  templateUrl: './detalhes-comanda.page.html',
  styleUrls: ['./detalhes-comanda.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    CardListEdicaoPedidoComponent,
  ],
})
export class DetalhesComandaPage implements OnInit {
  idComanda: string;
  ListaPedidosMapeados: Array<IPedido>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pedidoService: PedidosFirestoreService
  ) {}

  ngOnInit() {
    this.searchPedidos();
  }

  ionViewWillEnter() {
    this.searchPedidos();
  }

  async searchPedidos() {
    this.idComanda = this.activatedRoute.snapshot.paramMap.get('id');

    const pedidos: Array<IPedido> =
      await this.pedidoService.getPedidosByComandaID(this.idComanda);

    this.ListaPedidosMapeados = pedidos;
  }
}
