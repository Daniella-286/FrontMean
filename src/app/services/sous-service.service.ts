import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SousServiceService {
  private apiUrl = `https://backmean.onrender.com/api/sous-services`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  addSousService(sousService: any , headers?: HttpHeaders): Observable<any> {
    console.log("sousService envoyé :", sousService); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, sousService , httpOptions);
  }

  deleteSousServiceById(id: string, headers?: HttpHeaders): Observable<any> {
    console.log("ID du ss-service envoyé :", id);
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
  }

  getSousServiceById(id: string , headers?: HttpHeaders): Observable<any> {
    console.log("pièce envoyé :"); // Ajoute ceci pour voir si SousService est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(`${this.apiUrl}/${id}` , httpOptions);
  }

  getSousServiceByIdService(id_service: string , headers?: HttpHeaders): Observable<any> {
    console.log("SousService envoyé :"); // Ajoute ceci pour voir si l'SousService est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(`${this.apiUrl}/service/${id_service}` , httpOptions);
  }

  updateSousServiceById(id: string , sous_service: any , headers?: HttpHeaders): Observable<any> {
    console.log("sous_service envoyé :", sous_service); // Ajoute ceci pour voir si SousService est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, sous_service , httpOptions);
  }


}
