import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemandeDevisService } from '../../../services/demande-devis.service';
import { ServiceListService } from '../../../services/service.service';
import { SousServiceService } from '../../../services/sous-service.service';
import { VehiculeService } from '../../../services/vehicule.service';


@Component({
  selector: 'app-demande-devis-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './demande-devis-client.component.html',
  styleUrl: './demande-devis-client.component.css'
})
export class DemandeDevisClientComponent {
  elementForm = { id_service: '', sous_services: [] as string[],
     id_vehicule: '', images: [] as File[], probleme: '' };

  demandes: any[] = [];
  services: any[] = [];
  sous_services: any[] = [];
  vehicules: any[] = [];
  serverMessage: { text: string, class: string } = { text: '', class: '' }; // Ajouter une structure pour le message
  selectedFile: File | null = null; // Stocke le fichier sélectionné

  ngOnInit(): void {
    this.loadServiceList();
    this.loadSousService();
    this.loadVehicule();
    }

  constructor(private sousServiceService: SousServiceService
            , private demandeDevisService: DemandeDevisService
            , private serviceListService: ServiceListService
            , private vehiculeService: VehiculeService
          ) {}

          AddDemandeDevis(): void {
            console.log("📤 Données envoyées :", this.elementForm);

            if (!this.elementForm.id_service || !this.elementForm.sous_services ||
                !this.elementForm.id_vehicule || this.elementForm.images.length === 0 || !this.elementForm.probleme) {
              console.warn("⚠️ Formulaire incomplet :", this.elementForm);
              return;
            }

            const formData = new FormData();
            formData.append('id_service', this.elementForm.id_service);
            formData.append('id_vehicule', this.elementForm.id_vehicule);
            formData.append('probleme', this.elementForm.probleme);
            this.elementForm.sous_services.forEach(service => formData.append('sous_services', service));
            this.elementForm.images.forEach(file => formData.append('images', file));

            this.demandeDevisService.AddDemandeDevis(formData).subscribe(
              response => {
                console.log("✅ Réponse du serveur :", response);

                if (response && response.message) {
                  this.serverMessage = { text: response.message, class: 'success show' };
                } else {
                  this.serverMessage = { text: 'Demande envoyée avec succès.', class: 'success show' };
                }

                // Réinitialiser le formulaire
                this.elementForm = { id_service: '', sous_services: [], id_vehicule: '', images: [], probleme: '' };

                setTimeout(() => {
                  this.serverMessage = { text: '', class: '' };
                }, 3000);
              },
              error => {
                console.error("❌ Erreur lors de l'ajout :", error);

                const errorMessage = error.error?.message || "Erreur lors de l'ajout de la demande.";
                this.serverMessage = { text: errorMessage, class: 'error show' };

                setTimeout(() => {
                  this.serverMessage = { text: '', class: '' };
                }, 3000);
              }
            );
        }


    loadServiceList(): void {
      this.serviceListService.getData().subscribe(data => this.services =
      data);
      console.log('service' , this.services );
    }

    loadSousService(): void {
      if (this.elementForm.id_service) {
        this.sousServiceService.getSousServiceByIdService(this.elementForm.id_service).subscribe(data => {
          this.sous_services = data;
          console.log('sous_services chargés:', this.sous_services);
        });
      } else {
        this.sous_services = [];
      }
    }


    loadVehicule(): void {
      this.vehiculeService.getData().subscribe(data => {
        this.vehicules = data;
        console.log('vehicules chargées retooo:', this.vehicules); // Vérifier les catégories après chargement
       // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
      });
    }

      // Fonction pour récupérer le fichier sélectionné
      onFileSelected(event: any): void {
        if (event.target.files.length > 0) {
          this.elementForm.images = Array.from(event.target.files); // Convertit en tableau
          console.log("📸 Fichiers sélectionnés :", this.elementForm.images);
        } else {
          console.warn("⚠️ Aucun fichier sélectionné !");
        }
      }

      toggleSousService(id_sous_service: string, event: Event) {
        const isChecked = (event.target as HTMLInputElement).checked;

        if (isChecked) {
          this.elementForm.sous_services.push(id_sous_service); // Ajouter si coché
        } else {
          this.elementForm.sous_services = this.elementForm.sous_services.filter(id => id !== id_sous_service); // Supprimer si décoché
        }

        console.log("🔹 Sous-services sélectionnés :", this.elementForm.sous_services);
      }

}
