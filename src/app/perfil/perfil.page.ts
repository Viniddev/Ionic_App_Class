import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileInfo } from 'src/utils/mock/profile-info';
import { Router } from '@angular/router';
import { HOME } from 'src/utils/constants/frontEndUrls';
import { Firestore } from '@angular/fire/firestore';
import { ProfileFirestoreService } from 'src/utils/services/firestore/profile-firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class PerfilPage implements OnInit {
  perfil = ProfileInfo

  constructor(
    private router: Router,
    private firestore: Firestore,
    private profileService: ProfileFirestoreService
  ) {}
  
  ngOnInit(): void {
    this.getAllPedidos();
  }

  Voltar(){
    this.router.navigateByUrl(HOME);
  }

  getAllPedidos() {
    const retorno = this.profileService.getUserInformations();
    console.log("retorno", retorno)
  }
}
