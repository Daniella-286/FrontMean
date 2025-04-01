import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = `https://backmean.onrender.com/api/rendez-vous`;


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

// Récupérer les rendez-vous sans filtre de dates
getRendezVousDefault() {
  return this.http.get(`${this.apiUrl}/en-attente` , { headers: this.getHeaders() });
}

getAllRendezVousSearch(dateDebut: string, dateFin: string) {
  const dateDebutFormatted = this.formatDate(dateDebut);
  const dateFinFormatted = this.formatDate(dateFin);

  const params = new HttpParams()
    .set('date_debut', dateDebutFormatted)
    .set('date_fin', dateFinFormatted);

  return this.http.get(`${this.apiUrl}/en-attente`, {
    params: params,
    headers: this.getHeaders()
  });
}


getRendezVousNonDispoAttenteDefault() {
  return this.http.get(`${this.apiUrl}/mes-rendez-vous/attente-non-dispo` , { headers: this.getHeaders() });
}

getRendezVousNonDispoAttenteSearch(dateDebut: string, dateFin: string) {
  const dateDebutFormatted = this.formatDate(dateDebut);
  const dateFinFormatted = this.formatDate(dateFin);

  const params = new HttpParams()
    .set('date_debut', dateDebutFormatted)
    .set('date_fin', dateFinFormatted);

  return this.http.get(`${this.apiUrl}/mes-rendez-vous/attente-non-dispo`, {
    params: params,
    headers: this.getHeaders()
  });
}

  addRendezVous(rendezVous: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/prendre-rendez-vous`, rendezVous, {
      headers: headers  // Passe les headers récupérés à l'appel HTTP
    });
  }

  confirmRendezVousManager(id_rdv: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<{ message: string }>(`${this.apiUrl}/valider/${id_rdv}`, {})
      .pipe(
        catchError((error) => {
          let errorMessage = 'Erreur inconnue';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;  // Utiliser le message du backend
          }
          return throwError(() => new Error(errorMessage));  // Lancer l'erreur avec le message approprié
        })
      );
  }

  NonDispoRendezVousManager(id_rdv: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put<{ message: string }>(`${this.apiUrl}/indisponible/${id_rdv}`, {})
      .pipe(
        catchError((error) => {
          let errorMessage = 'Erreur inconnue';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;  // Utiliser le message du backend
          }
          return throwError(() => new Error(errorMessage));  // Lancer l'erreur avec le message approprié
        })
      );
  }

  getListRendezVousConfirmByClientDefault() {
    return this.http.get(`${this.apiUrl}/confirmes` , { headers: this.getHeaders() });
  }

  getListRendezVousConfirmByClientSearch(dateDebut: string, dateFin: string) {
    const dateDebutFormatted = this.formatDate(dateDebut);
    const dateFinFormatted = this.formatDate(dateFin);

    const params = new HttpParams()
      .set('date_debut', dateDebutFormatted)
      .set('date_fin', dateFinFormatted);

    return this.http.get(`${this.apiUrl}/confirmes`, {
      params: params,
      headers: this.getHeaders()
    });
  }



      formatDate(date: string): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois entre 01 et 12
        const day = String(d.getDate()).padStart(2, '0'); // Jour entre 01 et 31
        return `${year}-${month}-${day}`;
      }

      ///////////////////CLIENT/////////////////////

      getRendezVousClientDefault() {
        return this.http.get(`${this.apiUrl}/mes-rendez-vous` , { headers: this.getHeaders() });
      }

      getAllRendezVousClientSearch(dateDebut: string, dateFin: string) {
        const dateDebutFormatted = this.formatDate(dateDebut);
        const dateFinFormatted = this.formatDate(dateFin);

        const params = new HttpParams()
          .set('date_debut', dateDebutFormatted)
          .set('date_fin', dateFinFormatted);

        return this.http.get(`${this.apiUrl}/mes-rendez-vous`, {
          params: params,
          headers: this.getHeaders()
        });
      }

      ConfirmRendezVousClient(id_rdv: string): Observable<any> {
        const headers = this.getHeaders();
        console.log("test " , this.getHeaders() );
        return this.http
          .put<{ message: string }>(`${this.apiUrl}/confirmer/${id_rdv}`, { headers: this.getHeaders()})
          .pipe(
            catchError((error) => {
              let errorMessage = 'Erreur inconnue';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;  // Utiliser le message du backend
              }
              return throwError(() => new Error(errorMessage));  // Lancer l'erreur avec le message approprié
            })
          );
      }


      AnnulerRendezVousClient(id_rdv: string): Observable<any> {
        console.log("test " , this.getHeaders() );
        const headers = this.getHeaders();
        return this.http
          .put<{ message: string }>(`${this.apiUrl}/annuler/${id_rdv}`, { headers: this.getHeaders()})
          .pipe(
            catchError((error) => {
              let errorMessage = 'Erreur inconnue';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;  // Utiliser le message du backend
              }
              return throwError(() => new Error(errorMessage));  // Lancer l'erreur avec le message approprié
            })
          );
      }

      updateRendezVousClient(id: string , rendezVous: any , headers?: HttpHeaders): Observable<any> {
        console.log("test " , this.getHeaders() );
        const httpOptions = {
          headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
        };

           return this.http.put<any>(`${this.apiUrl}/modifier/${id}`, rendezVous , httpOptions)
          .pipe(
            catchError((error) => {
              let errorMessage = 'Erreur inconnue';
              if (error.error && error.error.message) {
                errorMessage = error.error.message;  // Utiliser le message du backend
              }
              return throwError(() => new Error(errorMessage));  // Lancer l'erreur avec le message approprié
            })
          );
      }

      getRendezVousClientConfirmerDefault() {
        return this.http.get(`${this.apiUrl}/mes-rendez-vous/confirme` , { headers: this.getHeaders() });
      }

      getAllRendezVousClientConfirmerSearch(dateDebut: string, dateFin: string) {
        const dateDebutFormatted = this.formatDate(dateDebut);
        const dateFinFormatted = this.formatDate(dateFin);

        const params = new HttpParams()
          .set('date_debut', dateDebutFormatted)
          .set('date_fin', dateFinFormatted);

        return this.http.get(`${this.apiUrl}/mes-rendez-vous/confirme`, {
          params: params,
          headers: this.getHeaders()
        });
      }


      // updateRendezVousClient(id: string , rendezVous: any , headers?: HttpHeaders): Observable<any> {
      //   console.log("rendezVous envoyé :", rendezVous); // Ajoute ceci pour voir si l'article est bien envoyé
      //   const httpOptions = {
      //     headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      //   };
      //   return this.http.put<any>(`${this.apiUrl}/modifier/${id}`, rendezVous , httpOptions);
      // }


}
