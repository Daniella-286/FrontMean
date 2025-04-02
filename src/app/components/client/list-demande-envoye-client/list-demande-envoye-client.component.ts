import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemandeDevisService } from '../../../services/demande-devis.service';
import { RendezVousService } from '../../../services/rendez-vous.service';

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
  showPopup: boolean = false;// Pour l'ajout
  showPopupRendezVous: boolean = false; // Initialisez la variable à false
  detailDevis: any = null;
  elementForm = { id_demande: '', date_rendez_vous:''
  };


  currentPage: number = 1; // Page courante
  pageSize: number = 5; // Nombre d'éléments par page
  totalItems: number = 0; // Nombre total d'éléments


constructor(private demandeDevisService: DemandeDevisService ,  private rendezVousService: RendezVousService ) {}

ngOnInit(): void {
  this.loadDemandeEnvoye();
}

      // Ouvrir le popup d'ajout
      openPopup(id_demande: string): void {
        console.log("ID envoyé pour le tsy ooooohh :", id_demande);
        this.selectedDemandeId = id_demande; // Stocke l'ID
        this.showPopup = true;
        this.loadDetailDevis(id_demande);
      }

    closePopup() {
      this.showPopup = false;
    }


      // Ouvrir le popup d'ajout
      openPopupRendezVous(id_demande: string): void {
        console.log("ID envoyé pour le ggg ooooohh :", id_demande);
        this.selectedDemandeId = id_demande; // Stocke l'ID
        this.showPopupRendezVous = true;
        // Assigner l'ID de la demande à elementForm.id_demande
        this.elementForm.id_demande = id_demande;
        this.AddRendezVous();  // Appelle la méthode pour ajouter le rendez-vous
    }

    closePopupRendezVous() {
      this.showPopupRendezVous = false;
    }


    AddRendezVous(): void {
      console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

      // Vérifier si tous les champs requis sont remplis
      if (!this.elementForm.id_demande || !this.elementForm.date_rendez_vous) {
        console.warn("⚠️ Formulaire incomplet :", this.elementForm);
        return;
      }

      // Convertir la date en format ISO
      const dateRendezVous = new Date(this.elementForm.date_rendez_vous);
      const dateDebut = dateRendezVous.toISOString(); // Inclut la date et l'heure complète
      console.log('Date de rendez-vous envoyée:', dateDebut);

      const data = {
        id_demande: this.elementForm.id_demande,
        date_rendez_vous: dateDebut // Utiliser la date ISO formatée
      };

      this.rendezVousService.addRendezVous(data).subscribe(
        response => {
          console.log("Réponse du serveur :", response);
          // Réinitialiser le formulaire
          this.elementForm = { id_demande: '', date_rendez_vous: '' };
        },
        error => {
          console.error("Erreur lors de l'ajout :", error);
          console.error("Détails de l'erreur :", error.error); // Ajout pour déboguer
        }
      );
    }


    // Fermer les popups

  loadDemandeEnvoye(): void {
    this.demandeDevisService.loadDemandeEnvoye().subscribe(data => {
      if (data && Array.isArray(data.demandes)) {
        this.demandes = data.demandes.map((demande: Demande) => ({
          ...demande,
          sous_services: Array.isArray(demande.sous_services) ? demande.sous_services : []
        }));
        this.totalItems = this.demandes.length; // Met à jour le nombre total d'éléments
        console.log("totalll" , this.totalItems);
        this.paginate(); // Applique la pagination
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
        console.error("response.data  tyyyyyyyyyyyyyyy :", response.data);
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
        console.error(" Erreur lors de la récupération des données :", error);
      }
    );
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.demandeEnvoyeSearch = this.demandes.slice(startIndex, endIndex);
  }

  // Fonction pour la page suivante
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
