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
           }; // Objet pour s tocker les données du formulaire

          vehicules: any[] = [];
          marques: any[] = [];
          modeles: any[] = [];

          constructor(private vehiculeService: VehiculeService ,private marqueService: MarqueService , private modelService: ModelService) {}

          ngOnInit(): void {
            this.loadVehicule();
            this.loadMarques();
            }

        loadVehicule(): void {
          this.vehiculeService.getData().subscribe(data => {
            this.vehicules = data;
          });
        }

        loadMarques(): void {
          this.marqueService.getData().subscribe(data => {
            this.marques = data;
            console.log('Marques chargées:', this.marques);
          });
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
            this.selectedVehiculeId = vehicule._id; // Stocker l'ID du modèle sélectionné
            this.updateForm = {
                id_marque: vehicule.id_marque,id_modele : vehicule.id_modele ,
                immatriculation: vehicule.immatriculation ,
                annee : vehicule.annee , couleur:vehicule.couleur
            };
            console.log('ty mints le vehicule.id_marque' , vehicule.marque);
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
