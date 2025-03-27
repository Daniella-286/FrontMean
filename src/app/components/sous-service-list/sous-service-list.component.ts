import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceListService } from '../../services/service.service';
import { SousServiceService } from '../../services/sous-service.service';
@Component({
  selector: 'app-sous-service-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './sous-service-list.component.html',
  styleUrl: './sous-service-list.component.css'
})
export class SousServiceListComponent {
  elementForm = { nom_sous_service: '', id_service:'', tarif: ''
   };

   sous_services: any[] = [];
   services: any[] = [];
   id_service: string | null = null; // Stocker l'ID du service sélectionné

     constructor( private route: ActivatedRoute,
      private sousServiceService: SousServiceService ,
      private serviceListService: ServiceListService) {}

      ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
          this.id_service = params.get('id'); // Récupère l'ID du service depuis l'URL
          if (this.id_service) {
            this.getSousServiceByIdService(this.id_service); // Charge les sous-services
          }
        });

        this.loadService(); // Charge la liste des services si nécessaire
      }



    loadService(): void {
      this.serviceListService.getData().subscribe(data => {
        this.services = data;
        console.log('service chargées retooo:', this.services); // Vérifier les catégories après chargement
       // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
      });
    }

    getSousServiceByIdService(id: string): void {
      this.sousServiceService.getSousServiceByIdService(id).subscribe(data => {
        this.sous_services = data;
        console.log('Sous-service chargées retooo:', this.services); // Vérifier les catégories après chargement
       // this.loadService();  // Appeler loadArticles après que les catégories aient été chargées
      });
    }


}
