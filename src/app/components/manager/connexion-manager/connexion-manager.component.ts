import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importer Router
import { ConnexionManagerService } from '../../../services/connexion-manager.service';

@Component({
  selector: 'app-connexion-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './connexion-manager.component.html',
  styleUrl: './connexion-manager.component.css'
})
export class ConnexionManagerComponent {


  elementForm = {
    email: 'admin@garage.com',  // Valeur par défaut pour l'email
    mdp: 'motdepasse123'             // Valeur par défaut pour le mot de passe
  };

    client: any[] = [];
    serverMessage: { text: string, class: string } = { text: '', class: '' }; // Ajouter une structure pour le message

    constructor(private connexionManagerService: ConnexionManagerService , private router: Router) {}

    getConnexionManager(): void {
      console.log("📤 Données envoyées :", this.elementForm); // 🔍 Vérifier les données envoyées

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.connexionManagerService.getConnexionManagerService(this.elementForm, headers)
        .subscribe(response => {
          console.log("✅ Réponse du serveur :", response);

          // Si la réponse contient un token, le stocker dans localStorage
          if (typeof window !== 'undefined' && response && response.token) {
            localStorage.setItem('token', response.token);
            console.log('Token enregistré dans localStorage');

            // Redirection vers la page services
            this.router.navigate(['/services']);
          }

          // Réinitialiser le formulaire après une connexion réussie
          this.elementForm = { email: '', mdp: '' };

          // Afficher un message de succès (si nécessaire)
          this.serverMessage = { text: 'Connexion réussie', class: 'success' };
        }, error => {
          console.error("❌ Erreur lors de la connexion :", error);
          // Capturer et afficher le message d'erreur du backend
          const errorMessage = error.error?.message || 'Une erreur est survenue lors de la connexion.';
          this.serverMessage = { text: errorMessage, class: 'error' }; // Message d'erreur
        });
}
}
