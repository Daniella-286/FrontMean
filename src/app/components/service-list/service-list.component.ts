import { CommonModule } from '@angular/common'; // Ajout de CommonModule
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceListService } from '../../services/service.service';
import { SousServiceService } from '../../services/sous-service.service';

@Component({
  selector: 'app-service-list',
  imports: [RouterModule , CommonModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})


export class ServiceListComponent {
  services: any[] = [];
  sous_services: any[] = [];
  isModalOpen: boolean = false;
  currentPage: number = 1;  // Page actuelle
  totalPages: number = 1;   // Nombre total de pages
  limit: number = 10;       // Nombre d'éléments par page

  constructor(private serviceListService: ServiceListService, private sousServiceService: SousServiceService) {}

  ngOnInit(): void {
    this.loadServiceList();
  }

  trackByService(index: number, service: any): string {
    return service._id;
  }

  loadServiceList(): void {
    // Appeler le service avec les paramètres de pagination
    this.serviceListService.getData(this.currentPage, this.limit).subscribe(data => {
      this.services = data.services;
      this.totalPages = data.totalPages; // Mettre à jour le nombre total de pages
    });
  }

  // Ouvrir le popup et charger les sous-services
  openModal(id_service: string): void {
    this.isModalOpen = true;
    this.sousServiceService.getSousServiceByIdService(id_service).subscribe(data => {
      this.sous_services = data;
      console.log('Sous-services chargés :', this.sous_services);
    });
  }

  // Fermer le popup
  closeModal(): void {
    this.isModalOpen = false;
    this.sous_services = []; // Nettoyer les données
  }

   // Changer de page
   changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadServiceList();  // Recharger la liste des services
    }
  }
}
