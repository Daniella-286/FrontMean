import { NgIf } from '@angular/common'; // ✅ Importer NgIf
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgIf, RouterOutlet, HeaderComponent, FooterComponent] // ✅ Ajouter les imports
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


    return route === '/connexion' || route === '/inscription';
  }

}
