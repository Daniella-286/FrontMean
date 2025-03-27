import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private apiUrl = `https://backmean.onrender.com/api/competences`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  // gets(client: any , headers?: HttpHeaders): Observable<any> {
  //   console.log("client envoyé :", client); // Ajoute ceci pour voir si l'article est bien envoyé
  //   const httpOptions = {
  //     headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   return this.http.post<any>(this.apiUrl, client , httpOptions);
  // }


}
