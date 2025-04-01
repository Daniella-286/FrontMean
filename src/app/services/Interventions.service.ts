import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  private apiUrl = `https://backmean.onrender.com/api/interventions`;


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



getListMecanicienDisponibleSearch(date_intervention: string, duree_reparation: string , id_service: string) {
  const date_interventionFormatted = this.formatDate(date_intervention);

  const params = new HttpParams()
    .set('date_intervention', date_interventionFormatted)
    .set('duree_reparation', duree_reparation)
    .set('id_service', id_service)

  return this.http.get(`${this.apiUrl}/disponibilite-mecaniciens`, {
    params: params,
    headers: this.getHeaders()
  });
}

formatDate(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

    getRendezVousClientConfirmerDefault() {
      return this.http.get(`${this.apiUrl}/mes-rendez-vous/confirme` , { headers: this.getHeaders() });
    }


  addIntervention(interventions: any , headers?: HttpHeaders): Observable<any> {
    console.log("interventions envoyé :", interventions); // Ajoute ceci pour voir si l'article est bien envoyé
    // const httpOptions = {
    //   headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    return this.http.post<any>(this.apiUrl, interventions , { headers: this.getHeaders() });
  }

}
