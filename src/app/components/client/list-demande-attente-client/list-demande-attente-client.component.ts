import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemandeDevisService } from '../../../services/demande-devis.service';

@Component({
  selector: 'app-list-demande-attente-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-demande-attente-client.component.html',
  styleUrl: './list-demande-attente-client.component.css'
})
export class ListDemandeAttenteClientComponent {
  elementSearchForm = {
    date_debut: '',
    date_fin: ''
  }
  demandeAttenteSearch: any[] = [];
  demandes: any[] = [];


  currentPage: number = 1; // Page courante
  pageSize: number = 5; // Nombre d'éléments par page
  totalItems: number = 0; // Nombre total d'éléments

  constructor(private demandeDevisService: DemandeDevisService) {}

  ngOnInit(): void {
    this.loadDemandeEnAttente();
  }

  loadDemandeEnAttente(): void {
    this.demandeDevisService.loadDemandeEnAttente().subscribe(data => {
      if (data && Array.isArray(data.demandes)) {
        this.demandes = data.demandes.map((demande: Demande) => ({
          ...demande,
          sous_services: Array.isArray(demande.sous_services) ? demande.sous_services : []
        }));
        this.totalItems = this.demandes.length; // Met à jour le nombre total d'éléments
        this.paginate(); // Applique la pagination
      } else {
        console.error('Les données renvoyées ne sont pas un tableau:', data);
        this.demandes = [];  // Réinitialisez les demandes en cas de données incorrectes
      }
    });
  }

  getListdemandeAttenteSearch(): void {
    if (
      !this.elementSearchForm.date_debut ||
      !this.elementSearchForm.date_fin
    ) {
      alert("Veuillez entrer des dates valides !");
      return;
    }

    const dateDebutObj = new Date(this.elementSearchForm.date_debut);
    const dateFinObj = new Date(this.elementSearchForm.date_fin);

    const dateDebut = dateDebutObj.toISOString().split('T')[0];
    const dateFin = dateFinObj.toISOString().split('T')[0];

    this.demandeDevisService.getDemandeEnAttenteByDate(dateDebut, dateFin).subscribe(
      (data: any) => {
        // Vérifiez que 'data' est bien un tableau
        if (data && Array.isArray(data.demandes)) {
          this.demandeAttenteSearch = data.demandes; // Correction ici
          console.log('vita ny recherche' , this.demandeAttenteSearch);
        } else {
          console.error("Les données renvoyées ne sont pas un tableau:", data);
          this.demandeAttenteSearch = [];
        }
      },
      (error) => {
        console.error("❌ Erreur lors de la récupération des données :", error);
      }
    );
  }

  paginate(): void {
    // Calcul des éléments à afficher sur la page courante
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.demandeAttenteSearch = this.demandes.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }
}

interface SousService {
  id: string;
  nom_sous_service: string;
}

interface Demande {
  _id: string;
  date_demande: string;
  probleme: string;
  immatriculation: string;
  service_principal: any; // Vous pouvez créer une interface pour le service_principal également
  sous_services: SousService[];
}
