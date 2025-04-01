import { Component, OnInit } from '@angular/core';
import { FactureParkingService } from '../../../services/facture-parking.service';
import { FormsModule } from '@angular/forms'; // Ajout pour ngModel
import { CommonModule } from '@angular/common'; // Ajout pour les pipes comme 'date'
import { PaiementService } from '../../../services/paiement.service'; 


@Component({
  selector: 'app-facture-parking',
  imports: [
    FormsModule, // Ajouté ici pour gérer [(ngModel)]
    CommonModule // Ajouté ici pour le pipe date
  ],
  templateUrl: './factures-parking.component.html',
  styleUrls: ['./factures-parking.component.css']
})
export class FactureParkingComponent implements OnInit {
  factures: any[] = [];
  numeroRecherche: string = '';
  factureSelectionnee: any = null;
  showPopup: boolean = false;

  page: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  showPopupPaiement: boolean = false;
  montantPaiement: number = 0;
  factureIdPaiement: string = '';

  constructor(private factureService: FactureParkingService , private paiementService: PaiementService) {}

  ngOnInit(): void {
    this.chargerFactures();
  }

  chargerFactures(): void {
    this.page = 1;
    this.factureService.getAllFactures().subscribe(response => {
      if (response.success) {
        this.factures = response.factures;
      }
    });
  }

  changePage(next: boolean): void {
    if (next && this.page < this.totalPages) {
      this.page++;
    } else if (!next && this.page > 1) {
      this.page--;
    }
    this.chargerFactures();
  }

  rechercherFacture(): void {
    if (this.numeroRecherche.trim() !== '') {
      this.factureService.searchFactures(this.numeroRecherche).subscribe(response => {
        if (response.success) {
          this.factures = response.factures;
        }
      });
    } else {
      this.chargerFactures();
    }
  }

  voirDetails(id_facture: string): void {
    this.factureService.getFactureParkingDetails(id_facture).subscribe(response => {
      this.factureSelectionnee = response.facture;
      this.showPopup = true;
    });
  }

  fermerPopup(): void {
    this.showPopup = false;
    this.factureSelectionnee = null;
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
      this.paiementService.effectuerPaiementParking(this.factureIdPaiement, this.montantPaiement).subscribe(
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
