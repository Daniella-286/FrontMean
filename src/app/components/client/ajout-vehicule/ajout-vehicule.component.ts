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

  AddVehicule(): void {
    console.log("📤 Données envoyées :", this.elementForm);

    if (!this.elementForm.id_marque || !this.elementForm.id_modele || !this.elementForm.immatriculation ||
      !this.elementForm.annee || !this.elementForm.couleur) {
      console.warn("⚠️ Formulaire incomplet :", this.elementForm);
      return;
    }

    this.vehiculeService.addVehicule(this.elementForm).subscribe(
      response => {
        console.log("✅ Réponse du serveur :", response);
        this.elementForm = { id_marque: '', id_modele: '', immatriculation: '', annee: '' ,couleur:''};
        this.modeles = []; // Réinitialiser la liste des modèles
      },
      error => {
        console.error("❌ Erreur lors de l'ajout :", error);
      }
    );
  }
}
