import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { FactureClientService } from '../../../services/facture-client.service';

@Component({
  selector: 'app-facturation-parking',
  imports: [CommonModule, FormsModule],
  templateUrl: './facturation-parking.component.html',
  styleUrl: './facturation-parking.component.css'
})
export class FacturationParkingComponent {

        showPopup = false; // Pour l'ajout
        showUpdatePopup = false; // Pour l'update
       // selectedVehiculeId: string | null = null;
        elementSearchForm: any = {};

        Factures: any = {};
        facture: any = {};  // Pour stocker les détails de la facture

        currentPage: number = 1; // Page courante
        pageSize: number = 5; // Nombre d'éléments par page
        totalItems: number = 0; // Nombre total d'éléments
        totalPages: number = 0; // Nouvelle variable pour stocker le nombre total de pages
        vehiculesPaginated: any[] = []; // Liste paginée


                constructor(private FactureClientService: FactureClientService
                ) {}

                ngOnInit(): void {
                  this.getFactureParking();
                  }

                           // Ouvrir le popup d'ajout

                           getFactureParking(): void {
                            this.FactureClientService.getFactureParking().subscribe(data => {
                              console.log("Données reçues :", data);  // Vérifiez ici ce que vous obtenez

                              // Vérifier si les données sont un tableau ou un objet
                              if (Array.isArray(data)) {
                                this.Factures = data;
                              } else if (data && Array.isArray(data.factures)) {
                                this.Factures = data.factures;
                              } else {
                                this.Factures = [];
                              }

                              console.log("Factures après assignation:", this.Factures);
                              this.totalItems = this.Factures.length;
                              this.totalPages = Math.ceil(this.totalItems / this.pageSize);
                              this.paginate();
                            });
                          }


                  paginate(): void {
                    // 🔹 Vérifie que la page actuelle est valide
                    if (this.currentPage > this.totalPages) {
                      this.currentPage = this.totalPages;
                    }

                    const startIndex = (this.currentPage - 1) * this.pageSize;
                    const endIndex = startIndex + this.pageSize;

                    console.log("startIndex:", startIndex, "endIndex:", endIndex);

                    this.vehiculesPaginated = this.Factures.slice(startIndex, endIndex);
                    console.log("Paginated vehicules:", this.vehiculesPaginated);
                  }

                  // Fonction pour changer de page
                  changePage(page: number): void {
                    if (page >= 1 && page <= this.totalPages) {
                      this.currentPage = page;
                      this.paginate();
                    }
                  }
                  selectedFactureId: string | null = null;
                  openPopup(facture: any): void {
                    console.log("ID envoyé oa ooh ooooohh :", facture._id);
                    this.selectedFactureId = facture._id; // Stocke l'ID
                    this.showPopup = true;
                    this.getDetailFactureParking(this.selectedFactureId);
                  }

// Récupérer les détails de la facture depuis le backend
  // Récupérer les détails de la facture depuis le backend
  getDetailFactureParking(idFacture: any): void {
    console.log("tessssteeeeee");
    console.log("idFacture ito eeeeh " , idFacture);
    this.FactureClientService.getDetailFactureParking(idFacture).subscribe(
      (data) => {
        console.log("tonga ato ve nefany eeeeehhh");
            this.facture = data.facture;  // Stocker les détails de la facture
            console.log("Facture récupérée:", this.facture);  // Afficher dans la console pour vérifier la structure
        },
        (error) => {
            console.error('Erreur lors de la récupération de la facture:', error);
        }
    );
}
                // Fermer les popups
                closePopup() {
                  this.showPopup = false;
                }


                generatePDF(): void {
                  if (!this.facture) {
                      console.error("Aucune facture sélectionnée");
                      return;
                  }

                  const doc = new jsPDF();

                  // En-tête de la facture
                  doc.setFontSize(16);
                  doc.text("FACTURE PARKING", 80, 15);

                  // Informations de l'entreprise
                  doc.setFontSize(10);
                  doc.text("Mada-Parking", 140, 10);
                  doc.text("Lot 123, Antananarivo, Madagascar", 140, 15);
                  doc.text("Email: contact@mada-parking.mg", 140, 20);
                  doc.text("Tel: +261 34 12 345 67", 140, 25);

                  // Informations du client
                  doc.setFontSize(12);
                  doc.text("Client :", 10, 50);
                  doc.setFontSize(10);
                  doc.text(`Nom : ${this.facture.client_nom || "N/A"}`, 10, 55);
                  doc.text(`Téléphone : ${this.facture.client_tel || "N/A"}`, 10, 60);
                  doc.text(`Email : ${this.facture.client_email || "N/A"}`, 10, 65);

                  // Détails de la facture
                  const factureData = [
                      ["Date Facture", this.facture.date_facture ? new Date(this.facture.date_facture).toLocaleDateString() : "N/A"],
                      ["Numéro Parking", this.facture.numero_parking || "N/A"],
                      ["Numéro Facture", this.facture.numero_facture || "N/A"],
                      ["Durée Parking (heures)", this.facture.duree_parking || "N/A"],
                      ["Tarif par Heure", this.facture.tarif_heure ? `${this.facture.tarif_heure} Ar` : "N/A"],
                      ["Total", this.facture.total ? `${this.facture.total} Ar` : "N/A"],
                  ];

                  let finalY = 75; // Position initiale du tableau

                  // ✅ Génération du tableau
                  autoTable(doc, {
                      startY: finalY,
                      head: [["Champ", "Valeur"]],
                      body: factureData,
                      theme: "grid",
                      styles: {
                          textColor: [0, 0, 0], // Texte noir
                          fontSize: 10,
                      },
                      headStyles: {
                          fillColor: [45, 163, 156], // En-tête en vert
                          textColor: [255, 255, 255], // Texte blanc
                          fontStyle: "bold",
                      },
                      alternateRowStyles: {
                          fillColor: [240, 240, 240], // Gris clair pour une meilleure lisibilité
                      },
                      margin: { top: 10 },
                      didDrawPage: function (data) {
                          // 🔥 Correction : Vérifier que `data.cursor` existe avant de l'utiliser
                          finalY = data.cursor?.y ? data.cursor.y + 10 : finalY + 10;

                          // Signature
                          doc.setFontSize(12);
                          doc.text("Signature du client :", 10, finalY + 20);
                          doc.line(50, finalY + 20, 120, finalY + 20); // Ligne pour la signature

                          // Pied de page
                          doc.setFontSize(8);
                          doc.text("Merci d'avoir utilisé nos services !", 10, 280);
                      }
                  });

                  // Télécharger le PDF
                  doc.save(`Facture_${this.facture.numero_facture}.pdf`);
              }


}
