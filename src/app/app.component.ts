
import { NgIf } from '@angular/common'; // ✅ Importer NgIf
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
// import { HeaderComponent } from './components/header/header.component';
import { MenuAdminComponent } from './components/menu/menu-admin/menu-admin.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgIf, RouterOutlet
     , FooterComponent,MenuAdminComponent

    ] // ✅ Ajouter les imports
})
export class AppComponent {
  private router = inject(Router);
  currentRoute = signal(this.router.url); // ✅ Signal pour stocker l'URL actuelle

  constructor() {
    // ✅ Mettre à jour `currentRoute` à chaque changement de page
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.urlAfterRedirects); // ✅ Utiliser urlAfterRedirects pour gérer les redirections
      }
    });
  }

  // ✅ Masquer header et footer si on est sur /connexion ou /inscription
  hideHeaderFooter() {
    const route = this.currentRoute();


    return route === '/connexion'
        || route === '/connexion-manager'
        || route === '/connexion-mecanicien'
        || route === '/inscription'
        || route === '/inscription-mecanicien';
  }

}




// import { Component, inject, OnInit, signal } from '@angular/core';
// import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
// import { MenuAdminComponent } from './components/menu/menu-admin/menu-admin.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   imports: [RouterOutlet, MenuAdminComponent]
// })
// export class AppComponent implements OnInit {

//   private router = inject(Router);
//   currentRoute = signal(this.router.url); // Signal pour stocker l'URL actuelle

//   showMenu: boolean = true;

//   constructor() {
//     // Abonnement aux événements de navigation
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.checkIfLoginPage(event.url); // Vérifiez si l'URL correspond à une page de connexion
//       }
//     });
//   }

//   // Appel de la fonction lors de l'initialisation du composant
//   ngOnInit() {
//     // Vérifiez l'URL initiale dès le chargement du composant
//     //this.checkIfLoginPage(this.router.url);
//   }

  // // Fonction pour vérifier si l'utilisateur est sur l'une des pages de connexion ou d'inscription
  // checkIfLoginPage(url: string) {
  //   const loginPages = [
  //     '/connexion',
  //     '/connexion-manager',
  //     '/connexion-mecanicien',
  //     '/inscription'
  //   ];

  //   if (loginPages.some(page => url.includes(page))) {
  //     this.showMenu = false;  // Masquer le menu sur ces pages
  //   } else {
  //     this.showMenu = true;   // Afficher le menu sur les autres pages
  //   }
  // }
//}


// import { Component, inject, signal } from '@angular/core';
// import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
// import { FooterComponent } from './components/footer/footer.component';
// import { HeaderComponent } from './components/header/header.component';
// import { MenuAdminComponent } from '././components/menu/menu-admin/menu-admin.component';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   imports: [ RouterOutlet, HeaderComponent, FooterComponent] // ✅ Ajouter les imports
//   imports: [RouterOutlet , MenuAdminComponent]

// })
// export class AppComponent {



//   private router = inject(Router);
//   currentRoute = signal(this.router.url); // Signal pour stocker l'URL actuelle

//   showMenu: boolean = true;

//   constructor() {
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.checkIfLoginPage(event.url); // Vérifiez si l'URL correspond à une page de connexion
//       }
//     });
//   }


//     const loginPages = [
//       '/connexion',
//       '/connexion-manager',
//       '/connexion-mecanicien',
//       '/inscription'
//     ];

//     if (loginPages.some(page => url.includes(page))) {
//       this.showMenu = false;  // Masquer le menu sur ces pages
//     } else {
//       this.showMenu = true;   // Afficher le menu sur les autres pages
//     }
//   }
//   private router = inject(Router);
//   currentRoute = signal(this.router.url); // ✅ Signal pour stocker l'URL actuelle

//   constructor() {
//     // ✅ Mettre à jour `currentRoute` à chaque changement de page
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         this.currentRoute.set(event.urlAfterRedirects); // ✅ Utiliser urlAfterRedirects pour gérer les redirections
//       }
//     });
//   }

//   // ✅ Masquer header et footer si on est sur /connexion ou /inscription
//   hideHeaderFooter() {
//     const route = this.currentRoute();


//     return route === '/connexion' || route === '/inscription';
//   }

