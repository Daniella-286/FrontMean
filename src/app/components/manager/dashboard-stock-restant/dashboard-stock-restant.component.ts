import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-stock-restant',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-stock-restant.component.html',
  styleUrls: ['./dashboard-stock-restant.component.css']
})
export class StockRestantComponent implements OnInit {
  stockRestant: any[] = [];
  seuilStock: number = 0;
  page: number = 1;
  limit: number = 10;
  totalPages: number = 1;
  totalPieces: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getSeuilStock();
  }

  getSeuilStock(): void {
    this.dashboardService.getSeuilStock().subscribe(
      (data: any) => {
        this.seuilStock = data.length > 0 ? data[0].quantite : 0;
        this.getStockRestant();
      },
      error => console.error('Erreur lors de la récupération du seuil de stock', error)
    );
  }

  getStockRestant(): void {
    this.dashboardService.getStockRestant(this.page, this.limit).subscribe(
      (data: any) => {
        this.stockRestant = data.stockRestant;
        this.totalPages = data.totalPages;
        this.totalPieces = data.totalPieces;
      },
      error => console.error('Erreur lors de la récupération du stock restant', error)
    );
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getStockRestant();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.getStockRestant();
    }
  }

  isStockCritique(stock: number): boolean {
    return stock <= this.seuilStock;
  }
}
