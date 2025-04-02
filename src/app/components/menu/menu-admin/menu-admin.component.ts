import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importer Router
import { ConnexionManagerService } from '../../../services/connexion-manager.service';
import { ConnexionMecanicienService } from '../../../services/connexion-mecanicien.service';
import { ConnexionClientService } from '../../../services/connexion.service';



@Component({
  selector: 'app-menu-admin',
  imports: [CommonModule], // Ajoute ceci
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {

  role: string | null = '';
  isAuthenticated: boolean = false;
  isAuthenticatedManager: boolean = false;
  isAuthenticatedMecanicien: boolean = false;
  //isAuthenticatedMecanicien

  constructor(private router: Router,
    private connexionClient: ConnexionClientService,
    private connexionManagerService: ConnexionManagerService,
    private connexionMecanicienService: ConnexionMecanicienService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.connexionClient.isLoggedIn();
    this.isAuthenticatedManager = this.connexionManagerService.isLoggedIn();
    this.isAuthenticatedMecanicien = this.connexionMecanicienService.isLoggedIn();
    this.role = localStorage.getItem('role');
    console.log('Rôle récupéré :', this.role);
  }

  logout(): void {
    this.connexionClient.logout();
    this.isAuthenticated = false; // Mettre à jour l'état
  }

  logoutManager(): void {
    this.connexionManagerService.logoutMecanicien();
    this.isAuthenticated = false; // Mettre à jour l'état
  }

  logoutMecanicien(): void {
    this.connexionMecanicienService.logoutMecanicien();
    this.isAuthenticated = false; // Mettre à jour l'état
  }

}
