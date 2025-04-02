import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = 'https://backmean.onrender.com/api/paiement'; // Changez cela si nécessaire

  constructor(private http: HttpClient) {}

  effectuerPaiement(idFacture: string, montant: number): Observable<any> {
    const paiementData = {
      id_facture: idFacture,
      montant: montant
    };
    return this.http.post(`${this.apiUrl}/effectuer-paiement-service`, paiementData);
  }

  effectuerPaiementParking(idFacture: string, montant: number): Observable<any> {
    const paiementData = {
      id_facture: idFacture,
      montant: montant
    };
    return this.http.post(`${this.apiUrl}/effectuer-paiement-parking`, paiementData);
  }

}
