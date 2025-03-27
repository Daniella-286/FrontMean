import { CommonModule } from '@angular/common'; // 👈 Import obligatoire
import { Component } from '@angular/core';


@Component({
  selector: 'app-emplois-du-temps-mecanicien',
  imports: [CommonModule], // 👈 Ajoute CommonModule ici
  templateUrl: './emplois-du-temps-mecanicien.component.html',
  styleUrl: './emplois-du-temps-mecanicien.component.css'
})
export class EmploisDuTempsMecanicienComponent {

  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  horaires = ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];

  emploiDuTemps = [
    { jour: 'Lundi', horaire: '08:00 - 10:00', cours: 'testtt' },
    { jour: 'Lundi', horaire: '10:00 - 12:00', cours: 'intervention' },
    { jour: 'Lundi', horaire: '14:00 - 16:00', cours: 'intervention' },
    { jour: 'Mardi', horaire: '08:00 - 10:00', cours: 'intervention' },
    { jour: 'Mardi', horaire: '10:00 - 12:00', cours: 'intervention' },
    { jour: 'Mercredi', horaire: '08:00 - 10:00', cours: 'intervention' },
    { jour: 'Jeudi', horaire: '10:00 - 12:00', cours: 'intervention' },
    { jour: 'Vendredi', horaire: '14:00 - 16:00', cours: 'intervention' }
  ];

  getCours(jour: string, horaire: string): string {
    const cours = this.emploiDuTemps.find(e => e.jour === jour && e.horaire === horaire);
    return cours ? cours.cours : '';
  }
}
