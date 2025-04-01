import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importer Router
import { ConnexionClientService } from '../../services/connexion.service';


@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private connexionClient: ConnexionClientService ,  private router: Router){

  }

  logout(): void {
    this.connexionClient.logout(); // Supprimer le token du stockage local
   this.router.navigate(['/connexion']); // Rediriger vers la page de connexion
  }

}
