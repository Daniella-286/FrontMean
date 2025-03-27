import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  private apiUrl = `https://backmean.onrender.com/api/marques`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  addMarqueService(marque: any , headers?: HttpHeaders): Observable<any> {
    console.log("marque envoyé :", marque); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, marque , httpOptions);
  }

  deleteMarqueById(id: string, headers?: HttpHeaders): Observable<any> {
    console.log("ID du Marque envoyé :", id);
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
  }

  getMarquegById(id: string , headers?: HttpHeaders): Observable<any> {
    console.log("marque envoyé :"); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(`${this.apiUrl}/${id}` , httpOptions);
  }

  updateMarquegById(id: string , marque: any , headers?: HttpHeaders): Observable<any> {
    console.log("marque envoyé :", marque); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, marque , httpOptions);
  }


}
