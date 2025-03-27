import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParkingService } from '../../../services/parking.service';
import { ReservationParkingService } from '../../../services/reservation-parking.service';
import { VehiculeService } from '../../../services/vehicule.service';
//import { ConnexionManagerComponent } from "../../manager/connexion-manager/connexion-manager.component";

@Component({
  selector: 'app-reservation-parking',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-parking.component.html',
  styleUrl: './reservation-parking.component.css'
})
export class ReservationParkingComponent {
  showPopup = false; // Pour afficher la pop-up
  parkings: any[] = []; // Stocker tous les parkings
  vehicules: any[] = []; // Stocker tous les parkings
  reservations: any[] = [];
  parkingsDisponibles: any[] = []; // Stocker les parkings disponibles après recherche

  elementForm = {
    id_parking: '',
    id_vehicule: '',
    date_debut: '',
    date_fin: ''
  };

  elementSearchForm = {
    date_debut: '',
    date_fin: ''
  }


  constructor(
    private parkingService: ParkingService,
    private reservationParkingService: ReservationParkingService ,
    private vehiculeService: VehiculeService ,
  ) {}

  ngOnInit(): void {
    this.loadParkingList(); // Charger la liste des parkings dès le chargement de la page
    this.loadVehicules();
  }

  loadParkingList(): void {
    this.parkingService.getData().subscribe(
      (data) => {
        this.parkings = data;
        console.log(" Liste des parkings chargée:", this.parkings);
      },
      (error) => {
        console.error(" Erreur lors du chargement des parkings :", error);
      }
    );
  }

  getParkingDisponible(): void {

      if (
        !this.elementSearchForm.date_debut ||
        !this.elementSearchForm.date_fin
        //  ||
        // isNaN(new Date(this.elementForm.date_debut).getTime()) ||
        // isNaN(new Date(this.elementForm.date_fin).getTime())
    ) {
        alert("Veuillez entrer des dates valides !");
        return;
    }

    console.log('Avant conversion - date debut:', this.elementSearchForm.date_debut);
    console.log('Avant conversion - date fin:', this.elementSearchForm.date_fin);

    // Convertir les dates en objet Date si elles sont en string
    const dateDebutObj = new Date(this.elementSearchForm.date_debut);
    const dateFinObj = new Date(this.elementSearchForm.date_fin);

    console.log('Après conversion - date debut:', dateDebutObj);
    console.log('Après conversion - date fin:', dateFinObj);

    const dateDebut = dateDebutObj.toISOString().split('T')[0];
    const dateFin = dateFinObj.toISOString().split('T')[0];

    console.log('Format final - ty date debut:', dateDebut);
    console.log('Format final - ty date fin:', dateFin);

    this.parkingService.getParkingsDisponibles(dateDebut, dateFin).subscribe(
      (data: any) => {
        this.parkingsDisponibles = data;
        console.log(" Parkings disponibles :", this.parkingsDisponibles);
      },
      (error) => {
        console.error(" Erreur lors de la récupération des parkings disponibles :", error);
      }
    );
}

  // Ouvrir le popup d'ajout
  openAddResaParkingPopup(id_parking: string) {
    this.showPopup = true;
    this.elementForm.id_parking = id_parking; // Affecter l'id_parking au formulaire
    console.log(" Popup d'ajout affiché avec id_parking:", id_parking);
  }

  // Fermer le popup
  closePopup() {
    this.showPopup = false;
  }


  message: string = '';  // Variable pour stocker le message
  addReservationParking(): void {
    console.log("Données envoyées:", this.elementForm);

    if (!this.elementForm.id_parking || !this.elementForm.id_vehicule
        || !this.elementForm.date_debut || !this.elementForm.date_fin) {
        console.warn("⚠️ Formulaire incomplet :", this.elementForm);
        this.message = "Veuillez remplir tous les champs !";
        return;
    }

    this.reservationParkingService.addReservationParking(this.elementForm).subscribe(
        response => {
            console.log("Réponse du serveur :", response);

            // Met à jour le message et affiche la popup
            this.message = response.message || "Réservation ajoutée avec succès !";
            this.elementForm = { id_parking: '', id_vehicule: '', date_debut: '', date_fin: '' };

            // Garde la popup ouverte pour afficher le message
            this.showPopup = true;

            // Fermer la popup après quelques secondes
            setTimeout(() => {
                this.message = '';
                this.showPopup = false;
            }, 3000);
        },
        error => {
            console.error("Erreur :", error);
            this.message = error.error?.message || "Une erreur est survenue.";
        }
    );
}

            loadVehicules(): void {
              console.log('miditra atoooo');
              this.vehiculeService.getData().subscribe(data => {
                this.vehicules = data;
                console.log('Vehicules chargées:', this.vehicules); // Vérifier les véhicules chargés
              });
            }


            loadReservtaion(): void {
              console.log('miditra atoooo');
              this.reservationParkingService.getData().subscribe(data => {
                this.reservations = data;
                console.log('reservations chargées:', this.reservations); // Vérifier les véhicules chargés
              });
            }

            }

