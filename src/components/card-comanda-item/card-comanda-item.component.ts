import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ItemComanda {
  id: number;
  numero: number;
  itens: {
    quantidade: number;
    nome: string;
  }[];
  total: number,
}

@Component({
  selector: 'app-card-comanda-item',
  templateUrl: './card-comanda-item.component.html',
  styleUrls: ['./card-comanda-item.component.scss'],
  imports: [CommonModule]
})
export class CardComandaItemComponent  implements OnInit {
  @Input({ required: true }) itemComanda!: ItemComanda;
  @Output() editar = new EventEmitter<void>();
  @Output() fechar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

}
