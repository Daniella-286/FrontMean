import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { FactureClientService } from '../../../services/facture-client.service';

@Component({
  selector: 'app-facturation-service',
  imports: [CommonModule, FormsModule],
  templateUrl: './facturation-service.component.html',
  styleUrl: './facturation-service.component.css'
})
export class FacturationServiceComponent {

        showPopup = false; // Pour l'ajout
        showUpdatePopup = false; // Pour l'update
        selectedVehiculeId: string | null = null;
        elementSearchForm: any = {};


        Factures: any[] = [];

        currentPage: number = 1; // Page courante
        pageSize: number = 5; // Nombre d'éléments par page
        totalItems: number = 0; // Nombre total d'éléments
        totalPages: number = 0; // Nouvelle variable pour stocker le nombre total de pages
        vehiculesPaginated: any[] = []; // Liste paginée

        detailFactures: {
          details_pieces: any[],
          details_services: any[],
          facture: any,  // ✅ Un objet vide par défaut
          total_pieces: number
        } = {
          details_pieces: [],
          details_services: [],
          facture: {},  // ✅ Correction ici
          total_pieces: 0
        };


                constructor(private FactureClientService: FactureClientService
                ) {}

                ngOnInit(): void {
                  this.getFactureClientService();
                  }

                           // Ouvrir le popup d'ajout
            selectedFactureId: string | null = null;
            openPopup(facture: any): void {
              console.log("ID envoyé pour le beeee ooooohh :", facture._id);
              this.selectedFactureId = facture._id; // Stocke l'ID
              this.showPopup = true;
              this.getDetailFactureClientService(this.selectedFactureId);
            }


                  getFactureClientService(): void {
                    this.FactureClientService.getFactureClientService().subscribe(data => {
                      console.log("Données reçues :", data);

                      if (Array.isArray(data)) {
                        this.Factures = data;
                      } else if (data && Array.isArray(data.factures)) {
                        this.Factures = data.factures;
                      } else {
                        this.Factures = [];
                      }

                      // 🔹 Mise à jour du nombre total d'éléments et du nombre de pages
                      this.totalItems = this.Factures.length;
                      this.totalPages = Math.ceil(this.totalItems / this.pageSize);

                      // 🔹 Lancer la pagination après la mise à jour
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

          getDetailFactureClientService(id_facture: any): void {
            if (id_facture) {
              this.FactureClientService.getDetailFactureClientService(id_facture).subscribe(data => {
                console.log("Réponse API reçue :", data); // Vérifier la structure exacte de la réponse

                // Mettre à jour les détails directement avec la réponse API
                this.detailFactures = {
                  details_pieces: data.details_pieces || [],  // Correction ici
                  details_services: data.details_services || [],  // Correction ici
                  facture: data.facture || {}, // Un objet au lieu d'un tableau
                  total_pieces: data.total_pieces || 0 // Par défaut à 0 si non présent
                };
                console.log("Données mises à jour :", this.detailFactures);
                this.showPopup = true;
              });
            } else {
              console.error("L'identifiant de la facture est invalide !");
            }
          }
                // Fermer les popups
                closePopup() {
                  this.showPopup = false;
                  this.selectedVehiculeId = null;
                }

                generatePDF(): void {
                  if (!this.detailFactures || !this.detailFactures.facture) {
                      console.error("Aucune facture sélectionnée");
                      return;
                  }

                  const doc = new jsPDF();
                  let finalY = 20; // Position initiale

                  // 🎨 Définition des couleurs et du style
                  const primaryColor = "#2da39c"; // Couleur principale
                  const textColor = "#ffffff"; // Texte blanc pour l'en-tête

                                  // En-tête de la facture
                  doc.setFontSize(16);
                  doc.text("FACTURE PARKING", 80, 15);

                  finalY = 50;

                  // 📌 Informations du fournisseur
                  doc.setTextColor(0, 0, 0);
                  doc.setFontSize(12);
                  doc.text("Émis par :", 10, finalY);
                  doc.text("MADA-IMMO", 10, finalY + 5);
                  doc.text("Lot IVG 136 Ambatonakanga, Antananarivo", 10, finalY + 10);
                  doc.text("Email: contact@mada-immo.com", 10, finalY + 15);
                  doc.text("Téléphone: +261 34 00 000 00", 10, finalY + 20);

                  // 📌 Informations du client
                  doc.text("Facturé à :", 140, finalY);
                  doc.text(this.detailFactures.facture.client_nom || "N/A", 140, finalY + 5);
                  doc.text(this.detailFactures.facture.client_adresse || "Adresse non disponible", 140, finalY + 10);
                  doc.text(this.detailFactures.facture.client_email || "Email non disponible", 140, finalY + 15);

                  finalY += 30;

                  // 📌 Détails de la facture
                  const factureData = [
                      ["Numéro Facture", this.detailFactures.facture.numero_facture || "N/A"],
                      ["Date Facture", this.detailFactures.facture.date_facture ? new Date(this.detailFactures.facture.date_facture).toLocaleString() : "N/A"],
                      ["Total Facture", this.detailFactures.facture.total ? `${this.detailFactures.facture.total} Ar` : "N/A"]
                  ];

                  autoTable(doc, {
                      startY: finalY,
                      head: [["Champ", "Valeur"]],
                      body: factureData,
                      theme: "grid",
                      styles: { textColor: [0, 0, 0], halign: "center" },
                      headStyles: { fillColor: [45, 163, 156], textColor: [255, 255, 255], fontStyle: "bold" },
                      alternateRowStyles: { fillColor: [240, 240, 240] },
                      didDrawPage: (data) => {
                          finalY = data.cursor?.y ? data.cursor.y + 10 : finalY + 10;
                      }
                  });

                  // 📌 Services facturés
                  if (this.detailFactures.details_services.length > 0) {
                      autoTable(doc, {
                          startY: finalY,
                          head: [["Nom du Service", "Tarif", "Sous-total"]],
                          body: this.detailFactures.details_services.map(service => [
                              service.nom || "N/A",
                              `${service.tarif} Ar`,
                              `${service.sous_total} Ar`
                          ]),
                          theme: "grid",
                          styles: { textColor: [0, 0, 0], halign: "center" },
                          headStyles: { fillColor: [45, 163, 156], textColor: [255, 255, 255], fontStyle: "bold" },
                          alternateRowStyles: { fillColor: [240, 240, 240] },
                          didDrawPage: (data) => {
                              finalY = data.cursor?.y ? data.cursor.y + 10 : finalY + 10;
                          }
                      });
                  }

                  // 📌 Pièces facturées
                  if (this.detailFactures.details_pieces.length > 0) {
                      autoTable(doc, {
                          startY: finalY,
                          head: [["Nom de la Pièce", "Quantité", "Prix Unitaire", "Total"]],
                          body: this.detailFactures.details_pieces.map(piece => [
                              piece.nom || "N/A",
                              piece.quantite,
                              `${piece.prix_unitaire} Ar`,
                              `${piece.sous_total} Ar`
                          ]),
                          theme: "grid",
                          styles: { textColor: [0, 0, 0], halign: "center" },
                          headStyles: { fillColor: [45, 163, 156], textColor: [255, 255, 255], fontStyle: "bold" },
                          alternateRowStyles: { fillColor: [240, 240, 240] },
                          didDrawPage: (data) => {
                              finalY = data.cursor?.y ? data.cursor.y + 10 : finalY + 10;
                          }
                      });
                  }

                  // 🏦 Résumé et Total
                  finalY += 10;
                  doc.setFontSize(12);
                  doc.text("Montant Total :", 140, finalY);
                  doc.text(`${this.detailFactures.facture.total} Ar`, 170, finalY);
                  finalY += 10;

                  doc.line(10, finalY, 200, finalY); // Ligne de séparation
                  finalY += 10;

                  // 📌 Conditions et signature
                  doc.setFontSize(10);
                  doc.text("Conditions :", 10, finalY);
                  doc.text("Le paiement doit être effectué sous 30 jours.", 10, finalY + 5);
                  doc.text("Toute réclamation doit être faite dans un délai de 7 jours.", 10, finalY + 10);

                  finalY += 20;
                  doc.text("Signature et Cachet :", 10, finalY);
                  doc.line(10, finalY + 5, 80, finalY + 5); // Ligne pour la signature

                  // 📥 Télécharger le PDF
                  doc.save(`Facture_Service_${this.detailFactures.facture.numero_facture}.pdf`);
              }



}
