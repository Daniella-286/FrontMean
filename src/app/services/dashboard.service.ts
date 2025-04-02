import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'https://backmean.onrender.com/api/dashboard';
  private apiUrl2 = 'https://backmean.onrender.com/api/seuilstocks';

  constructor(private http: HttpClient) {}

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

  getTotalInterventions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total-interventions`, { headers: this.getHeaders() });
  }

  getNombreClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistiques/clients`, { headers: this.getHeaders() });
  }

  getNombreReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/parking/reservations`, { headers: this.getHeaders() });
  }

  getTotalCaisse(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total-caisse`, { headers: this.getHeaders() });
  }

  getNombreMecaniciens(): Observable<any> { // Nouvelle méthode
    return this.http.get(`${this.apiUrl}/statistiques/mecaniciens` , { headers: this.getHeaders() });
  }

  getInterventionsParMois(annee?: number): Observable<any> {
    let url = `${this.apiUrl}/interventions-terminees`;
    if (annee) {
      url += `?annee=${annee}`;
    }
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getMontantCaisseParMois(annee?: number): Observable<any> {
    let url = `${this.apiUrl}/finance/montants-caisse`;
    if (annee) {
      url += `?annee=${annee}`;
    }
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getStockRestant(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock/reste?page=${page}&limit=${limit}`, { headers: this.getHeaders() });
  }

  getSeuilStock(): Observable<any> {
    return this.http.get( this.apiUrl2 , { headers: this.getHeaders() });
  }

  getStockHistory(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock/history?page=${page}&limit=${limit}`, { headers: this.getHeaders() });
  }

}
