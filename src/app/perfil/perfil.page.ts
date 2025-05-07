import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class PerfilPage {
  perfil = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cargo: ''
  };

  constructor() {}
}
