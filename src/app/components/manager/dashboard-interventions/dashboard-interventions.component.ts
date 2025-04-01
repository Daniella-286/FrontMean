import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-interventions',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './dashboard-interventions.component.html',
  styleUrls: ['./dashboard-interventions.component.css']
})
export class DashboardInterventionsComponent implements OnInit {
  annee: number = new Date().getFullYear();
  statistiques: any[] = [];

  // Liste des mois en français pour l'axe X
  moisLabels: string[] = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // Forcer les valeurs entières
        }
      }
    }
  };

  barChartLabels: string[] = this.moisLabels; // Mois affichés sur l'axe X
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [{
      data: new Array(12).fill(0), // Initialise avec 12 valeurs à 0
      label: 'Interventions Terminées',
      backgroundColor: '#19ddd0',
      borderColor: '#0056b3',
      borderWidth: 1
    }],
  };
  barChartType: ChartType = 'bar';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStatistiques();
  }

  loadStatistiques(): void {
    this.dashboardService.getInterventionsParMois(this.annee).subscribe(data => {
      this.statistiques = data.statistiques;

      // Créer un tableau avec les valeurs de 12 mois (rempli par défaut à 0)
      const interventionsParMois = new Array(12).fill(0);

      // Remplir avec les vraies données
      this.statistiques.forEach(s => {
        interventionsParMois[s.mois - 1] = s.nombre_interventions;
      });

      // Mettre à jour les données du graphique
      this.barChartData = {
        labels: this.moisLabels, // Mois affichés
        datasets: [{
          data: interventionsParMois,
          label: 'Interventions Terminées',
          backgroundColor: '#19ddd0',
          borderColor: '#0056b3',
          borderWidth: 1
        }]
      };
    });
  }
}
