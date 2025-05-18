import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileInfo } from 'src/utils/mock/profile-info';
import { Router } from '@angular/router';
import { CADASTRO_COMANDA, NEW_PRODUCT } from 'src/utils/constants/frontEndUrls';
import { ProfileFirestoreService } from 'src/utils/services/firestore/profile-firestore.service';
import { IUserInformations } from 'src/@types/IUserInformations';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class PerfilPage implements OnInit {
  perfil: IUserInformations = ProfileInfo
  pedidosService: any;

  constructor(
    private router: Router,
    private profileService: ProfileFirestoreService
  ) { }

  ngOnInit(): void {
    this.getAllPedidos();
  }
  
  async getAllPedidos() {
    this.perfil = await this.profileService.getUserProfileInformations();
    return this.perfil;
  }
  
  async Atualizar(){
    await this.profileService.updateUserProfileInformations(this.perfil)
  }

  Voltar() {
    this.router.navigate([CADASTRO_COMANDA, NEW_PRODUCT]);
  }
}
