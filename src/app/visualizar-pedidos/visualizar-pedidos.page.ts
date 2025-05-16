import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { CardItemComponent } from 'src/components/card-item/card-item.component';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/constants/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { IPedido } from 'src/@types/IPedido';

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
    HeaderComponent
  ]
})
export class VisualizarPedidosPage implements OnInit {
  pedidos: IPedido[];

  constructor(private router: Router, private pedidosService: PedidosFirestoreService) { }

  ngOnInit() {
    this.getAllPedidos()
    this.pedidosService.atualizarPedidos$.subscribe(atualizar => {
      if(atualizar) {
        this.getAllPedidos();
        this.pedidosService.notificarAtualizacao();
      }
    })
  }

  atualizarStatus(pedidoId: number, novoStatus: string) {
     this.router.navigateByUrl(HOME);
  }

  async getAllPedidos() {
    this.pedidos = await this.pedidosService.getAllPedidosDocuments();
    return this.pedidos;
  }

}
