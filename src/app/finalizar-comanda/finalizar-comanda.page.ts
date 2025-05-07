import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { CardFechamentoItemComponent } from 'src/components/card-fechamento-item/card-fechamento-item.component';

@Component({
  selector: 'app-finalizar-comanda',
  templateUrl: './finalizar-comanda.page.html',
  styleUrls: ['./finalizar-comanda.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CardFechamentoItemComponent]
})
export class FinalizarComandaPage implements OnInit {
  item = {
    id: 1,
    numero: 11,
    itens: [
      { quantidade: 3, nome: 'Original Burguer' },
      { quantidade: 1, nome: 'Pizza Calabresa' },
      { quantidade: 1, nome: 'Coca Cola Lata' },
      { quantidade: 1, nome: 'Guaraná Zero' },
      { quantidade: 1, nome: 'Double Smash Burguer' },
      { quantidade: 1, nome: 'Coca Cola Zero' }
    ],
    total: 120
  }

  constructor() { }

  ngOnInit() {
  }

}
