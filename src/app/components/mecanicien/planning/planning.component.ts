import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlanningService } from '../../../services/planning.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent implements OnInit {

  searchForm = {
    date: ''  
  };

  interventions: any[] = [];
  selectedStatus: string = 'Planifié'; // Valeur par défaut pour le statut
  message: string = '';
  tasks: any[] = []; // Pour stocker les tâches associées à l'intervention
  pieces: any[] = [];
  showPopupTasks: boolean = false; // Ajout de la propriété pour afficher/masquer le popup
  currentInterventionId: string = '';
  showPopupStatus : boolean = false;

  showPopupAddPiece: boolean = false;
  selectedInterventionId: string = '';
  selectedSousService: string = '';
  selectedPiece: string = '';
  quantite: number = 1;
  sousServices: any = [];
  pieces2: any[] = [];

  constructor(private planningService: PlanningService) {}

  ngOnInit(): void {
    this.loadAllPlannings(); // Charger tous les plannings au chargement
  }

  loadAllPlannings(): void {
    this.planningService.getAllPlannings().subscribe(
      (response: any) => {
        if (response.success) {
          this.interventions = response.data;
        } else {
          this.interventions = [];
          this.message = response.message || "Aucun planning disponible.";
        }
      },
      (error) => {
        console.error("Erreur lors du chargement des plannings :", error);
        this.message = "Erreur lors de la récupération des données.";
      }
    );
  }

  getListPlanningSearch(): void {
    const { date } = this.searchForm;
    if (!date) {
      alert("Veuillez sélectionner une date !");
      return;
    }

    this.planningService.searchPlannings(date).subscribe(
      (response: any) => {
        if (response.success) {
          this.interventions = response.data;
          this.message = this.interventions.length === 0 ? "Aucune intervention trouvée." : '';
        } else {
          this.interventions = [];
          this.message = response.message;
        }
      },
      (error) => {
        console.error("Erreur lors de la recherche :", error);
        this.message = "Erreur lors de la récupération des données.";
      }
    );
  }

  showTasks(interventionId: string): void {
      // Appeler une méthode pour récupérer les tâches de l'intervention via le service
      this.planningService.getTasksForIntervention(interventionId).subscribe(
        (response: any) => {
          if (response.success) {
            this.tasks = response.sous_services; // Utilisez response.sous_services pour les tâches
            this.pieces = response.pieces;
            this.showPopupTasks = true; // Afficher le popup lorsque les tâches sont chargées
          } else {
            this.tasks = [];
            this.pieces = [];
            alert(response.message || "Erreur lors du chargement des tâches.");
          }
        },
        (error) => {
          alert("Erreur lors du chargement des tâches.");
        }
      );
  }
  

  closePopupTasks(): void {
    this.showPopupTasks = false; // Fermer le popup
  }

  // Ouvre le popup de mise à jour du statut
  openUpdateStatusPopup(intervention: any) {
    this.selectedStatus = intervention.avancement; // Pré-sélectionner le statut actuel
    this.currentInterventionId = intervention.id_intervention;
    this.showPopupStatus = true;
  }

  // Ferme le popup de mise à jour du statut
  closeUpdateStatusPopup() : void {
    this.showPopupStatus = false;
  }

  // Appelle le service pour mettre à jour le statut de l'intervention
  updateStatus() {
    if (this.selectedStatus && this.currentInterventionId) {
      this.planningService.updateInterventionStatus(this.currentInterventionId, this.selectedStatus)
        .subscribe(
          response => {
            if (response.success) {
              this.message = 'Statut mis à jour avec succès.';
              this.loadAllPlannings();
              this.closeUpdateStatusPopup();
            } else {
              this.message = response.message; // Afficher le message d'erreur reçu du backend
            }
          },
          error => {
            this.message = 'Erreur lors de la mise à jour du statut';
          }
        );
    } else {
      this.message = "Erreur : ID ou statut manquant !";
    }

    // Supprimer le message après quelques secondes
    this.clearMessageAfterDelay();
  }

  clearMessageAfterDelay() {
    setTimeout(() => {
      this.message = '';
    }, 5000); // 5 secondes
  }
  

  openAddPiecePopup(idIntervention: string) {
    this.selectedInterventionId = idIntervention;
    this.showPopupAddPiece = true;
    this.loadSousServices(); // Charger les sous-services au moment de l'ouverture
  }
  
  closeAddPiecePopup() {
    this.showPopupAddPiece = false;
    this.selectedSousService = '';
    this.selectedPiece = '';
    this.quantite = 1;
    this.pieces2 = [];
  }
  
  loadSousServices() {
    this.planningService.getSousServices().subscribe(response => {
      this.sousServices = response; // Enlever .sousServices
    });
  }
  
  loadPiecesBySousService() {
    if (!this.selectedSousService) return;
  
    this.planningService.getPiecesBySousService(this.selectedSousService).subscribe((response: any) => {
      console.log("Réponse API complète :", response);
  
      this.pieces2 = []; // Réinitialisation du tableau des pièces
      this.pieces = []; // Réinitialisation de `pieces`
  
      if (response.success && Array.isArray(response.piecesSousService)) {
        // Parcours des pièces dans `piecesSousService`
        for (let i = 0; i < response.piecesSousService.length; i++) {
          let item = response.piecesSousService[i];
  
          // Assure-toi que `item.id_piece` contient bien un objet avec les informations nécessaires
          if (item.id_piece && item.id_piece._id) {
            this.pieces.push({
              id: item.id_piece._id,
              nom: item.id_piece.nom_piece // Utilisation correcte du nom
            });
          }
        }
  
        console.log("Liste finale des pièces :", this.pieces);
      } else {
        console.error('Erreur : Liste des pièces non trouvée ou format incorrect', response);
      }
    }, error => {
      console.error('Erreur API :', error);
      this.pieces = [];
    });
  }
  
  
  addPieceToIntervention() {
    if (!this.selectedPiece || this.quantite <= 0) return;
  
    const data = {
      id_intervention: this.selectedInterventionId,
      id_piece: this.selectedPiece,
      quantite: this.quantite
    };
  
    this.planningService.addPieceToIntervention(data).subscribe((response: any) => {
      if (response.success) {
        alert('Pièce ajoutée avec succès');
        this.closeAddPiecePopup();
      } else {
        alert(response.message);
      }
    });
  }
  

}
