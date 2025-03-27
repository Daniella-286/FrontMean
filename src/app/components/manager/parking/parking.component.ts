import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParkingService } from '../../../services/parking.service';

@Component({
  selector: 'app-parking',
  imports: [CommonModule, FormsModule],
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent {

  showPopup = false; // Pour l'ajout
  showUpdatePopup = false; // Pour l'update
  selectedParkingId: string | null = null;

  elementForm = { numero: '' , tarif:''
  };
  updateForm = { numero: '', tarif: '' }; // Objet pour stocker les données du formulaire

  // Ouvrir le popup d'ajout
  openAddPopup() {
    this.showPopup = true;
    this.showUpdatePopup = false;
    console.log("Popup d'ajout affiché");
  }
  // Ouvrir le popup de mise à jour et récupérer les infos du parking
  openUpdatePopup(parking: any) {
    this.selectedParkingId = parking._id; // Stocker l'ID du parking sélectionné
    this.updateForm = { numero: parking.numero, tarif: parking.tarif }; // Remplir le formulaire avec les données existantes
    this.showUpdatePopup = true;
    this.showPopup = false;
    console.log("Popup de mise à jour affiché", parking);
  }

  // Fermer les popups
  closePopup() {
    this.showPopup = false;
    this.showUpdatePopup = false;
    this.selectedParkingId = null;
  }

    parkings: any[] = [];

    ngOnInit(): void {
      this.loadParkingList();
      }

      constructor(private parkingService: ParkingService) {}

    loadParkingList(): void {
      this.parkingService.getData().subscribe(data => this.parkings =
      data);
    }

    AddParking(): void {
        console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

        // Vérifier si tous les champs requis sont remplis
        if (!this.elementForm.numero || !this.elementForm.tarif
            ) {
          console.warn("⚠️ Formulaire incomplet :", this.elementForm);
          return;
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        this.parkingService.addParking(this.elementForm, headers).subscribe(
          response => {
            console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
            console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

            // 🔹 OU (meilleure approche) : Recharger toute la liste depuis le serveur
            this.loadParkingList();

            this.elementForm = {numero: '' , tarif:'' }; // Réinitialise le formulaire
            this.showPopup = false;
          },
          error => {
            console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
          }
        );
      }

       // Supprimer un parking
      deleteParking(id: string): void {
        console.log('id_parking itooo' , id)
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          this.parkingService.deleteParkingById(id , headers).subscribe(() =>
        this.loadParkingList());
      }

    // Mettre à jour un parking
    updateParking(): void {
      if (!this.selectedParkingId) return;

      const updatedParking = {
        numero: this.updateForm.numero,
        tarif: this.updateForm.tarif
      };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.parkingService.updateParkingById(this.selectedParkingId, updatedParking, headers).subscribe(
        () => {
          this.loadParkingList(); // Recharger la liste après modification
          this.closePopup();
        },
        error => {
          console.error("❌ Erreur lors de la mise à jour :", error);
        }
      );
    }
  }






