import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PieceService } from '../../../services/piece.service';

@Component({
  selector: 'app-gestion-stock',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-stock.component.html',
  styleUrl: './gestion-stock.component.css'
})
export class GestionStockComponent {
     showPopup = false; // Pour l'ajout
      showUpdatePopup = false; // Pour l'update
      selectedPieceId: string | null = null;

      elementForm = { nom_piece: '' , prix_unitaire:''};
      updateForm = { nom_piece: '', prix_unitaire: '' }; // Objet pour stocker les données du formulaire

      // Ouvrir le popup d'ajout
      openAddPopup() {
        this.showPopup = true;
        this.showUpdatePopup = false;
        console.log("Popup d'ajout affiché");
      }
      // Ouvrir le popup de mise à jour et récupérer les infos du parking
      openUpdatePopup(piece: any) {
        this.selectedPieceId = piece._id; // Stocker l'ID du piece sélectionné
        this.updateForm = { nom_piece: piece.nom_piece, prix_unitaire: piece.prix_unitaire }; // Remplir le formulaire avec les données existantes
        this.showUpdatePopup = true;
        this.showPopup = false;
        console.log("Popup de mise à jour affiché", piece);
      }

      // Fermer les popups
      closePopup() {
        this.showPopup = false;
        this.showUpdatePopup = false;
        this.selectedPieceId = null;
      }

        pieces: any[] = [];

        ngOnInit(): void {
          this.loadPieceList();
          }

          constructor(private pieceService: PieceService) {}

        loadPieceList(): void {
          this.pieceService.getData().subscribe(data => this.pieces =
          data);
        }

        AddPiece(): void {
            console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

            // Vérifier si tous les champs requis sont remplis
            if (!this.elementForm.nom_piece || !this.elementForm.prix_unitaire
                ) {
              console.warn("⚠️ Formulaire incomplet :", this.elementForm);
              return;
            }

            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

            this.pieceService.addPiece(this.elementForm, headers).subscribe(
              response => {
                console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
                console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));

                // 🔹 OU (meilleure approche) : Recharger toute la liste depuis le serveur
                this.loadPieceList();

                this.elementForm = {nom_piece: '' , prix_unitaire:'' }; // Réinitialise le formulaire
                this.showPopup = false;
              },
              error => {
                console.error("❌ Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
              }
            );
          }

           // Supprimer un parking
          deletePiece(id: string): void {
            console.log('id_piece itooo' , id)
              const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
              this.pieceService.deletePieceById(id , headers).subscribe(() =>
            this.loadPieceList());
          }

        // Mettre à jour un piece
        updatePiece(): void{
          if (!this.selectedPieceId) return;

          const updatedPiece = {
            nom_piece: this.updateForm.nom_piece,
            prix_unitaire: this.updateForm.prix_unitaire
          };

          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

          this.pieceService.updatePiecegById(this.selectedPieceId, updatedPiece, headers).subscribe(
            () => {
              this.loadPieceList(); // Recharger la liste après modification
              this.closePopup();
            },
            error => {
              console.error("❌ Erreur lors de la mise à jour :", error);
            }
          );
        }

}
