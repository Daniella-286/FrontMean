import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = `https://backmean.onrender.com/api/parkings`;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

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

  // private getHeaders(): HttpHeaders {
  //   let token = '';
  
  //   // Vérifier si l'on est dans le navigateur avant d'utiliser localStorage
  //   if (typeof window !== 'undefined') {
  //     token = localStorage.getItem('token') || ''; // Récupérer le token du localStorage
  //   }
  
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': token ? `Bearer ${token}` : '' // Ajouter le token dans l'Authorization si disponible
  //   });
  // }
  

    addParking(parking: any , headers?: HttpHeaders): Observable<any> {
      console.log("parking envoyé :", parking); // Ajoute ceci pour voir si l'article est bien envoyé
      return this.http.post<any>(this.apiUrl, parking , { headers: this.getHeaders() });
    }

    deleteParkingById(id: string, headers?: HttpHeaders): Observable<any> {
      console.log("ID du parking envoyé :", id);
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
    }

    getParkingById(id: string , headers?: HttpHeaders): Observable<any> {
      console.log("parking envoyé :"); // Ajoute ceci pour voir si l'article est bien envoyé
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.get<any>(`${this.apiUrl}/${id}` , httpOptions);
    }

    updateParkingById(id: string , parking: any , headers?: HttpHeaders): Observable<any> {
      console.log("parking envoyé :", parking); // Ajoute ceci pour voir si l'article est bien envoyé
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.put<any>(`${this.apiUrl}/${id}`, parking , httpOptions);
    }

    getParkingDisponible(): Observable<any> {

      return this.http.get<any>(`${this.apiUrl}/disponibles`);
    }

    // Exemple dans un service ou composant Angular
    getParkingsDisponibles(dateDebut: string, dateFin: string) {
      // Convertir les dates en format 'YYYY-MM-DD'
      const dateDebutFormatted = this.formatDate(dateDebut);
      const dateFinFormatted = this.formatDate(dateFin);

      // Créer les paramètres pour la requête HTTP
      const params = new HttpParams()
        .set('date_debut', dateDebutFormatted)
        .set('date_fin', dateFinFormatted);

      // Faire la requête HTTP GET
      return this.http.get('https://backmean.onrender.com/api/parkings/disponibles', { params });
    }

    // Méthode de formatage des dates
    formatDate(date: string): string {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois entre 01 et 12
      const day = String(d.getDate()).padStart(2, '0'); // Jour entre 01 et 31
      return `${year}-${month}-${day}`;
    }

  //parking by id
  //delete
  //put

}
