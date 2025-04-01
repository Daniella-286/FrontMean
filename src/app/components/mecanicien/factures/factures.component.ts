import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../../services/facture.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Ajout pour ngModel
import { CommonModule } from '@angular/common'; // Ajout pour les pipes comme 'date'
import { PaiementService } from '../../../services/paiement.service'; 

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  imports: [
    FormsModule, // Ajouté ici pour gérer [(ngModel)]
    CommonModule // Ajouté ici pour le pipe date
  ],
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {
  factures: any[] = [];
  page: number = 1;
  limit: number = 10;
  totalPages: number = 1;
  numeroFacture: string = '';

  factureDetails: any = null;
  showPopup: boolean = false;

  showPopupPaiement: boolean = false;
  montantPaiement: number = 0;
  factureIdPaiement: string = '';

  constructor(private factureService: FactureService, private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures(): void {
    if (this.numeroFacture) {
      this.factureService.searchFactures(this.numeroFacture).subscribe(response => {
        this.factures = response.factures;
        this.totalPages = response.totalPages || 1;
      });
    } else {
      this.factureService.getAllFactures().subscribe(response => {
        this.factures = response.factures;
        this.totalPages = response.totalPages || 1;
      });
    }
  }

  searchFacture(): void {
    this.page = 1;
    this.loadFactures();
  }

  changePage(next: boolean): void {
    if (next && this.page < this.totalPages) {
      this.page++;
    } else if (!next && this.page > 1) {
      this.page--;
    }
    this.loadFactures();
  }

  voirDetailFacture(id_facture: string): void {
    this.factureService.getFactureDetails(id_facture).subscribe(
      (data) => {
        this.factureDetails = data;
        this.showPopup = true;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la facture', error);
      }
    );
  }

  fermerPopup(): void {
    this.showPopup = false;
  }

  ouvrirPopupPaiement(facture: any): void {
    this.factureIdPaiement = facture._id;
    this.showPopupPaiement = true;
    console.log('Popup de paiement ouvert:', this.showPopupPaiement);  // Ajoutez ce log pour vérifier
  }

  fermerPopupPaiement(): void {
    this.showPopupPaiement = false;
  }

  effectuerPaiement(): void {
    if (this.montantPaiement > 0) {
      this.paiementService.effectuerPaiement(this.factureIdPaiement, this.montantPaiement).subscribe(
        (response: any) => {
          alert(response.message); // Affiche le message du backend
          this.showPopupPaiement = false; // Ferme le popup après le paiement
        },
        (error: any) => {
          alert(error.error.message); // Affiche l'erreur en cas de problème
        }
      );
    } else {
      alert('Veuillez entrer un montant valide.');
    }
  }

}
