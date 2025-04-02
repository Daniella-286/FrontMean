import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MecanicienService {
  private apiUrl = `https://backmean.onrender.com/api/mecaniciens`;

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

  getMecaniciensNonValides(page: number, limit: number, search: string) {
    return this.http.get(`${this.apiUrl}/non-valides?page=${page}&limit=${limit}&search=${search}`,
      { headers: this.getHeaders() });
  }



  getListeMecaniciens(search: string) {
    const params = new HttpParams().set('search', search);
    return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}/listes-mecaniciens`, { params });
  }

  validationMecanicieByManager(id_mecanicien: string, id_service: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<{ message: string }>(`${this.apiUrl}/valider/${id_mecanicien}`, { id_service }) // 👈 Ajouter id_service ✅
      .pipe(
        catchError((error) => {
          let errorMessage = 'Erreur inconnue';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }


}
