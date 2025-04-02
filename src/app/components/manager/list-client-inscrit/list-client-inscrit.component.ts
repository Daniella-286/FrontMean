import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListClientService } from '../../../services/client-list.service';

@Component({
  selector: 'app-list-client-inscrit',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-client-inscrit.component.html',
  styleUrl: './list-client-inscrit.component.css'
})
export class ListClientInscritComponent {
  clients: any[] = [];
  errorMessage: string = "";
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  totalItems: number = 0;
  searchQuery: string = ''; // Stocke la recherche

  constructor(private listClientService: ListClientService) {}

  ngOnInit(): void {
    this.loadClientList();
  }

  loadClientList(): void {
    this.listClientService.getData(this.currentPage, this.pageSize, this.searchQuery)
      .subscribe({
        next: (data) => {
          if (!data || !data.data) {
            this.errorMessage = "Aucun client trouvé.";
            this.clients = []; // Réinitialiser la liste
            this.totalItems = 0;
            this.totalPages = 0;
          } else {
            this.clients = data.data;
            this.totalItems = data.total;
            this.totalPages = data.totalPages;
            this.errorMessage = ""; // Réinitialiser le message d'erreur
          }
        },
        error: (err) => {
          console.error("Erreur lors du chargement des clients:", err);
          this.errorMessage = "Une erreur est survenue lors du chargement des clients.";
        }
      });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadClientList();
    }
  }

  searchClients(): void {
    this.currentPage = 1; // Réinitialiser à la première page lors d'une recherche
    this.loadClientList();
  }
}
