import { Routes } from '@angular/router';
import { AjoutVehiculeComponent } from './components/client/ajout-vehicule/ajout-vehicule.component';
import { ConnexionComponent } from './components/connexion/connexion.component';


import { HeaderComponent } from './components/header/header.component';
import { MenuAdminComponent } from './components/menu/menu-admin/menu-admin.component';

import { InscriptionMecanicienComponent } from './components/inscription-mecanicien/inscription-mecanicien.component';

///.................................MANAGER...................................//

import { AjoutMarqueVoitureComponent } from './components/manager/ajout-marque-voiture/ajout-marque-voiture.component';
import { AjoutModelVoitureComponent } from './components/manager/ajout-model-voiture/ajout-model-voiture.component';
import { ConnexionManagerComponent } from './components/manager/connexion-manager/connexion-manager.component';
import { DashboardFinanceComponent } from './components/manager/dashboard-finance/dashboard-finance.component';
import { ManagerDashboardComponent } from './components/manager/dashboard-general/dashboard-general.component';
import { DashboardInterventionsComponent } from './components/manager/dashboard-interventions/dashboard-interventions.component';
import { StockHistoryComponent } from './components/manager/dashboard-stock-history/dashboard-stock-history.component';
import { StockRestantComponent } from './components/manager/dashboard-stock-restant/dashboard-stock-restant.component';
import { GestionDemandeDevisComponent } from './components/manager/gestion-demande-devis/gestion-demande-devis.component';
import { GestionInterventionComponent } from './components/manager/gestion-intervention/gestion-intervention.component';
import { GestionMarqueComponent } from './components/manager/gestion-marque/gestion-marque.component';
import { GestionMecanicienComponent } from './components/manager/gestion-mecanicien/gestion-mecanicien.component';
import { GestionModelComponent } from './components/manager/gestion-model/gestion-model.component';
import { GestionPieceComponent } from './components/manager/gestion-piece/gestion-piece.component';
import { GestionRendezVousComponent } from './components/manager/gestion-rendez-vous/gestion-rendez-vous.component';
import { GestionReservationComponent } from './components/manager/gestion-reservation/gestion-reservation.component';
import { GestionServiceComponent } from './components/manager/gestion-service/gestion-service.component';
import { GestionSousServiceComponent } from './components/manager/gestion-sous-service/gestion-sous-service.component';
import { GestionStockComponent } from './components/manager/gestion-stock/gestion-stock.component';
import { ListClientInscritComponent } from './components/manager/list-client-inscrit/list-client-inscrit.component';
import { ListInterventionsTerminerComponent } from './components/manager/list-interventions-terminer/list-interventions-terminer.component';
import { ListMecanicienDisponibleComponent } from './components/manager/list-mecanicien-disponible/list-mecanicien-disponible.component';
import { ListReservationsTerminerComponent } from './components/manager/list-reservations-terminer/list-reservations-terminer.component';
import { ParkingComponent } from './components/manager/parking/parking.component';
import { StatistiqueReparationParMoisComponent } from './components/manager/statistique-reparation-par-mois/statistique-reparation-par-mois.component';

//import { AjoutParkingComponent } from './components/manager/ajout-parking/ajout-parking.component';

///.................................CLIENT...................................//
import { DemandeDevisClientComponent } from './components/client/demande-devis-client/demande-devis-client.component';
import { DemandeDevisComponent } from './components/client/demande-devis/demande-devis.component';
import { FacturationParkingComponent } from './components/client/facturation-parking/facturation-parking.component';
import { FacturationServiceComponent } from './components/client/facturation-service/facturation-service.component';
import { GestionVehiculeComponent } from './components/client/gestion-vehicule/gestion-vehicule.component';
import { ListDemandeAttenteClientComponent } from './components/client/list-demande-attente-client/list-demande-attente-client.component';
import { ListDemandeEnvoyeClientComponent } from './components/client/list-demande-envoye-client/list-demande-envoye-client.component';
import { ListInterventionClientComponent } from './components/client/list-intervention-client/list-intervention-client.component';
import { ListRendezVousNonDispoAttenteComponent } from './components/client/list-rendez-vous-non-dispo-attente/list-rendez-vous-non-dispo-attente.component';
import { ListReservationConfirmeComponent } from './components/client/list-reservation-confirme/list-reservation-confirme.component';
import { ListeReservationClientComponent } from './components/client/liste-reservation-client/liste-reservation-client.component';
import { RendezVousComponent } from './components/client/rendez-vous/rendez-vous.component';
import { ReservationParkingComponent } from './components/client/reservation-parking/reservation-parking.component';
import { InscriptionComponent } from './components/inscription-client/inscription.component';
//FacturationServiceComponent

import { HistoriqueInterventionsVehiculesComponent } from './components/client/historique-interventions-vehicules/historique-interventions-vehicules.component';

import { ListRendezVousClientConfirmerComponent } from './components/client/list-rendez-vous-client-confirmer/list-rendez-vous-client-confirmer.component';
import { ListRendezVousClientComponent } from './components/client/list-rendez-vous-client/list-rendez-vous-client.component';

import { ServiceListComponent } from './components/service-list/service-list.component';



///.................................MECANICIEN...................................//
import { ConnexionMecanicienComponent } from './components/mecanicien/connexion-mecanicien/connexion-mecanicien.component';
import { EmploisDuTempsMecanicienComponent } from './components/mecanicien/emplois-du-temps-mecanicien/emplois-du-temps-mecanicien.component';
import { FactureParkingComponent } from './components/mecanicien/factures-parking/factures-parking.component';
import { FacturesComponent } from './components/mecanicien/factures/factures.component';
import { ListesTachesComponent } from './components/mecanicien/listes-taches/listes-taches.component';
import { MouvementStockComponent } from './components/mecanicien/mouvement-stock/mouvement-stock.component';
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

 //{ path: 'ajout-parking', component: AjoutParkingComponent },
 { path: 'ajout-marque-voiture', component: AjoutMarqueVoitureComponent },
 { path: 'ajout-model-voiture', component: AjoutModelVoitureComponent },

  ///.................................Manager...................................//
 { path: 'gestion-vehicule', component: GestionVehiculeComponent },
 { path: 'ajout-vehicule', component: AjoutVehiculeComponent },
 { path: 'parking', component: ParkingComponent },
 { path: 'demande-devis-client', component: DemandeDevisClientComponent },
 { path: 'list-demande-attente-client', component: ListDemandeAttenteClientComponent },
 { path: 'list-demande-envoye-client', component: ListDemandeEnvoyeClientComponent },
 { path: 'reservation-parking', component: ReservationParkingComponent },
 { path: 'list-rendez-vous-client', component: ListRendezVousClientComponent },
 { path: 'list-rendez-vous-client-confirmer', component: ListRendezVousClientConfirmerComponent },
 { path: 'list-intervention-client', component: ListInterventionClientComponent },
 { path: 'list-rendez-vous-non-dispo-attente', component: ListRendezVousNonDispoAttenteComponent },
 { path: 'historiques-interventions-vehicules', component: HistoriqueInterventionsVehiculesComponent },


 { path: 'manager-dashboard', component: ManagerDashboardComponent },
 { path: 'manager-dashboard-intervention', component: DashboardInterventionsComponent },
 { path: 'manager-dashboard-finance', component: DashboardFinanceComponent },
 { path: 'manager-dashboard-stock-restant', component: StockRestantComponent },
 { path: 'manager-dashboard-stock-history', component: StockHistoryComponent },

 ///.................................client...................................//
 { path: 'gestion-marque', component: GestionMarqueComponent },
 { path: 'gestion-modele', component: GestionModelComponent },
 { path: 'gestion-piece', component: GestionPieceComponent },
 { path: 'gestion-service', component: GestionServiceComponent },
 { path: 'gestion-sous-service', component: GestionSousServiceComponent },
 { path: 'gestion-mecanicien', component: GestionMecanicienComponent },
 { path: 'gestion-intervention', component: GestionInterventionComponent },
 { path: 'list-mecanicien-disponible', component: ListMecanicienDisponibleComponent },
 { path: 'list-intervention-terminer', component: ListInterventionsTerminerComponent },
 { path: 'facturation-parking', component: FacturationParkingComponent },
 { path: 'facturation-service', component: FacturationServiceComponent },
 //FacturationParkingComponent

 { path: 'list-reservation-client', component: ListeReservationClientComponent },
 { path: 'list-reservation-confirme', component: ListReservationConfirmeComponent },
 { path: 'list-reservation-terminer', component: ListReservationsTerminerComponent },


 { path: 'gestion-reservation', component: GestionReservationComponent },
 { path: 'rendez-vous', component: RendezVousComponent },
 { path: 'demande-devis', component: DemandeDevisComponent },
 { path: 'gestion-demande-devis', component: GestionDemandeDevisComponent },
 { path: 'gestion-client-inscrits', component: ListClientInscritComponent },

 { path: 'statistique-reparation-par-mois', component: StatistiqueReparationParMoisComponent },
 { path: 'gestion-stock', component: GestionStockComponent },
 { path: 'gestion-rendez-vous', component: GestionRendezVousComponent },

/////////////MECANICIEN///////////////////////
{ path: 'emplois-temps', component: EmploisDuTempsMecanicienComponent },
{ path: 'planning-mecanicien', component: PlanningComponent },
 { path: 'connexion-mecanicien', component: ConnexionMecanicienComponent },
 { path: 'factures-du-jour', component: FacturesComponent },
 { path: 'factures-parking-du-jour', component: FactureParkingComponent },
 { path: 'mouvement-stock', component: MouvementStockComponent },
 { path: '', redirectTo: '/connexion', pathMatch: 'full' }, // Assure-toi d'avoir cette ligne
 { path: '**', redirectTo: '/connexion' } // Capture toutes les routes non définies
];
