import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmploiDuTempsService {
  private apiUrl = 'https://backmean.onrender.com/api/interventions';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getEmploiDuTemps(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mecanicien/emploi-du-temps`, { headers: this.getHeaders() });
  }

}
