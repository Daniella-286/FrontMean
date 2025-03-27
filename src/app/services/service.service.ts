import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceListService {
  private apiUrl = `https://backmean.onrender.com/api/services`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajouter le token dans l'Authorization
    });
  }

  getData(): Observable<any> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  addService(serviceData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post<any>(this.apiUrl, serviceData, { headers });
  }


  deleteServiceById(id: string, headers?: HttpHeaders): Observable<any> {
    console.log("ID du service envoyé :", id);
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
  }

  getServiceById(id: string , headers?: HttpHeaders): Observable<any> {
    console.log("service envoyé :");
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(`${this.apiUrl}/${id}` , httpOptions);
  }

  updateServiceById(id: string , service: any , headers?: HttpHeaders): Observable<any> {
    console.log("service envoyé :", service); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, service , httpOptions);
  }



}
