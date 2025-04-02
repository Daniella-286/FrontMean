import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InterventionService } from '../../../services/Interventions.service';
import { MarqueService } from '../../../services/marque.service';
import { ModelService } from '../../../services/model.service';
import { VehiculeService } from '../../../services/vehicule.service';

@Component({
  selector: 'app-historique-interventions-vehicules',
  imports: [CommonModule, FormsModule],
  templateUrl: './historique-interventions-vehicules.component.html',
  styleUrl: './historique-interventions-vehicules.component.css'
})
export class HistoriqueInterventionsVehiculesComponent {


    showPopup = false; // Pour l'ajout
    showUpdatePopup = false; // Pour l'update
    selectedVehiculeId: string | null = null;
      vehiculeSearchForm = { immatriculation:''
      };

    vehicules: any[] = [];
    interventions: any[] = [];
    marques: any[] = [];
    modeles: any[] = [];
    allVehicules: any[] = []; // Stocke toutes les données de l'API

    currentPage: number = 1; // Page courante
    pageSize: number = 5; // Nombre d'éléments par page
    totalItems: number = 0; // Nombre total d'éléments
    totalPages: number = 0; // Nouvelle variable pour stocker le nombre total de pages
    vehiculesPaginated: any[] = []; // Liste paginée

            constructor(private vehiculeService: VehiculeService
              ,private marqueService: MarqueService
              ,private modelService: ModelService,
              private interventionService:InterventionService
            ) {}

            ngOnInit(): void {
              this.loadVehicule();
              this.loadMarques();
              }

              loadVehicule(): void {
                this.vehiculeService.getData().subscribe(data => {
                  this.vehicules = data || []; // Assure que ce n'est pas `undefined`
                  this.totalItems = this.vehicules.length;

                  // 🔹 Met à jour `totalPages` après la mise à jour des données
                  this.totalPages = Math.ceil(this.totalItems / this.pageSize);

                  console.log("totalItems:", this.totalItems, "totalPages:", this.totalPages);

                  this.paginate();
                });
              }


        // Ouvrir le popup d'ajout
        selectedDemandeId: string | null = null;
        openPopup(vehicule: any): void {
          console.log("ID envoyé pour le veeeee ooooohh :", vehicule);
          this.selectedDemandeId = vehicule._id; // Stocke l'ID
          this.showPopup = true;
          this.getHistoriqueIntervention(this.selectedDemandeId);
        }


        getHistoriqueIntervention(id_vehicule: any): void {
          this.interventionService.getHistoriqueIntervention(id_vehicule).subscribe(response => {
            this.interventions = response?.historique || []; // Assure que c'est un tableau
          });
        }


              paginate(): void {
                // 🔹 Vérifie que la page actuelle est valide
                if (this.currentPage > this.totalPages) {
                  this.currentPage = this.totalPages;
                }

                const startIndex = (this.currentPage - 1) * this.pageSize;
                const endIndex = startIndex + this.pageSize;

                console.log("startIndex:", startIndex, "endIndex:", endIndex);

                this.vehiculesPaginated = this.vehicules.slice(startIndex, endIndex);
                console.log("Paginated vehicules:", this.vehiculesPaginated);
              }

              // Fonction pour changer de page
              changePage(page: number): void {
                if (page >= 1 && page <= this.totalPages) {
                  this.currentPage = page;
                  this.paginate();
                }
              }

          loadMarques(): void {
            this.marqueService.getData().subscribe(data => {
              this.marques = data;
            });
          }


          getVehiculeSearch(): void {
            console.log("🔍 Recherche déclenchée !");

            if (this.vehiculeSearchForm.immatriculation) {
              console.log("📌 Immatriculation recherchée :", this.vehiculeSearchForm.immatriculation);

              this.vehiculeService.getVehiculeSearch(this.vehiculeSearchForm.immatriculation).subscribe(
                (data) => {
                  console.log("✅ Réponse reçue :", data);
                  this.vehicules = data;
                  console.log("🚗 Liste des véhicules :", this.vehicules);
                },
                (error) => {
                  console.error("❌ Erreur lors de la recherche :", error);
                }
              );

            } else {
              console.warn("⚠️ Aucun critère de recherche saisi !");
              this.vehicules = [];
            }
          }


            // Fermer les popups
            closePopup() {
              this.showPopup = false;
              this.selectedVehiculeId = null;
            }


}
