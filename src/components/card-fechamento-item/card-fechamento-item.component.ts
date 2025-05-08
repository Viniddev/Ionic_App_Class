import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IItemComanda } from 'src/@types/IItemComanda';

@Component({
  selector: 'app-card-fechamento-item',
  templateUrl: './card-fechamento-item.component.html',
  styleUrls: ['./card-fechamento-item.component.scss'],
  imports: [CommonModule]
})
export class CardFechamentoItemComponent  implements OnInit {
  @Input({ required: true }) item!: IItemComanda;
  @Output() fechar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

}
