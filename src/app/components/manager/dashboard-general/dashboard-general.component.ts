import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-general',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-general.component.html',
  styleUrl: './dashboard-general.component.css'
})

export class ManagerDashboardComponent implements OnInit {
  totalInterventions: number = 0;
  totalClients: number = 0;
  totalReservations: number = 0;
  totalCaisse: number = 0;
  totalMecaniciens: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.dashboardService.getTotalInterventions().subscribe(data => {
      this.totalInterventions = data.total;
    });

    this.dashboardService.getNombreClients().subscribe(data => {
      this.totalClients = data.total;
    });

    this.dashboardService.getNombreReservations().subscribe(data => {
      this.totalReservations = data.total;
    });

    this.dashboardService.getTotalCaisse().subscribe(data => {
      this.totalCaisse = data.totalCaisse;
    });

    this.dashboardService.getNombreMecaniciens().subscribe(data => { // Ajout
      this.totalMecaniciens = data.total;
    });
  }
}
