import { CommonModule } from '@angular/common'; // 👈 Import obligatoire
import { Component } from '@angular/core';

@Component({
  selector: 'app-statistique-reparation-par-mois',
  standalone: true, // 👈 Indique que ce composant est autonome
  imports: [CommonModule], // 👈 Ajoute CommonModule ici
  templateUrl: './statistique-reparation-par-mois.component.html',
  styleUrls: ['./statistique-reparation-par-mois.component.css']
})
export class StatistiqueReparationParMoisComponent {

  // Liste des statistiques (chaque élément représente un diagramme)
  statistiques = [
    {
      title: 'Réparations par mois',
      chartData: [
        { label: 'Jan', value: 50, color: '#3498db' },
        { label: 'Mar', value: 75, color: '#2ecc71' },
        { label: 'Feb', value: 100, color: '#e74c3c' },
        { label: 'Apr', value: 125, color: '#f39c12' },
      ]
    },
    {
      title: 'Coût des réparations',
      chartData: [
        { label: 'Feb', value: 60, color: '#9b59b6' },
        { label: 'Jan', value: 80, color: '#1abc9c' },
        { label: 'Mar', value: 90, color: '#34495e' },
        { label: 'Apr', value: 110, color: '#d35400' },
      ]
    }
  ];

  // Définition des valeurs de l'axe Y (communes à tous les graphes)
  yTicks = [150, 100, 50, 0];

}
