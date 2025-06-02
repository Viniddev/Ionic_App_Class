import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search, personOutline, car, thumbsUpSharp } from 'ionicons/icons';
import { EnumCargos } from 'src/@types/Enums/Cargos';
import { NEW_PRODUCT } from 'src/utils/constants/frontEndUrls';
import { ProfileFirestoreService } from 'src/utils/services/firestore/profile-firestore.service';
import { IUserInformations } from 'src/@types/IUserInformations';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/utils/services/auth/auth.service';

@Component({
  selector: 'app-tab-navegacao',
  templateUrl: './tab-navegacao.component.html',
  styleUrls: ['./tab-navegacao.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs, CommonModule],
})
export class TabNavegacaoComponent implements OnInit {
  documentId: string = NEW_PRODUCT;
  user: IUserInformations;

  mostrarVisualizarPedidos = false;
  mostrarCadastrarPedido = false;
  mostrarResumoPedido = false;
  mostrarCadastroUsuario = false;

  constructor(private userProfile: ProfileFirestoreService, private authService: AuthService) {
    addIcons({ library, playCircle, radio, search, personOutline });
  }

  ngOnInit() {
    this.authService.user$.subscribe((authUser: User | null) => {
      if(authUser) {
        this.getUserProfile(authUser.email).then(() => {
          console.log(this.user['cargo'])
          this.atualizarVisualizacaoTab(this.user["cargo"])
          console.log(this.mostrarVisualizarPedidos, this.mostrarCadastrarPedido, this.mostrarResumoPedido, this.mostrarCadastroUsuario)
        })
      }
    })
  }

  async getUserProfile(email: string) {
    this.user = await this.userProfile.getUser(email)
  }


  private atualizarVisualizacaoTab(cargo: EnumCargos) {
    console.log(cargo, "Inicio")

    if(!cargo) {
      console.log(cargo, "Not cargo")
      this.mostrarVisualizarPedidos = false;
      this.mostrarCadastrarPedido = false;
      this.mostrarResumoPedido = false;
      this.mostrarCadastroUsuario = false;
      return ;
    }

    switch(cargo) {
      case EnumCargos.Administrador:
        this.mostrarVisualizarPedidos = true;
        this.mostrarCadastrarPedido   = true;
        this.mostrarResumoPedido     = true;
        this.mostrarCadastroUsuario  = true;
        break;
      case EnumCargos.Garcom:
        console.log(cargo, "Garcom")
        this.mostrarVisualizarPedidos = true;
        this.mostrarCadastrarPedido   = true;
        this.mostrarResumoPedido     = true;
        this.mostrarCadastroUsuario  = false;
        break;
      case EnumCargos.Cozinheiro:
        this.mostrarVisualizarPedidos = true;
        this.mostrarCadastrarPedido   = false;
        this.mostrarResumoPedido     = false;
        this.mostrarCadastroUsuario  = false;
        break;
    }

    console.log(cargo, "Final")
  }

}
