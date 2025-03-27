import { Routes } from '@angular/router';
import { AjoutServiceComponent } from './components/ajout-service/ajout-service.component';
import { AjoutSousServiceComponent } from './components/ajout-sous-service/ajout-sous-service.component';
import { AjoutVehiculeComponent } from './components/client/ajout-vehicule/ajout-vehicule.component';
import { ConnexionComponent } from './components/connexion/connexion.component';


import { HeaderComponent } from './components/header/header.component';
import { MenuAdminComponent } from './components/menu/menu-admin/menu-admin.component';

import { InscriptionMecanicienComponent } from './components/inscription-mecanicien/inscription-mecanicien.component';

///.................................MANAGER...................................//

import { AjoutMarqueVoitureComponent } from './components/manager/ajout-marque-voiture/ajout-marque-voiture.component';
import { AjoutModelVoitureComponent } from './components/manager/ajout-model-voiture/ajout-model-voiture.component';
import { ConnexionManagerComponent } from './components/manager/connexion-manager/connexion-manager.component';
import { GestionDemandeDevisComponent } from './components/manager/gestion-demande-devis/gestion-demande-devis.component';
import { GestionMarqueComponent } from './components/manager/gestion-marque/gestion-marque.component';
import { GestionModelComponent } from './components/manager/gestion-model/gestion-model.component';
import { GestionPieceComponent } from './components/manager/gestion-piece/gestion-piece.component';
import { GestionReservationComponent } from './components/manager/gestion-reservation/gestion-reservation.component';
import { GestionServiceComponent } from './components/manager/gestion-service/gestion-service.component';
import { GestionSousServiceComponent } from './components/manager/gestion-sous-service/gestion-sous-service.component';
import { GestionStockComponent } from './components/manager/gestion-stock/gestion-stock.component';
import { ListClientInscritComponent } from './components/manager/list-client-inscrit/list-client-inscrit.component';
import { ParkingComponent } from './components/manager/parking/parking.component';
import { StatistiqueReparationParMoisComponent } from './components/manager/statistique-reparation-par-mois/statistique-reparation-par-mois.component';



//import { AjoutParkingComponent } from './components/manager/ajout-parking/ajout-parking.component';

///.................................CLIENT...................................//
import { DemandeDevisClientComponent } from './components/client/demande-devis-client/demande-devis-client.component';
import { DemandeDevisComponent } from './components/client/demande-devis/demande-devis.component';
import { GestionVehiculeComponent } from './components/client/gestion-vehicule/gestion-vehicule.component';
import { ListDemandeAttenteClientComponent } from './components/client/list-demande-attente-client/list-demande-attente-client.component';
import { ListDemandeEnvoyeClientComponent } from './components/client/list-demande-envoye-client/list-demande-envoye-client.component';
import { ListReservationConfirmeComponent } from './components/client/list-reservation-confirme/list-reservation-confirme.component';
import { ListeReservationClientComponent } from './components/client/liste-reservation-client/liste-reservation-client.component';
import { RendezVousComponent } from './components/client/rendez-vous/rendez-vous.component';
import { ReservationParkingComponent } from './components/client/reservation-parking/reservation-parking.component';
import { InscriptionComponent } from './components/inscription-client/inscription.component';

import { ServiceListComponent } from './components/service-list/service-list.component';

///.................................MECANICIEN...................................//
import { EmploisDuTempsMecanicienComponent } from './components/mecanicien/emplois-du-temps-mecanicien/emplois-du-temps-mecanicien.component';
import { ListesTachesComponent } from './components/mecanicien/listes-taches/listes-taches.component';
import { PlanningComponent } from './components/mecanicien/planning/planning.component';
     



export const routes: Routes = [
 { path: 'services', component: ServiceListComponent }, // Route pour service-list
//  { path: 'sous-services/:id', component: SousServiceListComponent }, // Route pour sous-service-list
 { path: 'connexion', component: ConnexionComponent },
 { path: 'connexion-manager', component: ConnexionManagerComponent },

 { path: 'header', component: HeaderComponent },
 { path: 'header-admin', component: MenuAdminComponent },
 { path: 'inscription', component: InscriptionComponent },
 { path: 'inscription-mecanicien', component: InscriptionMecanicienComponent },
 { path: 'ajout-service', component: AjoutServiceComponent },
 { path: 'ajout-sous-service', component: AjoutSousServiceComponent },

 //{ path: 'ajout-parking', component: AjoutParkingComponent },
 { path: 'ajout-marque-voiture', component: AjoutMarqueVoitureComponent },
 { path: 'ajout-model-voiture', component: AjoutModelVoitureComponent },
 { path: 'gestion-vehicule', component: GestionVehiculeComponent },
 { path: 'ajout-vehicule', component: AjoutVehiculeComponent },
 { path: 'parking', component: ParkingComponent },
 { path: 'demande-devis-client', component: DemandeDevisClientComponent },
 { path: 'list-demande-attente-client', component: ListDemandeAttenteClientComponent },
 { path: 'list-demande-envoye-client', component: ListDemandeEnvoyeClientComponent },
 { path: 'reservation-parking', component: ReservationParkingComponent },


 ///.................................Manager...................................//
 { path: 'gestion-marque', component: GestionMarqueComponent },
 { path: 'gestion-modele', component: GestionModelComponent },
 { path: 'gestion-piece', component: GestionPieceComponent },
 { path: 'gestion-service', component: GestionServiceComponent },
 { path: 'gestion-sous-service', component: GestionSousServiceComponent },

 { path: 'list-reservation-client', component: ListeReservationClientComponent },
 { path: 'list-reservation-confirme', component: ListReservationConfirmeComponent },

 { path: 'gestion-reservation', component: GestionReservationComponent },
 { path: 'rendez-vous', component: RendezVousComponent },
 { path: 'demande-devis', component: DemandeDevisComponent },
 { path: 'gestion-demande-devis', component: GestionDemandeDevisComponent },
 { path: 'gestion-client-inscrits', component: ListClientInscritComponent },

 { path: 'statistique-reparation-par-mois', component: StatistiqueReparationParMoisComponent },
 { path: 'gestion-stock', component: GestionStockComponent },

/////////////MECANICIEN///////////////////////
 { path: 'emplois-temps', component: EmploisDuTempsMecanicienComponent },
 { path: 'planning-mecanicien', component: PlanningComponent },
 { path: 'listes-taches-mecanicien', component: ListesTachesComponent },





 { path: '', redirectTo: 'services', pathMatch: 'full' } // Redirection

];
