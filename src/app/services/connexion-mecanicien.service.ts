import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnexionMecanicienService {
  private apiUrl = `https://backmean.onrender.com/api/users/login/mecanicien`;

  constructor(private http: HttpClient ,  private router: Router) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  getConnexionMecanicienService(manager: any, headers?: HttpHeaders): Observable<any> {

    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, manager, httpOptions).pipe(
          tap(response => {
            if (response.token) {
              localStorage.setItem('token', response.token);
              localStorage.setItem('role', 'mecanicien'); // Stocke le rôle
            }
          })
        );
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Vérifie si le token existe
  }

  logoutMecanicien(): void {
    localStorage.removeItem('token'); // Supprimer le token
    localStorage.removeItem('role');
    this.router.navigate(['/connexion-mecanicien']); // Redirection après déconnexion
    console.log('Utilisateur déconnecté');
  }

}
