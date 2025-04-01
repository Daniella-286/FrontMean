import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { InterventionService } from '../../../services/Interventions.service';
import { MecanicienService } from '../../../services/mecanicien.service';
import { RendezVousService } from '../../../services/rendez-vous.service';

//MecanicienService
@Component({
  selector: 'app-gestion-intervention',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-intervention.component.html',
  styleUrl: './gestion-intervention.component.css'
})
export class GestionInterventionComponent {

        rendezVousSearch: any[] = [];  // Pour stocker les résultats de recherche
        rendez_vous: any[] = [];
         // Déclaration des variables
  mecanicienInput = new Subject<string>(); // Subject pour l'événement de recherche
        mecanicienSearch: any[] = [];
        mecaniciens: any[] = [];        // Pour stocker les résultats par défaut

        elementSearchForm: any = {};    // Formulaire de recherche
        message: string = ""; // Stocke le message du backend
        success: boolean = true;
        elementForm = { id_mecanicien:'' , duree_reparation:''
        };

        selectedRendezVousId: string | null = null;
        showPopup = false; // Pour l'update
       // updateForm = { date_rendez_vous: '', id_client: ''  , date_demande:'' };
      //implements OnInit
        constructor(
          private rendezVousService: RendezVousService ,
          private interventionService: InterventionService ,
          private mecanicienService: MecanicienService)
          {}

          ngOnInit() {
            // Charger les rendez-vous par défaut
            this.GetListRendezVousConfirmByClientDefault();

                      // Surveille l'événement de saisie de l'utilisateur et effectue la recherche
            this.mecanicienInput.pipe(
              debounceTime(300), // Attendre 300ms après la saisie avant de déclencher la recherche
              distinctUntilChanged(), // Ne déclencher la recherche que si la valeur a changé
              switchMap((searchTerm: string) => this.mecanicienService.getListeMecaniciens(searchTerm))
            ).subscribe((data: any) => {
              if (Array.isArray(data.mecaniciens)) {
                this.mecanicienSearch = data.mecaniciens; // Mise à jour des résultats
              } else {
                this.mecanicienSearch = []; // Aucune correspondance trouvée
              }
            });
          }

            // Cette méthode peut être appelée lors de la saisie dans l'input
            onMecanicienSearch() {
              this.mecanicienInput.next(this.elementForm.id_mecanicien); // Envoie la valeur du champ pour rechercher
            }

            // Lorsqu'un mécanicien est sélectionné
            onMecanicienSelect(mecanicien: any) {
              this.elementForm.id_mecanicien = mecanicien.nom; // Remplir le champ avec le nom sélectionné
              this.mecanicienSearch = []; // Fermer la liste des suggestions après la sélection
            }
              // Ouvrir le popup d'ajout
      openPopup(id_rendez_vous: string): void {
        console.log("ID envoyé pour le devis ooooohh :", id_rendez_vous);
        this.selectedRendezVousId = id_rendez_vous; // Stocke l'ID
        this.showPopup = true;

       // this.loadDetailDevis(id_demande);
      }

      closePopup() {
        this.showPopup = false;
      }



        GetListRendezVousConfirmByClientDefault(): void {
          console.log("tonga atoooooo");
          this.rendezVousService.getListRendezVousConfirmByClientDefault().subscribe((data: any) => {
            console.log("Données reçues de l'API :", data); // Ajoutez ceci
            if (data && Array.isArray(data.rendezVous)) {
              this.rendez_vous = data.rendezVous; // Correction ici
            }

          });
        }

        getListRendezVousConfirmByClientSearch(): void {
          console.log("de ato koooo atoooooo");
          if (!this.elementSearchForm.date_debut || !this.elementSearchForm.date_fin) {
            alert("Veuillez entrer des dates valides !");
            return;
          }

          const dateDebutObj = new Date(this.elementSearchForm.date_debut);
          const dateFinObj = new Date(this.elementSearchForm.date_fin);

          const dateDebut = dateDebutObj.toISOString().split('T')[0];
          const dateFin = dateFinObj.toISOString().split('T')[0];

          this.rendezVousService.getListRendezVousConfirmByClientSearch(dateDebut, dateFin)
            .subscribe((data: any) => {
              if (Array.isArray(data.rendezVous)) {
                this.rendezVousSearch = data.rendezVous;
              } else {
                this.rendezVousSearch = [];
              }
            });
        }

        AddInterventions(): void {
          console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

          // Vérifier si tous les champs requis sont remplis
          if (!this.elementForm.id_mecanicien || !this.elementForm.duree_reparation) {
            console.warn("⚠️ Formulaire incomplet :", this.elementForm);
            return;
          }


          const data = {
            id_demande: this.elementForm.id_mecanicien,
            duree_reparation: this.elementForm.duree_reparation // Utiliser la date ISO formatée
          };

          this.interventionService.addIntervention(data).subscribe(
            response => {
              console.log("Réponse du serveur :", response);
              // Réinitialiser le formulaire
              this.elementForm = {  id_mecanicien:'' , duree_reparation:'' };
            },
            error => {
              console.error("Erreur lors de l'ajout :", error);
              console.error("Détails de l'erreur :", error.error); // Ajout pour déboguer
            }
          );
        }

        loadMecanicienListSearch(): void {
          if (!this.elementSearchForm.id_mecanicien ) {
            alert("Veuillez entrer des dates valides !");
            return;
          }
          this.mecanicienService.getListeMecaniciens(this.elementSearchForm.id_mecanicien)
            .subscribe((data: any) => {
              if (Array.isArray(data.mecaniciens)) {
                this.mecanicienSearch = data.mecaniciens;
              } else {
                this.mecanicienSearch = [];
              }
            });
        }


}


















// import { CommonModule } from '@angular/common'; // Importation nécessaire pour *ngFor
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
// import { Subject } from 'rxjs';
// import { InterventionService } from '../../../services/Interventions.service';
// import { MecanicienService } from '../../../services/mecanicien.service';
// import { RendezVousService } from '../../../services/rendez-vous.service';

// //MecanicienService
// @Component({
//   selector: 'app-gestion-intervention',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './gestion-intervention.component.html',
//   styleUrl: './gestion-intervention.component.css'
// })
// export class GestionInterventionComponent {

//         rendezVousSearch: any[] = [];  // Pour stocker les résultats de recherche
//         rendez_vous: any[] = [];
//         mecanicienSearch: any[] = [];
//         mecaniciens: any[] = [];        // Pour stocker les résultats par défaut
//         mecanicienInput = new Subject<string>(); // Événements de saisie utilisateur
//         elementSearchForm: any = {};    // Formulaire de recherche
//         message: string = ""; // Stocke le message du backend
//         success: boolean = true;
//         elementForm = { id_mecanicien:'' , duree_reparation:''
//         };

//         selectedRendezVousId: string | null = null;
//         showPopup = false; // Pour l'update
//        // updateForm = { date_rendez_vous: '', id_client: ''  , date_demande:'' };
//       //implements OnInit
//         constructor(
//           private rendezVousService: RendezVousService ,
//           private interventionService: InterventionService ,
//           private mecanicienService: MecanicienService)
//           {}

//           ngOnInit() {
//             // Charger les rendez-vous par défaut
//             this.GetListRendezVousConfirmByClientDefault();
//           }
//               // Ouvrir le popup d'ajout
//       openPopup(id_rendez_vous: string): void {
//         console.log("ID envoyé pour le devis ooooohh :", id_rendez_vous);
//         this.selectedRendezVousId = id_rendez_vous; // Stocke l'ID
//         this.showPopup = true;

//        // this.loadDetailDevis(id_demande);
//       }

//       closePopup() {
//         this.showPopup = false;
//       }



//         GetListRendezVousConfirmByClientDefault(): void {
//           console.log("tonga atoooooo");
//           this.rendezVousService.getListRendezVousConfirmByClientDefault().subscribe((data: any) => {
//             console.log("Données reçues de l'API :", data); // Ajoutez ceci
//             if (data && Array.isArray(data.rendezVous)) {
//               this.rendez_vous = data.rendezVous; // Correction ici
//             }

//           });
//         }

//         getListRendezVousConfirmByClientSearch(): void {
//           console.log("de ato koooo atoooooo");
//           if (!this.elementSearchForm.date_debut || !this.elementSearchForm.date_fin) {
//             alert("Veuillez entrer des dates valides !");
//             return;
//           }

//           const dateDebutObj = new Date(this.elementSearchForm.date_debut);
//           const dateFinObj = new Date(this.elementSearchForm.date_fin);

//           const dateDebut = dateDebutObj.toISOString().split('T')[0];
//           const dateFin = dateFinObj.toISOString().split('T')[0];

//           this.rendezVousService.getListRendezVousConfirmByClientSearch(dateDebut, dateFin)
//             .subscribe((data: any) => {
//               if (Array.isArray(data.rendezVous)) {
//                 this.rendezVousSearch = data.rendezVous;
//               } else {
//                 this.rendezVousSearch = [];
//               }
//             });
//         }

//         AddInterventions(): void {
//           console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

//           // Vérifier si tous les champs requis sont remplis
//           if (!this.elementForm.id_mecanicien || !this.elementForm.duree_reparation) {
//             console.warn("⚠️ Formulaire incomplet :", this.elementForm);
//             return;
//           }


//           const data = {
//             id_demande: this.elementForm.id_mecanicien,
//             duree_reparation: this.elementForm.duree_reparation // Utiliser la date ISO formatée
//           };

//           this.interventionService.addIntervention(data).subscribe(
//             response => {
//               console.log("Réponse du serveur :", response);
//               // Réinitialiser le formulaire
//               this.elementForm = {  id_mecanicien:'' , duree_reparation:'' };
//             },
//             error => {
//               console.error("Erreur lors de l'ajout :", error);
//               console.error("Détails de l'erreur :", error.error); // Ajout pour déboguer
//             }
//           );
//         }

//         loadMecanicienListSearch(): void {
//           if (!this.elementSearchForm.id_mecanicien ) {
//             alert("Veuillez entrer des dates valides !");
//             return;
//           }
//           this.mecanicienService.getListeMecaniciens(this.elementSearchForm.id_mecanicien)
//             .subscribe((data: any) => {
//               if (Array.isArray(data.mecaniciens)) {
//                 this.mecanicienSearch = data.mecaniciens;
//               } else {
//                 this.mecanicienSearch = [];
//               }
//             });
//         }


// }
