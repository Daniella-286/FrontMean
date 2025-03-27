import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarqueService } from '../../../services/marque.service';
import { ModelService } from '../../../services/model.service';


@Component({
  selector: 'app-ajout-model-voiture',
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout-model-voiture.component.html',
  styleUrl: './ajout-model-voiture.component.css'
})
export class AjoutModelVoitureComponent {
  elementForm = { nom_modele: '' , marque:''
    };
    marques: any[] = [];
    models: any[] = [];
     constructor(private modelService: ModelService  , private marqueService: MarqueService ) {}

     ngOnInit(): void {
      this.loadMarque();
      }
     AddModel(): void {
      console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée
      console.log("📤 Données envoyées au serveur reoo ooh:", JSON.stringify(this.elementForm));

      // Vérifier si tous les champs requis sont remplis
      if (!this.elementForm.nom_modele || !this.elementForm.marque
          ) {
        console.warn("⚠️ Formulaire incomplet :", this.elementForm);
        return;
      }

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.modelService.addModelService(this.elementForm, headers).subscribe(
        response => {
          console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
          console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

          // this.loadInscriptionClient(); // Recharge la liste après ajout
          this.elementForm = { nom_modele: '' , marque:''}; // Réinitialise le formulaire
        },
        error => {
          console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
        }
      );
    }

    loadMarque(): void {
      this.marqueService.getData().subscribe(data => {
        this.marques = data;
        //this.loadCompetence();  // Appeler loadArticles après que les catégories aient été chargées
      });
    }

}
