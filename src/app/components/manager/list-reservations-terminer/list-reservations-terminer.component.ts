import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationParkingService } from '../../../services/reservation-parking.service';


@Component({
  selector: 'app-list-reservations-terminer',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-reservations-terminer.component.html',
  styleUrl: './list-reservations-terminer.component.css'
})
export class ListReservationsTerminerComponent {
   elementSearchForm = {
      date_debut: '',
      date_fin: ''
    }
    reservationSearch: any[] = [];
    reservations: any[] = [];


    currentPage: number = 1; // Page courante
    pageSize: number = 5; // Nombre d'éléments par page
    totalItems: number = 0; // Nombre total d'éléments
    totalPages: number = 0; // Initialisation

    constructor(private reservationParkingService: ReservationParkingService) {}

    ngOnInit(): void {
      this.getReservationTerminer();
      }

      getReservationTerminer(): void {
        this.reservationParkingService.getReservationTerminer().subscribe(data => {
          console.log("Réponse API :", data); // Vérifiez la structure de la réponse
          if (data && Array.isArray(data.reservations)) {
            this.reservations = data.reservations; // Extraire uniquement la liste des réservations
            this.totalItems = data.total; // Mettre à jour le nombre total d'éléments
            this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Mise à jour du nombre total de pages
          } else {
            console.error("Les données renvoyées ne sont pas un tableau :", data);
            this.reservations = [];
            this.totalPages = 0;
          }
          this.paginate(); // Met à jour la pagination après avoir récupéré les données
        });
      }



    // getReservationTerminerSearch(): void {
    //   if (
    //     !this.elementSearchForm.date_debut ||
    //     !this.elementSearchForm.date_fin
    //   ) {
    //     alert("Veuillez entrer des dates valides !");
    //     return;
    //   }

    //   const dateDebutObj = new Date(this.elementSearchForm.date_debut);
    //   const dateFinObj = new Date(this.elementSearchForm.date_fin);

    //   const dateDebut = dateDebutObj.toISOString().split('T')[0];
    //   const dateFin = dateFinObj.toISOString().split('T')[0];

    //   this.reservationParkingService.getReservationTerminerSearch(dateDebut, dateFin).subscribe(
    //     (data: any) => {
    //       // Vérifiez que 'data' est bien un tableau
    //       if (data && Array.isArray(data.demandes)) {
    //         this.reservationSearch = data.demandes; // Correction ici
    //         console.log('vita ny recherche' , this.reservationSearch);
    //       } else {
    //         console.error("Les données renvoyées ne sont pas un tableau:", data);
    //         this.reservationSearch = [];
    //       }
    //     },
    //     (error) => {
    //       console.error("❌ Erreur lors de la récupération des données :", error);
    //     }
    //   );
    // }

    paginate(): void {
      // Calcul des éléments à afficher sur la page courante
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.reservationSearch = this.reservations.slice(startIndex, endIndex);
    }

    changePage(page: number): void {
      this.currentPage = page;
      this.paginate();
    }
}





// import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ReservationParkingService } from '../../../services/reservation-parking.service';


// @Component({
//   selector: 'app-list-reservations-terminer',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './list-reservations-terminer.component.html',
//   styleUrl: './list-reservations-terminer.component.css'
// })
// export class ListReservationsTerminerComponent {
//    elementSearchForm = {
//       date_debut: '',
//       date_fin: ''
//     }
//     reservationSearch: any[] = [];
//     reservations: any[] = [];


//     currentPage: number = 1; // Page courante
//     pageSize: number = 5; // Nombre d'éléments par page
//     totalItems: number = 0; // Nombre total d'éléments

//     constructor(private reservationParkingService: ReservationParkingService) {}

//     ngOnInit(): void {
//       this.getReservationTerminer();
//       }



//       getReservationTerminer(): void {
//         this.reservationParkingService.getReservationTerminer().subscribe(data => {
//           console.log("Réponse API :", data); // Vérifiez la structure de la réponse
//           if (data && Array.isArray(data.reservations)) {
//             this.reservations = data.reservations; // Extraire uniquement la liste des réservations
//             this.totalItems = data.total; // Mettre à jour le nombre total d'éléments
//           } else {
//             console.error("Les données renvoyées ne sont pas un tableau :", data);
//             this.reservations = [];
//           }
//           this.paginate(); // Met à jour la pagination après avoir récupéré les données
//         });

//     }



//     getReservationTerminerSearch(): void {
//       if (
//         !this.elementSearchForm.date_debut ||
//         !this.elementSearchForm.date_fin
//       ) {
//         alert("Veuillez entrer des dates valides !");
//         return;
//       }

//       const dateDebutObj = new Date(this.elementSearchForm.date_debut);
//       const dateFinObj = new Date(this.elementSearchForm.date_fin);

//       const dateDebut = dateDebutObj.toISOString().split('T')[0];
//       const dateFin = dateFinObj.toISOString().split('T')[0];

//       this.reservationParkingService.getReservationTerminerSearch(dateDebut, dateFin).subscribe(
//         (data: any) => {
//           // Vérifiez que 'data' est bien un tableau
//           if (data && Array.isArray(data.demandes)) {
//             this.reservationSearch = data.demandes; // Correction ici
//             console.log('vita ny recherche' , this.reservationSearch);
//           } else {
//             console.error("Les données renvoyées ne sont pas un tableau:", data);
//             this.reservationSearch = [];
//           }
//         },
//         (error) => {
//           console.error("❌ Erreur lors de la récupération des données :", error);
//         }
//       );
//     }

//     paginate(): void {
//       // Calcul des éléments à afficher sur la page courante
//       const startIndex = (this.currentPage - 1) * this.pageSize;
//       const endIndex = startIndex + this.pageSize;
//       this.reservationSearch = this.reservations.slice(startIndex, endIndex);
//     }

//     changePage(page: number): void {
//       this.currentPage = page;
//       this.paginate();
//     }
// }
