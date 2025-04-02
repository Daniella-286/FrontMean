
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
        elementForm = { id_mecanicien:'' , duree_reparation:'' , nom_mecanicien:''
        };

      currentPage: number = 1; // Page courante
      pageSize: number = 5; // Nombre d'éléments par page
      totalItems: number = 0; // Nombre total d'éléments
      totalPages: number = 0; // Nombre total de pages

      successMessage: string = '';
      errorMessage: string = '';

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
                        debounceTime(300),
                        distinctUntilChanged(),
                        switchMap((searchTerm: string) => this.mecanicienService.getListeMecaniciens(searchTerm))
                      ).subscribe((response) => {
                        if (response.success) {
                          this.mecanicienSearch = response.data; // Mettre à jour les résultats
                        } else {
                          this.mecanicienSearch = [];
                        }
                      });
          }

            // Cette méthode peut être appelée lors de la saisie dans l'input
            onMecanicienSearch() {
              this.mecanicienInput.next(this.elementForm.id_mecanicien); // Envoi la valeur pour rechercher
            }

            // Lorsqu'un mécanicien est sélectionné
            onMecanicienSelect(mecanicien: any) {
              this.elementForm.nom_mecanicien = mecanicien.nom;
              this.elementForm.id_mecanicien = mecanicien._id; // Remplir le champ avec le nom sélectionné
              this.mecanicienSearch = []; // Fermer la liste des suggestions après la sélection
            }
              // Ouvrir le popup d'ajout
      openPopup(id_rendez_vous: any): void {
        console.log(" pr le devis ooooohh :", id_rendez_vous);
        this.selectedRendezVousId = id_rendez_vous._id; // Stocke l'ID
        console.log("Rendez-vous ID:", this.selectedRendezVousId);
        this.showPopup = true;

       // this.loadDetailDevis(id_demande);
      }

      closePopup() {
        this.showPopup = false;
      }


      GetListRendezVousConfirmByClientDefault(): void {
        console.log("tonga atoooooo");
        this.rendezVousService.getListRendezVousConfirmByClientDefault().subscribe((data: any) => {
          console.log("Données reçues de l'API :", data); // Vérification de la structure des données

          if (data && Array.isArray(data.data)) {
            this.rendez_vous = data.data; // Extraire le tableau correct des rendez-vous
            this.totalItems = this.rendez_vous.length; // Met à jour le nombre total d'éléments
            this.totalPages = Math.ceil(this.totalItems / this.pageSize); // Mise à jour du nombre total de pages
            this.paginate(); // Applique la pagination après la mise à jour des données
          } else {
            console.error("Les données renvoyées ne contiennent pas un tableau valide :", data);
            this.rendez_vous = [];
            this.totalItems = 0;
            this.totalPages = 1;
          }
        });
      }



      paginate(): void {
        // Calcul des éléments à afficher sur la page courante
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.rendezVousSearch = this.rendez_vous.slice(startIndex, endIndex);
      }

      changePage(page: number): void {
        this.currentPage = page;
        this.paginate();
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
          if (!this.elementForm.id_mecanicien || !this.elementForm.duree_reparation || !this.selectedRendezVousId) {
            console.warn("⚠️ Formulaire incomplet ou ID rendez-vous manquant :", this.elementForm, this.selectedRendezVousId);
            return;
          }

          const data = {
            id_mecanicien: this.elementForm.id_mecanicien,
            duree_reparation: this.elementForm.duree_reparation,
            id_rdv: this.selectedRendezVousId // ✅ Ajout de l'ID rendez-vous
          };

          this.interventionService.addIntervention(data).subscribe(
            response => {
              console.log("✅ Réponse du serveur :", response);

              // Si la réponse contient success: true
              if (response.success) {
                this.successMessage = response.message; // Afficher le message de succès
                this.errorMessage = ''; // Réinitialiser le message d'erreur
              }

              // Réinitialiser le formulaire et l'ID du rendez-vous sélectionné
              this.elementForm = { id_mecanicien: '', duree_reparation: '', nom_mecanicien: '' };
              this.selectedRendezVousId = null;
              this.showPopup = false; // Fermer le popup après ajout
            },
            error => {
              console.error("❌ Erreur lors de l'ajout :", error);
              console.error("Détails de l'erreur :", error.error); // Ajout pour déboguer

              // Gérer l'affichage du message d'erreur
              this.errorMessage = error.error?.message || 'Une erreur s\'est produite lors de l\'ajout de l\'intervention.';
              this.successMessage = ''; // Réinitialiser le message de succès
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
