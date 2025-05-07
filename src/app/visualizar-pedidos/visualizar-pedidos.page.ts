import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonButton, IonLabel } from '@ionic/angular/standalone';
import { CardItemComponent } from 'src/components/card-item/card-item.component';

interface Pedido {
  id: number;
  numeroMesa: number;
  status: 'Pronto' | 'Em Produção' | 'Aguardando confirmação';
  itens: {
    quantidade: number;
    nome: string;
  }[];
}

@Component({
  selector: 'app-visualizar-pedidos',
  templateUrl: './visualizar-pedidos.page.html',
  styleUrls: ['./visualizar-pedidos.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CardItemComponent]
})
export class VisualizarPedidosPage implements OnInit {
  pedidos = [
    {
      id: 1,
      numero: 11,
      status: 'Pronto',
      itens: [
        { quantidade: 2, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Coca Cola Zero' }
      ]
    },
    {
      id: 2,
      numero: 3,
      status: 'Pronto',
      itens: [
        { quantidade: 2, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Pizza Carne seca com Cream Cheese' },
        { quantidade: 1, nome: 'Coca Cola Zero' }
      ]
    },
    {
      id: 3,
      numero: 5,
      status: 'Em Produção',
      itens: [
        { quantidade: 4, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Coca Cola Lata' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ]
    },
    {
      id: 4,
      numero: 13,
      status: 'Em Produção',
      itens: [
        { quantidade: 2, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Pizza Carne Seca com Cream Cheese' },
        { quantidade: 1, nome: 'Coca Cola' },
        { quantidade: 1, nome: 'Guaraná Lata' }
      ]
    },
    {
      id: 5,
      numero: 7,
      status: 'Em Produção',
      itens: [
        { quantidade: 4, nome: 'Double Smash Burguer' },
        { quantidade: 1, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ]
    },
    {
      id: 6,
      numero: 14,
      status: 'Aguardando confirmação da cozinha',
      itens: [
        { quantidade: 3, nome: 'Original Burguer' },
        { quantidade: 1, nome: 'Pizza Calabresa' },
        { quantidade: 1, nome: 'Coca Cola Lata' },
        { quantidade: 1, nome: 'Guaraná Zero' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  atualizarStatus(pedidoId: number, novoStatus: string) {
    const pedido = this.pedidos.find(p => p.id === pedidoId);
    if (pedido) {
      pedido.status = novoStatus as any;
    }
  }

  filtrarPorStatus(status: string) {
    return this.pedidos.filter(pedido => pedido.status === status);
  }

}
