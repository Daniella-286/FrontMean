import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarqueService } from '../../../services/marque.service';
import { ModelService } from '../../../services/model.service';
import { VehiculeService } from '../../../services/vehicule.service';

@Component({
  selector: 'app-gestion-vehicule',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-vehicule.component.html',
  styleUrl: './gestion-vehicule.component.css'
})
export class GestionVehiculeComponent {
   showPopup = false; // Pour l'ajout
          showUpdatePopup = false; // Pour l'update
          selectedVehiculeId: string | null = null;

          updateForm = { id_marque:'' , id_modele:'' ,
            immatriculation:'' , annee:'' , couleur:''
           }; // Objet pour s tocker immatriculationles données du formulaire

           vehiculeSearchForm = { immatriculation:''
           };

          vehicules: any[] = [];
          marques: any[] = [];
          modeles: any[] = [];
          allVehicules: any[] = []; // Stocke toutes les données de l'API

          currentPage: number = 1; // Page courante
          pageSize: number = 5; // Nombre d'éléments par page
          totalItems: number = 0; // Nombre total d'éléments
          totalPages: number = 0; // Nouvelle variable pour stocker le nombre total de pages
          vehiculesPaginated: any[] = []; // Liste paginée
          constructor(private vehiculeService: VehiculeService ,private marqueService: MarqueService , private modelService: ModelService) {}

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


        loadModel(): void {
          if (this.updateForm.id_marque) {
            this.modelService.getDataModelByIdMarque(this.updateForm.id_marque).subscribe(data => {
              this.modeles = data;
              console.log('Modèles chargés:', this.modeles);
            });
          } else {
            this.modeles = [];
          }
        }

          openUpdatePopup(vehicule: any) {
            console.log("misokatra ilay popup ")
            this.selectedVehiculeId = vehicule._id; // Stocker l'ID du modèle sélectionné
            this.updateForm = {
                id_marque: vehicule.id_marque,id_modele : vehicule.id_modele ,
                immatriculation: vehicule.immatriculation ,
                annee : vehicule.annee , couleur:vehicule.couleur
            };
            console.log('ty mints le vehicule.id_marque' ,  this.updateForm);
            this.showUpdatePopup = true;
            this.showPopup = false;
            console.log("Popup de mise à jour affiché", this.updateForm);
          }

          // Fermer les popups
          closePopup() {
            this.showPopup = false;
            this.showUpdatePopup = false;
            this.selectedVehiculeId = null;
          }


               // Supprimer un parking
              deleteVehicule(id: string): void {
                console.log('id_piece itooo' , id)
                  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                  this.vehiculeService.deleteVehiculeById(id , headers).subscribe(() =>
                this.loadVehicule());
              }

            // Mettre à jour un piece
            updateVehicule(): void {
              if (!this.selectedVehiculeId) return;

              const updatedvehicule = {
                id_marque: this.updateForm.id_marque,id_modele : this.updateForm.id_modele ,
                immatriculation: this.updateForm.immatriculation ,
                annee : this.updateForm.annee , couleur:this.updateForm.couleur
              };

              const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

              this.vehiculeService.updateVehiculegById(this.selectedVehiculeId, updatedvehicule, headers).subscribe(
                () => {
                  this.loadVehicule(); // Recharger la liste après modification
                  this.closePopup();
                },
                error => {
                  console.error("❌ Erreur lors de la mise à jour :", error);
                }
              );
            }


}
