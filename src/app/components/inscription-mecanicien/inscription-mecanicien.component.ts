import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompetenceService } from '../../services/competence.service';
import { InscriptionMecanicienService } from '../../services/inscription-mecanicien.service';
import { ServiceListService } from '../../services/service.service';

@Component({
  selector: 'app-inscription-mecanicien',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription-mecanicien.component.html',
  styleUrl: './inscription-mecanicien.component.css'
})
export class InscriptionMecanicienComponent {
  elementForm = { nom: '', prenom: '' , id_competence:"" , id_service:"" , date_naissance: "",
    genre:"",contact:"",adresse:"",email:"",mdp:""
   };

   mecaniciens: any[] = [];
   competences: any[] = [];
   services: any[] = [];

     constructor(private inscriptionClientService: InscriptionMecanicienService , private competenceService: CompetenceService ,
       private serviceMecanicienService: ServiceListService) {}

      ngOnInit(): void {
      this.loadCompetence();
     this.loadService();
      }

     registerMecanicien(): void {
      console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

      // Vérifier si tous les champs requis sont remplis
      if (!this.elementForm.nom || !this.elementForm.prenom || !this.elementForm.date_naissance ||
          !this.elementForm.genre || !this.elementForm.contact || !this.elementForm.adresse ||
          !this.elementForm.email || !this.elementForm.mdp) {
        console.warn("⚠️ Formulaire incomplet :", this.elementForm);
        return;
      }

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.inscriptionClientService.registerMecanicien(this.elementForm, headers).subscribe(
        response => {
          console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
          console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

          // this.loadInscriptionClient(); // Recharge la liste après ajout
          this.elementForm = { nom: '', prenom: '' , id_competence:"" , id_service:"" , date_naissance: "",
            genre:"",contact:"",adresse:"",email:"",mdp:"" }; // Réinitialise le formulaire
        },
        error => {
          console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
        }
      );
    }

    loadCompetence(): void {
      this.competenceService.getData().subscribe(data => {
        this.competences = data;
        console.log('competences chargées:', this.competences); // Vérifier les catégories après chargement
        //this.loadCompetence();  // Appeler loadArticles après que les catégories aient été chargées
      });
    }
    loadService(): void {
      this.serviceMecanicienService.getData().subscribe(data => {
        this.services = data;
        console.log('service chargées retooo:', this.services); // Vérifier les catégories après chargement
       // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
      });
    }

}
