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
// export class ServiceListComponent {

//   services: any[] = [];

//   ngOnInit(): void {
//     this.loadServiceList();
//     }

//   trackByService(index: number, service: any): string {
//     return service._id;
//   }


//     constructor(private serviceListService: ServiceListService) {}

//   loadServiceList(): void {
//     this.serviceListService.getData().subscribe(data => this.services =
//     data);

//   }

// }

export class ServiceListComponent {
  services: any[] = [];
  sous_services: any[] = [];
  isModalOpen: boolean = false;

  constructor(private serviceListService: ServiceListService, private sousServiceService: SousServiceService) {}

  ngOnInit(): void {
    this.loadServiceList();
  }

  trackByService(index: number, service: any): string {
    return service._id;
  }

  loadServiceList(): void {
    this.serviceListService.getData().subscribe(data => this.services = data);
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
}
