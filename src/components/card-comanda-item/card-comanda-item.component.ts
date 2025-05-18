import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CADASTRO_COMANDA, FINALIZAR_COMANDA } from 'src/utils/constants/frontEndUrls';
import { IItemComanda } from 'src/@types/IItemComanda';
import { PedidosFirestoreService } from 'src/utils/services/firestore/pedidos-firestore.service';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card-comanda-item',
  templateUrl: './card-comanda-item.component.html',
  styleUrls: ['./card-comanda-item.component.scss'],
  imports: [CommonModule, IonButton]
})
export class CardComandaItemComponent  implements OnInit {
  @Input({ required: true }) itemComanda!: IItemComanda;

  constructor(private router: Router, private pedidosService: PedidosFirestoreService) { }

  ngOnInit() {}

  editar(){
    this.router.navigateByUrl(CADASTRO_COMANDA)
  }

  fecharComanda(documentId: string) {
    this.pedidosService.getPedidoDocumentById(documentId).then(itemComanda => {
      this.router.navigate([FINALIZAR_COMANDA, documentId])
    })
  }
}
