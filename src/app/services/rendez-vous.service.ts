import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private apiUrl = `https://backmean.onrender.com/api/rendezVous`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

  addRendezVous(rendezVous: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(this.apiUrl, rendezVous, { headers });
  }


  deleteRendezVousById(id: string, headers?: HttpHeaders): Observable<any> {
    console.log("ID du service envoyé :", id);
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
  }

  getRendezVousById(id: string , headers?: HttpHeaders): Observable<any> {
    console.log("rendezVous envoyé :");
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(`${this.apiUrl}/${id}` , httpOptions);
  }

  updateRendezVousById(id: string , rendezVous: any , headers?: HttpHeaders): Observable<any> {
    console.log("rendezVous envoyé :", rendezVous); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, rendezVous , httpOptions);
  }



}
