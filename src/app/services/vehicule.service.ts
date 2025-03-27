import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = 'https://backmean.onrender.com/api/vehicules';

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
  

  getData(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  addVehicule(vehicule: any): Observable<any> {
    console.log("🚗 Données envoyées :", vehicule);
    return this.http.post<any>(`${this.apiUrl}/ajouter-vehicules`, vehicule, { headers: this.getHeaders() });
  }


  deleteVehiculeById(id: string, headers?: HttpHeaders): Observable<any> {
    console.log("ID du Vehicule envoyé :", id);
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
  }

  getVehiculegById(id: string , headers?: HttpHeaders): Observable<any> {
    console.log("Vehicule envoyé :"); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(`${this.apiUrl}/${id}` , httpOptions);
  }

  updateVehiculegById(id: string , vehicule: any , headers?: HttpHeaders): Observable<any> {
    console.log("Vehicule envoyé :", vehicule); // Ajoute ceci pour voir si l'article est bien envoyé
    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, vehicule , httpOptions);
  }

}













