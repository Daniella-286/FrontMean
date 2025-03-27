import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarqueService } from '../../../services/marque.service';

@Component({
  selector: 'app-ajout-marque-voiture',
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout-marque-voiture.component.html',
  styleUrl: './ajout-marque-voiture.component.css'
})
export class AjoutMarqueVoitureComponent {
  elementForm = { nom_marque: ''
  };
  marques: any[] = [];
   constructor(private marqueService: MarqueService ) {}

   AddMarques(): void {
    console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

    // Vérifier si tous les champs requis sont remplis
    if (!this.elementForm.nom_marque
        ) {
      console.warn("⚠️ Formulaire incomplet :", this.elementForm);
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.marqueService.addMarqueService(this.elementForm, headers).subscribe(
      response => {
        console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
        console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

        // this.loadInscriptionClient(); // Recharge la liste après ajout
        this.elementForm = { nom_marque: '' }; // Réinitialise le formulaire
      },
      error => {
        console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
      }
    );
  }

}
