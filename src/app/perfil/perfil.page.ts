import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileInfo } from 'src/utils/mock/profile-info';
import { Router } from '@angular/router';
import { LOGIN } from 'src/utils/constants/frontEndUrls';
import { ProfileFirestoreService } from 'src/utils/services/firestore/profile-firestore.service';
import { IUserInformations } from 'src/@types/IUserInformations';
import { AuthService } from 'src/utils/services/auth/auth.service';

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
    private profileService: ProfileFirestoreService,
    private authService: AuthService
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

  sair() {
    this.authService.logout();
    this.router.navigate([LOGIN])
  }
}
