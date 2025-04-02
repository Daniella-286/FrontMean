import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {
  private apiUrl = 'https://backmean.onrender.com/api/interventions'; // URL du backend
  private sousservices = 'https://backmean.onrender.com/api/sous-services';
  private piecessousservices = 'https://backmean.onrender.com/api/pieces-services';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Charger tous les plannings par défaut
  getAllPlannings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mecanicien/plainning`, { headers: this.getHeaders() });
  }

  searchPlannings(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/mecanicien/plainning?date=${date}`,
      { headers: this.getHeaders() });
  }

  getTasksForIntervention(interventionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/mecanicien/tache/${interventionId}`,
      { headers: this.getHeaders() });
  }

  updateInterventionStatus(idIntervention: string, statut: string): Observable<any> {
    console.log("URL appelée :", `${this.apiUrl}/update-status/${idIntervention}`); // Debug
    return this.http.put(`${this.apiUrl}/update-status/${idIntervention}`, { statut });
  }

  getSousServices() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("URL appelée :", this.sousservices); // ✅ Vérifier l'URL
    return this.http.get(this.sousservices, { headers });
  }

  getPiecesBySousService(id_sous_service: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.piecessousservices}/pieces-par-sousservice/${id_sous_service}`, { headers });
  }

  addPieceToIntervention(data: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/ajouter-piece-utilise`, data);
  }
}
