import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemandeDevisService } from '../../../services/demande-devis.service';

@Component({
  selector: 'app-planning',
   imports: [CommonModule, FormsModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent {

  elementSearchForm = {
    date_debut: '',
    date_fin: ''
  }
  demandeClientSearch: any[] = [];
  demandes: any[] = [];

  constructor(private demandeDevisService: DemandeDevisService) {}

  ngOnInit(): void {
    this.loadDemandeDevisClientToManager();
  }

  loadDemandeDevisClientToManager(): void {
    this.demandeDevisService.loadDemandeDevisClientToManager().subscribe(data => {
      if (data && Array.isArray(data.demandes)) {
        this.demandes = data.demandes.map((demande: Demande) => ({
          ...demande,
          sous_services: Array.isArray(demande.sous_services) ? demande.sous_services : []
        }));
        console.log("ndreto aby " , this.demandes);
      } else {
        console.error('Les données renvoyées ne sont pas un tableau:', data);
        this.demandes = [];  // Réinitialisez les demandes en cas de données incorrectes
      }
    });
  }

  getListdemandeClientToManagerSearch(): void {
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

    this.demandeDevisService.loadDemandeClientToManagerByDate(dateDebut, dateFin).subscribe(
      (data: any) => {
        // Vérifiez que 'data' est bien un tableau
        if (data && Array.isArray(data.demandes)) {
          this.demandeClientSearch = data.demandes; // Correction ici
          console.log('vita ny recherche' , this.demandeClientSearch);
        } else {
          console.error("Les données renvoyées ne sont pas un tableau:", data);
          this.demandeClientSearch = [];
        }
      },
      (error) => {
        console.error("❌ Erreur lors de la récupération des données :", error);
      }
    );
  }

  showPopup = false;
  selectedTasks: string[] = [];

  // Déclare un type d'objet avec des clés de type string et des valeurs de type string[]
  tasksData: { [key: string]: string[] } = {
    'ABC-123': ['Vérification des niveaux d’huile', 'Remplacement du filtre à air', 'Test du système de freinage'],
    'XYZ-456': ['Changement des plaquettes de frein', 'Réglage des suspensions', 'Test sur route'],
  };

  openPopup(vehicle: string) {
    this.selectedTasks = this.tasksData[vehicle] || ['Aucune tâche disponible'];
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
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
