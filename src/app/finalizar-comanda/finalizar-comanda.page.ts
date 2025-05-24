import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { CardFechamentoItemComponent } from 'src/components/card-fechamento-item/card-fechamento-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CADASTRO_COMANDA, NEW_PRODUCT } from 'src/utils/constants/frontEndUrls';
import { HeaderComponent } from 'src/components/header/header.component';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { IItemComanda } from 'src/@types/IItemComanda';
import { IItem } from 'src/@types/IItem';

@Component({
  selector: 'app-finalizar-comanda',
  templateUrl: './finalizar-comanda.page.html',
  styleUrls: ['./finalizar-comanda.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    CardFechamentoItemComponent,
    HeaderComponent,
  ],
})
export class FinalizarComandaPage implements OnInit {
  documentId: string;
  item: IItemComanda;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pedidosService: PedidosFirestoreService
  ) {}

  ngOnInit() {
    this.getItemComanda();
  }

  ionViewWillEnter() {
    this.getItemComanda();
  }

  async getItemComanda() {
    const idComanda = this.activatedRoute.snapshot.paramMap.get('id');

    if (idComanda) {
      const pedidosPorComanda = await this.pedidosService.getPedidosByComandaID(idComanda);
      var comandaMapeada: IItemComanda = this.pedidosService.reduceList(pedidosPorComanda)[0];

      this.item = {
        id: idComanda,
        numero: comandaMapeada.numero,
        itens: comandaMapeada.itens,
        total: this.calculaTotal(comandaMapeada.itens),
        pedidos: comandaMapeada.pedidos
      };
    }
  }

  calculaTotal(itens: Array<IItem>) {
    let totalPedido = 0;

    for (const item of itens) {
      totalPedido += item.preco * item.quantidade;
    }
    return totalPedido;
  }

  Voltar() {
    this.router.navigate([CADASTRO_COMANDA, NEW_PRODUCT]);
  }
}
