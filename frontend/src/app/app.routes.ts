import { Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { SousServiceListComponent } from './components/sous-service-list/sous-service-list.component';

export const routes: Routes = [
 { path: 'services', component: ServiceListComponent }, // Route pour service-list
 { path: 'sous-services', component: SousServiceListComponent }, // Route pour sous-service-list
 { path: 'connexion', component: ConnexionComponent },
 { path: 'inscription', component: InscriptionComponent },

 { path: '', redirectTo: 'services', pathMatch: 'full' } // Redirection
 ];
