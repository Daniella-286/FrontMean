import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionMecanicienService {
  private apiUrl = `https://backmean.onrender.com/api/mecaniciens/non-valides`;

  constructor(private http: HttpClient) { }


  registerMecanicien(mecanicien: any , headers?: HttpHeaders): Observable<any> {
    console.log("Mecanicien envoyé :", mecanicien); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, mecanicien , httpOptions);
  }

  // getData(): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.get(this.apiUrl, { headers });
  // }

}
