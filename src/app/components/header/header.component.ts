import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionClientService } from '../../services/connexion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private connexionClient: ConnexionClientService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.connexionClient.isLoggedIn();
  }

  logout(): void {
    this.connexionClient.logout();
    this.isAuthenticated = false; // Mettre à jour l'état
  }
}
