import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceListService } from '../../services/service.service';
import { SousServiceService } from '../../services/sous-service.service';

@Component({
  selector: 'app-ajout-sous-service',
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout-sous-service.component.html',
  styleUrl: './ajout-sous-service.component.css'
})
export class AjoutSousServiceComponent {
  elementForm = { nom_sous_service: '', id_service:'', tarif: ''
  };

  sous_services: any[] = [];
  services: any[] = [];

    constructor(private competenceService: SousServiceService ,  private serviceListService: ServiceListService) {}
    ngOnInit(): void {
     this.loadService();
      }

   AddSousService(): void {
   console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

   // Vérifier si tous les champs requis sont remplis
   if (!this.elementForm.nom_sous_service || !this.elementForm.id_service ||
     !this.elementForm.tarif
       ) {
     console.warn("⚠️ Formulaire incomplet :", this.elementForm);
     return;
   }

   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

   this.competenceService.addSousService(this.elementForm, headers).subscribe(
     response => {
       console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
       console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

       // this.loadInscriptionClient(); // Recharge la liste après ajout
       this.elementForm = { nom_sous_service: '', id_service: '' , tarif:""  }; // Réinitialise le formulaire
     },
     error => {
       console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
     }
   );
 }

   loadService(): void {
     this.serviceListService.getData().subscribe(data => {
       this.services = data;
       console.log('service chargées retooo:', this.services); // Vérifier les catégories après chargement
      // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
     });
   }
}
