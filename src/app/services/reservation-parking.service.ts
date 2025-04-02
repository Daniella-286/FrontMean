import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationParkingService {
  private apiUrl = `https://backmean.onrender.com/api/reservations`;
  //private apiUrl = `http://192.168.0.103:5000/api/reservations`;

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

  getReservationTerminer(): Observable<any> {
    return this.http.get(`${this.apiUrl}/facturables`, { headers: this.getHeaders() });
  }

  // getReservationTerminerSearch(dateDebut: string, dateFin: string) {
  //   // Convertir les dates en format 'YYYY-MM-DD'
  //   const dateDebutFormatted = this.formatDate(dateDebut);
  //   const dateFinFormatted = this.formatDate(dateFin);

  //   // Créer les paramètres pour la requête HTTP
  //   const params = new HttpParams()
  //     .set('date_debut', dateDebutFormatted)
  //     .set('date_fin', dateFinFormatted);

  //   // Faire la requête HTTP GET avec les paramètres et les headers
  //   return this.http.get(`${this.apiUrl}/facturables`, {
  //     params: params,
  //     headers: this.getHeaders()
  //   });
  // }


  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  getReservationClient(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations-client`, { headers: this.getHeaders() });
  }

// Exemple dans un service ou composant Angular
    getReservationSearch(dateDebut: string, dateFin: string) {
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


    addReservationParking(parking: any ): Observable<any> {
      console.log("parking envoyé :", parking); // Ajoute ceci pour voir si l'article est bien envoyé

      return this.http.post<any>(this.apiUrl, parking , { headers: this.getHeaders() });
    }

    deleteReservationParkingById(id: string, headers?: HttpHeaders): Observable<any> {
      console.log("ID du parking envoyé :", id);
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
    }

    getReservationParkingById(id: string , headers?: HttpHeaders): Observable<any> {
      console.log("ReservationParkingById envoyé :"); // Ajoute ceci pour voir si l'article est bien envoyé
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.get<any>(`${this.apiUrl}/${id}` , httpOptions);
    }

    updateReservationParkingById(id: string , parking: any , headers?: HttpHeaders): Observable<any> {
      console.log("ReservationParkingById envoyé :", parking); // Ajoute ceci pour voir si l'article est bien envoyé
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.put<any>(`${this.apiUrl}/${id}`, parking , httpOptions);
    }

    confirmReservation(id_reservation: string) {
      return this.http.put<{ message: string }>(`${this.apiUrl}/${id_reservation}/confirmer`, {});
    }

    cancelReservation(id_reservation: string) {
      return this.http.put<{ message: string }>(`${this.apiUrl}/${id_reservation}/annuler`, {});
    }

    getReservationConfirmer(): Observable<any> {
     // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get(`${this.apiUrl}/confirmees`, { headers: this.getHeaders() });
    }

    getReservationConfirmerSearch(dateDebut: string, dateFin: string) {
      // Convertir les dates en format 'YYYY-MM-DD'
      const dateDebutFormatted = this.formatDate(dateDebut);
      const dateFinFormatted = this.formatDate(dateFin);

      // Créer les paramètres pour la requête HTTP
      const params = new HttpParams()
        .set('date_debut', dateDebutFormatted)
        .set('date_fin', dateFinFormatted);

      // Faire la requête HTTP GET avec les paramètres et les headers
      return this.http.get(`${this.apiUrl}/confirmees`, {
        params: params,
        headers: this.getHeaders()
      });
    }

    getAllReservation(page: number, limit: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/attente-validation-manager?page=${page}&limit=${limit}`, {
        headers: this.getHeaders()
      });
     }

      // Faire la requête HTTP GET avec les paramètres et les headers

    getAllReservationSearch(dateDebut: string, dateFin: string) {
      // Convertir les dates en format 'YYYY-MM-DD'
      const dateDebutFormatted = this.formatDate(dateDebut);
      const dateFinFormatted = this.formatDate(dateFin);

      // Créer les paramètres pour la requête HTTP
      const params = new HttpParams()
        .set('date_debut', dateDebutFormatted)
        .set('date_fin', dateFinFormatted);

      // Faire la requête HTTP GET avec les paramètres et les headers
      return this.http.get(`${this.apiUrl}/attente-validation-manager`, {
        params: params,
        headers: this.getHeaders()
      });
    }

    confirmReservationManager(id_reservation: string) {
      return this.http.put<{ message: string }>(`${this.apiUrl}/${id_reservation}/valider`,  { headers: this.getHeaders() });
    }

}
