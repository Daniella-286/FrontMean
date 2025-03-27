import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  private apiUrl = `https://backmean.onrender.com/api/pieces`;

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }

    addPiece(pieces: any , headers?: HttpHeaders): Observable<any> {
      console.log("piece envoyé :", pieces); // Ajoute ceci pour voir si l'article est bien envoyé
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<any>(this.apiUrl, pieces , httpOptions);
    }

    deletePieceById(id: string, headers?: HttpHeaders): Observable<any> {
      console.log("ID du piece envoyé :", id);
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.delete<any>(`${this.apiUrl}/${id}`, httpOptions);
    }

    getPiecegById(id: string , headers?: HttpHeaders): Observable<any> {
      console.log("pièce envoyé :"); // Ajoute ceci pour voir si l'article est bien envoyé
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.get<any>(`${this.apiUrl}/${id}` , httpOptions);
    }

    updatePiecegById(id: string , piece: any , headers?: HttpHeaders): Observable<any> {
      console.log("parking envoyé :", piece); // Ajoute ceci pour voir si l'article est bien envoyé
      const httpOptions = {
        headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.put<any>(`${this.apiUrl}/${id}`, piece , httpOptions);
    }

  //piece by id
  //delete
  //put

}
