import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarqueService } from '../../../services/marque.service';
import { ModelService } from '../../../services/model.service';
import { VehiculeService } from '../../../services/vehicule.service';

@Component({
  selector: 'app-ajout-vehicule',
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout-vehicule.component.html',
  styleUrl: './ajout-vehicule.component.css'
})
export class AjoutVehiculeComponent {
  elementForm = { id_marque: '', id_modele: '', immatriculation: '', annee: '' , couleur:''};

  vehicules: any[] = [];
  marques: any[] = [];
  modeles: any[] = [];
  serverMessage: { text: string, class: string } = { text: '', class: '' };

  constructor(private vehiculeService: VehiculeService, private marqueService: MarqueService, private modelService: ModelService) {}

  ngOnInit(): void {
    this.loadMarque();
  }

  loadMarque(): void {
    this.marqueService.getData().subscribe(data => {
      this.marques = data;
    });
  }

  loadModel(): void {
    if (this.elementForm.id_marque) {
      this.modelService.getDataModelByIdMarque(this.elementForm.id_marque).subscribe(data => {
        this.modeles = data;
        console.log('Modèles chargés:', this.modeles);
      });
    } else {
      this.modeles = [];
    }
  }

  submitted: boolean = false;

  AddVehicule(): void {
    this.submitted = true;  // Indique que le formulaire a été soumis
    console.log("📤 Données envoyées :", this.elementForm);

    if (!this.elementForm.id_marque || !this.elementForm.id_modele || !this.elementForm.immatriculation ||
        !this.elementForm.annee || !this.elementForm.couleur) {
      console.warn("⚠️ Formulaire incomplet :", this.elementForm);

      // Affichage d'un message d'erreur
      this.serverMessage = { text: 'Veuillez remplir tous les champs du formulaire.', class: 'error show' };

      setTimeout(() => {
        this.serverMessage = { text: '', class: '' };
      }, 3000);

      return;
    }

    // Si le formulaire est complet, on procède à l'ajout du véhicule
    this.vehiculeService.addVehicule(this.elementForm).subscribe(
      response => {
        console.log("✅ Réponse du serveur :", response);

        if (response && response.message) {
          this.serverMessage = { text: response.message, class: 'success show' };
        } else {
          this.serverMessage = { text: 'Demande envoyée avec succès.', class: 'success show' };
        }

        this.elementForm = { id_marque: '', id_modele: '', immatriculation: '', annee: '', couleur: '' };
        this.submitted = false;

        setTimeout(() => {
          this.serverMessage = { text: '', class: '' };
        }, 3000);

        this.modeles = [];
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

}
