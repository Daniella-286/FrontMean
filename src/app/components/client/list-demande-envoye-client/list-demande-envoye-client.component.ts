import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemandeDevisService } from '../../../services/demande-devis.service';

@Component({
  selector: 'app-list-demande-envoye-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-demande-envoye-client.component.html',
  styleUrl: './list-demande-envoye-client.component.css'
})
export class ListDemandeEnvoyeClientComponent {

  elementSearchForm = {
    date_debut: '',
    date_fin: ''
  }
  demandeEnvoyeSearch: any[] = [];
  demandes: any[] = [];
  selectedDemandeId: string | null = null;
  showPopup = false; // Pour l'ajout
  detailDevis: any = null;

      // Ouvrir le popup d'ajout
      openPopup(id_demande: string): void {
        console.log("ID envoyé pour le devis ooooohh :", id_demande);
        this.selectedDemandeId = id_demande; // Stocke l'ID
        this.showPopup = true;
        this.loadDetailDevis(id_demande);
      }

    // Fermer les popups
    closePopup() {
      this.showPopup = false;
    }

  constructor(private demandeDevisService: DemandeDevisService) {}

  ngOnInit(): void {
    this.loadDemandeEnvoye();
  }

  loadDemandeEnvoye(): void {
    this.demandeDevisService.loadDemandeEnvoye().subscribe(data => {
      if (data && Array.isArray(data.demandes)) {
        this.demandes = data.demandes.map((demande: Demande) => ({
          ...demande,
          sous_services: Array.isArray(demande.sous_services) ? demande.sous_services : []
        }));
      } else {
        console.error('Les données renvoyées ne sont pas un tableau:', data);
        this.demandes = [];  // Réinitialisez les demandes en cas de données incorrectes
      }
    });
  }

  loadDetailDevis(id_demande: string): void {
    this.demandeDevisService.loadDetailDevis(id_demande).subscribe(response => {
      if (response.success) {
        this.detailDevis = response.data;
      }
    }, error => {
      console.error("Erreur lors du chargement du devis :", error);
    });
  }

  getListdemandeEnvoyeSearch(): void {
    if (!this.elementSearchForm.date_debut || !this.elementSearchForm.date_fin) {
      alert("Veuillez entrer des dates valides !");
      return;
    }

    console.log('tonge eto izy louny');
    const dateDebutObj = new Date(this.elementSearchForm.date_debut);
    const dateFinObj = new Date(this.elementSearchForm.date_fin);

    const dateDebut = dateDebutObj.toISOString().split('T')[0];
    const dateFin = dateFinObj.toISOString().split('T')[0];

    this.demandeDevisService.getDemandeEnvoyeByDate(dateDebut, dateFin).subscribe(
      (data: any) => {
        if (data && Array.isArray(data.demandes)) {
          this.demandeEnvoyeSearch = data.demandes; // Correction ici
          console.log('vita ny recherche' , this.demandeEnvoyeSearch);
        } else {
          console.error("Les données renvoyées ne sont pas un tableau:", data);
          this.demandeEnvoyeSearch = [];
        }
      },
      (error) => {
        console.error("❌ Erreur lors de la récupération des données :", error);
      }
    );
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
