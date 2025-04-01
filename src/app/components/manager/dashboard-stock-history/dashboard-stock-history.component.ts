import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-stock-history',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-stock-history.component.html',
  styleUrls: ['./dashboard-stock-history.component.css']
})
export class StockHistoryComponent implements OnInit {
  stockHistory: any[] = [];
  page: number = 1;
  limit: number = 10;
  totalPages: number = 1;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStockHistory();
  }

  loadStockHistory(): void {
    this.dashboardService.getStockHistory(this.page, this.limit).subscribe(response => {
      this.stockHistory = response.stockHistory;
      this.totalPages = response.totalPages;
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadStockHistory();
    }
  }
}
