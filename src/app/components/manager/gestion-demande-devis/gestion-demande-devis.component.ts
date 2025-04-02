import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemandeDevisService } from '../../../services/demande-devis.service';

@Component({
  selector: 'app-gestion-demande-devis',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-demande-devis.component.html',
  styleUrl: './gestion-demande-devis.component.css'
})
export class GestionDemandeDevisComponent {
  elementSearchForm = {
    date_debut: '',
    date_fin: ''
  }
  showPopup = false;
  demandeClientSearch: any[] = [];
  demandes: any[] = [];
  detailDevis: any = {};
  devisServices: any[] = [];
  devisPieces: any[] = [];

  errorMessage : string = ''; // Message du backend

  currentPage: number = 1; // Page courante
  pageSize: number = 5; // Nombre d'éléments par page
  totalItems: number = 0; // Nombre total d'éléments



  selectedDemandeId: string | null = null;

  constructor(private demandeDevisService: DemandeDevisService) {}

        // Ouvrir le popup d'ajout
        openPopup(id_demande: string): void {
          console.log("ID  yyyyy :", id_demande);
          this.selectedDemandeId = id_demande; // Stocke l'ID
          this.showPopup = true;
          this.EnvoyerDetailDevis(id_demande);
        }

  ngOnInit(): void {
    this.loadDemandeDevisClientToManager();
  }

  EnvoyerDetailDevis(id_demande: string): void {
    if (id_demande) {
      this.demandeDevisService.EnvoyerDetailDevis(id_demande).subscribe(data => {
        console.log("Réponse API pour detailDevis:", data); // Vérification du format de la réponse
        if (data && data.data) {
          this.detailDevis = data.data; // Pas besoin de mettre dans un tableau
        } else {
          this.detailDevis = { devisServices: [], devisPieces: [] }; // Éviter les erreurs si la réponse est vide
        }
        this.showPopup = true;
      });
    } else {
      console.error("id_demande est invalide !");
    }
  }


    // Fermer le popup
    closePopup() {
      this.showPopup = false;
    }

  loadDemandeDevisClientToManager(): void {
    this.demandeDevisService.loadDemandeDevisClientToManager().subscribe(data => {
      if (data && Array.isArray(data.demandes)) {
        this.demandes = data.demandes.map((demande: Demande) => ({
          ...demande,
          sous_services: Array.isArray(demande.sous_services) ? demande.sous_services : []
        }));
        this.totalItems = this.demandes.length; // Met à jour le nombre total d'éléments
        console.log("totalll" , this.totalItems);
        this.paginate(); // Applique la pagination
        console.log("ndreto aby " , this.demandes);
      } else {
        console.error('Les données renvoyées ne sont pas un tableau:', data);
        this.demandes = [];  // Réinitialisez les demandes en cas de données incorrectes
      }
    });
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.demandeClientSearch = this.demandes.slice(startIndex, endIndex);
  }

  // Fonction pour la page suivante
  changePage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  getListdemandeClientToManagerSearch(): void {
    if (!this.elementSearchForm.date_debut || !this.elementSearchForm.date_fin) {
      alert('Veuillez entrer des dates valides !');
      return;
    }

    const dateDebutObj = new Date(this.elementSearchForm.date_debut);
    const dateFinObj = new Date(this.elementSearchForm.date_fin);

    const dateDebut = dateDebutObj.toISOString().split('T')[0];
    const dateFin = dateFinObj.toISOString().split('T')[0];

    this.demandeDevisService.loadDemandeClientToManagerByDate(dateDebut, dateFin).subscribe(
      (data: any) => {
        if (data && data.message) {
          // Si le backend renvoie un message d'erreur
          this.errorMessage = data.message;
          this.demandes = []; // Effacer la liste des demandes
        } else if (data && Array.isArray(data.demandes)) {
          this.demandes = data.demandes;
          if (this.demandes.length === 0) {
            this.errorMessage = 'Aucune demande en attente trouvée pour cette période.';
          } else {
            this.errorMessage = ''; // Effacer le message s'il y a des résultats
            this.totalItems = this.demandes.length; // Met à jour le nombre total d'éléments
            this.paginate(); // Applique la pagination
          }
        } else {
          this.demandes = [];
          this.errorMessage = 'Aucune demande en attente trouvée pour cette période.';
        }
      },
      (error) => {
        console.error('❌ Erreur lors de la récupération des données :', error);
        this.errorMessage = error?.error?.message || 'Une erreur est survenue lors de la récupération des demandes.';
        this.demandes = []; // Optionnel: réinitialiser les demandes en cas d'erreur
      }
    );
  }
}

interface SousService {
  id: string;
}

interface Demande {
  _id: string;
  date_demande: string;
  probleme: string;
  immatriculation: string;
  service_principal: any; // Vous pouvez créer une interface pour le service_principal également
  sous_services: SousService[];
}
