import { Component, OnInit } from '@angular/core';
import { MouvementStockService } from '../../../services/mouvement-stock.service';
import { PieceService } from '../../../services/piece.service';
import { TypeMouvementService } from '../../../services/type-mouvement.service';
import { FormsModule } from '@angular/forms'; // Ajout pour ngModel
import { CommonModule } from '@angular/common'; // Ajout pour les pipes comme 'date'

@Component({
  selector: 'app-mouvement-stock',
  templateUrl: './mouvement-stock.component.html',
  imports: [
    FormsModule, // Ajouté ici pour gérer [(ngModel)]
    CommonModule // Ajouté ici pour le pipe date
  ],
  styleUrls: ['./mouvement-stock.component.css']
})
export class MouvementStockComponent implements OnInit {
  pieces: any[] = [];
  typesMouvement: any[] = [];
  selectedPiece: string = '';
  selectedTypeMouvement: string = '';
  quantite: number = 0;
  message: string = '';

  constructor(
    private mouvementStockService: MouvementStockService,
    private pieceService: PieceService,
    private typeMouvementService: TypeMouvementService
  ) {}

  ngOnInit(): void {
    this.chargerPieces();
    this.chargerTypesMouvement();
  }

  chargerPieces(): void {
    this.pieceService.getData().subscribe(
      (data) => {
        // Assure-toi que 'data' est bien un tableau
        this.pieces = Array.isArray(data) ? data : [];
      },
      (error) => { console.error('Erreur lors du chargement des pièces', error); }
    );
  }
  
  chargerTypesMouvement(): void {
    this.typeMouvementService.getTypesMouvement().subscribe(
      (data) => {
        // Assure-toi que 'data' est bien un tableau
        this.typesMouvement = Array.isArray(data) ? data : [];
      },
      (error) => { console.error('Erreur lors du chargement des types de mouvement', error); }
    );
  }

  ajouterMouvement(): void {
    if (!this.selectedPiece || !this.selectedTypeMouvement || this.quantite <= 0) {
      this.message = "Veuillez remplir tous les champs correctement.";
      this.clearMessageAfterDelay();
      return;
    }

    this.mouvementStockService.ajouterMouvement(this.selectedPiece, this.selectedTypeMouvement, this.quantite)
      .subscribe(
        () => {
          this.message = "Mouvement enregistré avec succès.";
          this.clearMessageAfterDelay();
        },
        (error) => {
          // Affichage du message d'erreur du backend
          this.message = error || 'Une erreur s\'est produite';
          this.clearMessageAfterDelay();
        }
      );
  }

  clearMessageAfterDelay() {
    setTimeout(() => {
      this.message = '';
    }, 5000); // Le message disparaît après 5 secondes
  }
  
}
