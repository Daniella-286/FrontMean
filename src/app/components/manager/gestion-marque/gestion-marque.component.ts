import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarqueService } from '../../../services/marque.service';

@Component({
  selector: 'app-gestion-marque',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-marque.component.html',
  styleUrl: './gestion-marque.component.css'
})
export class GestionMarqueComponent {

    showPopup = false; // Pour l'ajout
      showUpdatePopup = false; // Pour l'update
      selectedPieceId: string | null = null;

      elementForm = { nom_marque: ''
      };
      updateForm = { nom_marque: '' }; // Objet pour stocker les données du formulaire

      // Ouvrir le popup d'ajout
      openAddPopup() {
        this.showPopup = true;
        this.showUpdatePopup = false;
        console.log("Popup d'ajout affiché");
      }
      // Ouvrir le popup de mise à jour et récupérer les infos du parking
      openUpdatePopup(marque: any) {
        this.selectedPieceId = marque._id; // Stocker l'ID du piece sélectionné
        this.updateForm = { nom_marque: marque.nom_marque }; // Remplir le formulaire avec les données existantes
        this.showUpdatePopup = true;
        this.showPopup = false;
        console.log("Popup de mise à jour affiché", marque);
      }

      // Fermer les popups
      closePopup() {
        this.showPopup = false;
        this.showUpdatePopup = false;
        this.selectedPieceId = null;
      }

        marques: any[] = [];

        ngOnInit(): void {
          this.loadMarqueList();
          }

            constructor(private marqueService: MarqueService ) {}

        loadMarqueList(): void {
          this.marqueService.getData().subscribe(data => this.marques =
          data);
        }

        AddMarque(): void {
            console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

            // Vérifier si tous les champs requis sont remplis
            if (!this.elementForm.nom_marque
                ) {
              console.warn("⚠️ Formulaire incomplet :", this.elementForm);
              return;
            }

            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

            this.marqueService.addMarqueService(this.elementForm, headers).subscribe(
              response => {
                console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
                console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

                // 🔹 OU (meilleure approche) : Recharger toute la liste depuis le serveur
                this.loadMarqueList();

                this.elementForm = {nom_marque: ''}; // Réinitialise le formulaire
                this.showPopup = false;
              },
              error => {
                console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
              }
            );
          }

           // Supprimer un parking
          deleteMarque(id: string): void {
            console.log('id_piece itooo' , id)
              const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
              this.marqueService.deleteMarqueById(id , headers).subscribe(() =>
            this.loadMarqueList());
          }

        // Mettre à jour un piece
        updateMarque(): void {
          if (!this.selectedPieceId) return;

          const updatedPiece = {
            nom_marque: this.updateForm.nom_marque
          };

          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

          this.marqueService.updateMarquegById(this.selectedPieceId, updatedPiece, headers).subscribe(
            () => {
              this.loadMarqueList(); // Recharger la liste après modification
              this.closePopup();
            },
            error => {
              console.error("❌ Erreur lors de la mise à jour :", error);
            }
          );
        }

}
