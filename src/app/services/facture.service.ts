import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'https://backmean.onrender.com/api/factures'; // URL du backend

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Charger toutes les factures du jour par défaut
  getAllFactures(): Observable<any> {
    return this.http.get(`${this.apiUrl}/du-jour`, { headers: this.getHeaders() });
  }

  // Rechercher des factures par date
  searchFactures(numero: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/du-jour?numero_facture=${numero}`, { headers: this.getHeaders() });
  }

  getFactureDetails(id_facture: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/du-jour/${id_facture}`);
  }
}
