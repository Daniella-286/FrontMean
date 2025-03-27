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

   constructor(private listClientService: ListClientService) {}

   clients: any[] = [];
   ngOnInit(): void {
    this.loadClientList();
    }

  loadClientList(): void {
    this.listClientService.getData().subscribe(data => this.clients =
    data);
    console.log('service' , this.clients );
  }

}
