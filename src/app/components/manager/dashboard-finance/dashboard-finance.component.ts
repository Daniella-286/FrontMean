import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-finance',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './dashboard-finance.component.html',
  styleUrls: ['./dashboard-finance.component.css']
})
export class DashboardFinanceComponent implements OnInit {
  annee: number = new Date().getFullYear();
  statistiques: any[] = [];

  // Labels des mois pour le graphique
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
          precision: 0,
        }
      }
    }
  };

  barChartLabels: string[] = this.moisLabels;
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: new Array(12).fill(0),
        label: 'Montant Service (Ariary)',
        backgroundColor: '#19DDD0',
        borderColor: '#388E3C',
        borderWidth: 1
      },
      {
        data: new Array(12).fill(0),
        label: 'Montant Parking (Ariary)',
        backgroundColor: '#197771',
        borderColor: '#EF6C00',
        borderWidth: 1
      }
    ],
  };
  barChartType: ChartType = 'bar';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStatistiques();
  }

  loadStatistiques(): void {
    this.dashboardService.getMontantCaisseParMois(this.annee).subscribe(data => {
      this.statistiques = data.statistiques;

      // Initialiser les montants à 0
      const montantServiceParMois = new Array(12).fill(0);
      const montantParkingParMois = new Array(12).fill(0);

      // Remplir les données des montants
      this.statistiques.forEach(s => {
        montantServiceParMois[s.mois - 1] = s.montant_service;
        montantParkingParMois[s.mois - 1] = s.montant_parking;
      });

      // Mettre à jour le graphique
      this.barChartData = {
        labels: this.moisLabels,
        datasets: [
          {
            data: montantServiceParMois,
            label: 'Montant Service (Ariary)',
            backgroundColor: '#19DDD0',
            borderColor: '#388E3C',
            borderWidth: 1
          },
          {
            data: montantParkingParMois,
            label: 'Montant Parking (Ariary)',
            backgroundColor: '#197771',
            borderColor: '#EF6C00',
            borderWidth: 1
          }
        ]
      };
    });
  }
}
