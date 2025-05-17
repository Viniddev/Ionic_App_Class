import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { CardItemComponent } from 'src/components/card-item/card-item.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { IPedido } from 'src/@types/IPedido';
import { listaStatusOptions } from 'src/@types/Enums/Status';
@Component({
  selector: 'app-visualizar-pedidos',
  templateUrl: './visualizar-pedidos.page.html',
  styleUrls: ['./visualizar-pedidos.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    CardItemComponent,
    HeaderComponent,
    IonSelect,
    IonSelectOption
  ],
})
export class VisualizarPedidosPage implements OnInit {
  pedidos: Array<IPedido>;
  pedidosFiltrados: Array<IPedido>;

  listaStatusOptions: Array<string> = listaStatusOptions;
  statusFiltro: string;

  constructor(private pedidosService: PedidosFirestoreService) {}

  ngOnInit() {
    this.getAllPedidos();
  }

  filtrarStatusPedidos($event: any) {
    if ($event.detail?.value !== 'Limpar Filtro') {
      const listaFiltrada: Array<IPedido> = this.pedidos.filter(
        (element: IPedido) => element.status === $event.detail?.value
      );

      this.pedidosFiltrados = listaFiltrada;
    } else {
      this.pedidosFiltrados = this.pedidos;
      this.statusFiltro = "";
    }
  }

  async getAllPedidos() {
    this.pedidos = await this.pedidosService.getAllPedidosDocuments();
    this.pedidosFiltrados = this.pedidos;
    return this.pedidos;
  }
}
