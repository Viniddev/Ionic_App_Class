import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DETALHES_COMANDA, FINALIZAR_COMANDA } from 'src/utils/constants/frontEndUrls';
import { IItemComanda } from 'src/@types/IItemComanda';
import { IonButton } from '@ionic/angular/standalone';
@Component({
  selector: 'app-card-comanda-item',
  templateUrl: './card-comanda-item.component.html',
  styleUrls: ['./card-comanda-item.component.scss'],
  imports: [CommonModule, IonButton],
})
export class CardComandaItemComponent implements OnInit {
  @Input({ required: true }) itemComanda!: IItemComanda;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.cdr.detectChanges();
  }

  async editar(itemComanda: IItemComanda) {
    this.router.navigate([DETALHES_COMANDA, itemComanda.id])
  }

  async fecharComanda(documentId: any) {
    this.router.navigate([FINALIZAR_COMANDA, documentId]);
  }
}
