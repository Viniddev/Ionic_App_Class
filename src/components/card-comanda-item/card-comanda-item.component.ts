import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CADASTRO_COMANDA, FINALIZAR_COMANDA } from 'src/utils/frontEndUrls';
import { IItemComanda } from 'src/@types/IItemComanda';

@Component({
  selector: 'app-card-comanda-item',
  templateUrl: './card-comanda-item.component.html',
  styleUrls: ['./card-comanda-item.component.scss'],
  imports: [CommonModule]
})
export class CardComandaItemComponent  implements OnInit {
  @Input({ required: true }) itemComanda!: IItemComanda;

  constructor(private router: Router) { }

  ngOnInit() {}

  editar(){
    this.router.navigateByUrl(CADASTRO_COMANDA)
  }

  fechar(){
    this.router.navigateByUrl(FINALIZAR_COMANDA)
  }
}
