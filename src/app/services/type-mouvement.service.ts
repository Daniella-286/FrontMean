import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importer le map

@Injectable({
  providedIn: 'root'
})
export class TypeMouvementService {
  private apiUrl = 'https://backmean.onrender.com/api/type-mouvement';

  constructor(private http: HttpClient) {}

  getTypesMouvement(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => response.data || []) // Extrait 'data' de la réponse
    );
  }
}
