import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureClientService {
  private apiUrl = `https://backmean.onrender.com/api/factures`;
  private apiUrl2 = `https://backmean.onrender.com/api/factures-parking`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token'); // Récupérer le token du localStorage
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Ajouter le token dans l'Authorization
      });
    }
    // Retourner des en-têtes par défaut ou vides en cas d'environnement non client (ex: serveur)
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getFactureClientService(): Observable<any> {
    return this.http.get(`${this.apiUrl}/facture-client`, {
      headers: this.getHeaders() });
  }
    getDetailFactureClientService(id_facture: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/facture-client/${id_facture}`, {
        headers: this.getHeaders()});
    }


    getFactureParking(): Observable<any> {
      return this.http.get(`${this.apiUrl2}/facture-client`, {
        headers: this.getHeaders() });
    }


    getDetailFactureParking(id_facture: any): Observable<any> {
      return this.http.get(`${this.apiUrl2}/facture-client/${id_facture}`, {
        headers: this.getHeaders()});
    }


            // Méthode de formatage des dates
            formatDate(date: string): string {
              const d = new Date(date);
              const year = d.getFullYear();
              const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois entre 01 et 12
              const day = String(d.getDate()).padStart(2, '0'); // Jour entre 01 et 31
              return `${year}-${month}-${day}`;
            }

}
