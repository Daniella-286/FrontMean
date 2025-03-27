import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private apiUrl = `https://backmean.onrender.com/api/modeles`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  getDataModelByIdMarque(id: String): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}/marque/${id}`, { headers });
  }

  addModelService(model: any , headers?: HttpHeaders): Observable<any> {
    console.log("model envoyé :", model); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, model , httpOptions);
  }

  deleteMModeleById(id: string, headers?: HttpHeaders): Observable<any> {
    console.log("ID du Model envoyé :", id);
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
  }

  updateModelegById(id: string , model: any , headers?: HttpHeaders): Observable<any> {
    console.log("model envoyé :", model); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, model , httpOptions);
  }
}
