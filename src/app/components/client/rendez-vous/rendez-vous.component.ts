import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rendez-vous',
  imports: [CommonModule, FormsModule],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.css'
})
export class RendezVousComponent {
  showPopup = false; // Pour l'ajout

  // ngOnInit(): void {
  //   this.loadParkingList();
  // }

  // loadParkingList(): void {
  //   this.parkingService.getData().subscribe(data => this.parkings =
  //   data);
  // }

    // Ouvrir le popup d'ajout
    openRendezVousPopup() {
    this.showPopup = true;
    console.log("Popup d'ajout affiché");
  }
    // Fermer les popups
  closePopup() {
    this.showPopup = false;
  }

  //  addReservationParking(): void {
  //         console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

  //         // Vérifier si tous les champs requis sont remplis
  //         if (!this.elementForm.id_parking || !this.elementForm.id_vehicule
  //           || !this.elementForm.date_debut || !this.elementForm.date_fin
  //           || !this.elementForm.tarif_den
  //             ) {
  //           console.warn(" Formulaire incomplet :", this.elementForm);
  //           return;
  //         }

  //         const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //         this.parkingService.addParking(this.elementForm, headers).subscribe(
  //           response => {
  //             console.log(" Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
  //             console.log(" Données envoyées au serveur :", JSON.stringify(this.elementForm));

  //             // 🔹 OU (meilleure approche) : Recharger toute la liste depuis le serveur
  //             this.loadParkingList();

  //             this.elementForm = {id_parking: '' , id_vehicule:'' , date_debut:'',
  //               date_fin:'' , tarif_den:''}; // Réinitialise le formulaire
  //             this.showPopup = false;
  //           },
  //           error => {
  //             console.error(" Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
  //           }
  //         );
  //       }

}
