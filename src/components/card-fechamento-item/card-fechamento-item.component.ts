import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  id: number;
  numero: number;
  itens: {
    quantidade: number;
    nome: string;
  }[];
  total: number,
}

@Component({
  selector: 'app-card-fechamento-item',
  templateUrl: './card-fechamento-item.component.html',
  styleUrls: ['./card-fechamento-item.component.scss'],
  imports: [CommonModule]
})
export class CardFechamentoItemComponent  implements OnInit {
  @Input({ required: true }) item!: Item;
  @Output() fechar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

}
