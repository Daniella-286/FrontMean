import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MouvementStockService {
  private apiUrl = 'https://backmean.onrender.com/api/mouvement-stock';

  constructor(private http: HttpClient) {}

  ajouterMouvement(id_piece: string, id_type_mouvement: string, quantite: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { id_piece, id_type_mouvement, quantite };
    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      catchError((error) => {
        // Si l'erreur est une erreur de type HTTP (par exemple, 400)
        throw error.error.message || 'Erreur inconnue';
      })
    );
  }
}
