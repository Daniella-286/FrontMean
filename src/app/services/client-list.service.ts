import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListClientService {
   private apiUrl = `https://backmean.onrender.com/api/clients`;
  //private apiUrl = `http://192.168.0.103:5000/api/clients`;

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

  getData(page: number, limit: number, search: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}&search=${search}`, { headers: this.getHeaders() });
  }

  // getData(): Observable<any> {
  //   return this.http.get(this.apiUrl, { headers: this.getHeaders()});
  // }


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




  // gets(client: any , headers?: HttpHeaders): Observable<any> {
  //   console.log("client envoyé :", client); // Ajoute ceci pour voir si l'article est bien envoyé
  //   const httpOptions = {
  //     headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   return this.http.post<any>(this.apiUrl, client , httpOptions);
  // }


}
