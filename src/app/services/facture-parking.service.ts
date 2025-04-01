import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureParkingService {
  private apiUrl = 'https://backmean.onrender.com/api/factures-parking'; // URL du backend

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAllFactures(): Observable<any> {
      return this.http.get(`${this.apiUrl}/factures-du-jour`, { headers: this.getHeaders() });
  }

  searchFactures(numero: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/factures-du-jour?numero_facture=${numero}`, { headers: this.getHeaders() });
  }

  // Récupérer les détails d'une facture de parking
  getFactureParkingDetails(id_facture: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/factures-du-jour/${id_facture}`, { headers: this.getHeaders() });
  }

}
