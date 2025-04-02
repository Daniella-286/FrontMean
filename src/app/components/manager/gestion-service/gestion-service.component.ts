import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceListService } from '../../../services/service.service';

@Component({
  selector: 'app-gestion-service',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-service.component.html',
  styleUrl: './gestion-service.component.css'
})
export class GestionServiceComponent {

   showPopup = false; // Pour l'ajout
      showUpdatePopup = false; // Pour l'update
      selectedServiceId: string | null = null;

      elementForm = { nom_service: '' ,  description:''
      };
      updateForm = { nom_service: '', description:'' , image:''}; // Objet pour stocker les données du formulaire

      selectedFile: File | null = null; // Stocke le fichier sélectionné

      // Ouvrir le popup d'ajout
      openAddPopup() {
        this.showPopup = true;
        this.showUpdatePopup = false;
        console.log("Popup d'ajout affiché");
      }
      // Ouvrir le popup de mise à jour et récupérer les infos du parking
      openUpdatePopup(service: any) {
        this.selectedServiceId = service._id; // Stocker l'ID du service sélectionné
        this.updateForm = { nom_service: service.nom_service ,image:service.image ,  description:service.description}; // Remplir le formulaire avec les données existantes
        this.showUpdatePopup = true;
        this.showPopup = false;
        console.log("Popup de mise à jour affiché", service);
      }

      // Fermer les popups
      closePopup() {
        this.showPopup = false;
        this.showUpdatePopup = false;
        this.selectedServiceId = null;
      }

        services: any[] = [];

        ngOnInit(): void {
          this.loadServiceList();
          }

          constructor(private serviceListService: ServiceListService) {}

          loadServiceList(): void {
            this.serviceListService.getData().subscribe(
              data => {
                if (data && Array.isArray(data.services)) {
                  this.services = data.services; // ✅ Extraire uniquement la liste des services
                } else {
                  console.error("❌ Erreur: data.services reçu n'est pas un tableau", data);
                  this.services = [];
                }
              },
              error => {
                console.error("❌ Erreur lors du chargement des services :", error);
                this.services = [];
              }
            );
          }


        // loadServiceList(): void {
        //   this.serviceListService.getData().subscribe(data => this.services =
        //   data);
        //   console.log('service' , this.services );

        // }
        // Fonction pour récupérer le fichier sélectionné
        onFileSelected(event: any): void {
          if (event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];
            console.log("📸 Fichier sélectionné :", this.selectedFile);
          } else {
            console.warn("⚠️ Aucun fichier sélectionné !");
          }

        }

        AddService(): void {
          console.log("Nom service itooo :", this.elementForm.nom_service);
          console.log("Description itooo :", this.elementForm.description);
          console.log("Fichier itooo:", this.selectedFile);

            // Vérifier si tous les champs requis sont remplis
            if (!this.elementForm.nom_service || !this.elementForm.description || !this.selectedFile
                ) {
              console.warn("⚠️ Formulaire incomplet :", this.elementForm);
              return;
            }

          const formData = new FormData();
          formData.append("nom_service", this.elementForm.nom_service);
          formData.append("description", this.elementForm.description);
          formData.append("image", this.selectedFile); // Ajoute l'image en tant que fichier
          console.log("📤 Données envoyées :", formData);

           // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

            this.serviceListService.addService(formData).subscribe(
              response => {
                console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
                console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

                // 🔹 OU (meilleure approche) : Recharger toute la liste depuis le serveur
                this.loadServiceList();

                this.elementForm = {nom_service: "", description: ""  }; // Réinitialise le formulaire
                this.showPopup = false;
              },
              error => {
                console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
              }
            );
          }

           // Supprimer un parking
          deleteService(id: string): void {
            console.log('id_Service itooo' , id)
              const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
              this.serviceListService.deleteServiceById(id , headers).subscribe(() =>
            this.loadServiceList());
          }

        // Mettre à jour un Service
        updateService(): void {
          if (!this.selectedServiceId) return;

          const updatedService = {
            nom_service: this.updateForm.nom_service,
           image:this.updateForm.image,
           description:this.updateForm.description
          };

          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

          this.serviceListService.updateServiceById(this.selectedServiceId, updatedService, headers).subscribe(
            () => {
              this.loadServiceList(); // Recharger la liste après modification
              this.closePopup();
            },
            error => {
              console.error("❌ Erreur lors de la mise à jour :", error);
            }
          );
        }

}
