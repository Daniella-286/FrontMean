import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceListService } from '../../services/service.service';

@Component({
  selector: 'app-ajout-service',
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout-service.component.html',
  styleUrl: './ajout-service.component.css'
})

export class AjoutServiceComponent {
  elementForm = { nom_service: "", description: "" };
  selectedFile: File | null = null; // Stocke le fichier sélectionné

  constructor(private serviceListService: ServiceListService) {}

  // Fonction pour récupérer le fichier sélectionné
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log("📸 Fichier sélectionné :", this.selectedFile);
    } else {
      console.warn("⚠️ Aucun fichier sélectionné !");
    }
  }

  registerService(): void {

    console.log("Nom service itooo :", this.elementForm.nom_service);
    console.log("Description itooo :", this.elementForm.description);
    console.log("Fichier itooo:", this.selectedFile);

    if (!this.elementForm.nom_service || !this.elementForm.description || !this.selectedFile) {
      console.warn("⚠️ Formulaire incomplet, fichier manquant !");
      return;
    }

    const formData = new FormData();
    formData.append("nom_service", this.elementForm.nom_service);
    formData.append("description", this.elementForm.description);
    formData.append("image", this.selectedFile); // Ajoute l'image en tant que fichier

    console.log("📤 Données envoyées :", formData);

    this.serviceListService.addService(formData).subscribe(
      response => {
        console.log("✅ Réponse du serveur :", response);
        this.elementForm = { nom_service: "", description: "" };
        this.selectedFile = null; // Réinitialise le fichier
      },
      error => {
        console.error("❌ Erreur lors de l'ajout :", error);
      }
    );
  }
}

