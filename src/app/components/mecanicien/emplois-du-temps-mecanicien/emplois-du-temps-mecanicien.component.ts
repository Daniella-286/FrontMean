import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmploiDuTempsService } from '../../../services/emploi-du-temps.service';

@Component({
  selector: 'app-emplois-du-temps-mecanicien',
  imports: [CommonModule, FormsModule],
  templateUrl: './emplois-du-temps-mecanicien.component.html',
  styleUrls: ['./emplois-du-temps-mecanicien.component.css']
})
export class EmploisDuTempsMecanicienComponent implements OnInit {
  emploiDuTemps: any[] = [];
  jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  horaires = ['08:00 - 10:00', '10:00 - 12:00', '14:00 - 16:00', '16:00 - 18:00'];

  constructor(private emploiDuTempsService: EmploiDuTempsService) {} 

  ngOnInit() {
    this.emploiDuTempsService.getEmploiDuTemps().subscribe({
      next: (response: { success: boolean; data: any[] }) => {
        if (response.success) {
          this.emploiDuTemps = response.data.map(emploi => ({
            ...emploi,
            date_intervention_formatted: this.formatDateToLocal(emploi.date_intervention, 'HH:mm'),
            date_intervention_day: this.formatJour(emploi.date_intervention),
            date_fin_intervention_formatted: this.formatDateToLocal(emploi.date_fin_intervention, 'dd/MM/yyyy HH:mm')
          }));
  
          console.log(this.emploiDuTemps);  
        } else {
          console.error("Échec du chargement des emplois du temps");
        }
      },
      error: (err: any) => console.error("Erreur lors du chargement :", err)
    });
  }

  getCours(jour: string, horaire: string): string {
    const cours = this.emploiDuTemps.find(e => this.formatJour(e.date_intervention) === jour && this.formatHoraire(e.date_intervention) === horaire);
    return cours ? 'Intervention' : '';
  }

  formatJour(date: string): string {
    const joursMap = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return joursMap[new Date(date).getDay()];
  }

  formatHoraire(date: string): string {
    const heure = new Date(date).getHours();
    if (heure >= 8 && heure < 10) return '08:00 - 10:00';
    if (heure >= 10 && heure < 12) return '10:00 - 12:00';
    if (heure >= 14 && heure < 16) return '14:00 - 16:00';
    if (heure >= 16 && heure < 18) return '16:00 - 18:00';
    return '';
  }

  formatDate(date: string, format: string): string {
    const options: any = {
      hour: '2-digit', minute: '2-digit',
      day: '2-digit', month: '2-digit', year: 'numeric'
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
  }

  
  formatDateToLocal(date: string, format: string): string {
    const localDate = new Date(date);
  
    const options: any = {
      hour: '2-digit', minute: '2-digit',
      day: '2-digit', month: '2-digit', year: 'numeric',
      timeZone: 'UTC' // Important pour éviter la conversion à l'heure locale
    };
  
    return localDate.toLocaleString('fr-FR', options);
}
  

}
