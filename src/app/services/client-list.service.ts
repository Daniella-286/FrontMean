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
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
   // console.log(localStorage.getItem('token'));
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajouter le token dans l'Authorization
    });
  }

  getData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders()});
  }

  // gets(client: any , headers?: HttpHeaders): Observable<any> {
  //   console.log("client envoyé :", client); // Ajoute ceci pour voir si l'article est bien envoyé
  //   const httpOptions = {
  //     headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   return this.http.post<any>(this.apiUrl, client , httpOptions);
  // }


}
