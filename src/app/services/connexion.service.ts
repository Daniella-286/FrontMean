import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionClientService {
  private apiUrl = `https://backmean.onrender.com/api/users/login/client`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl, { headers });
  }
  getConnexionClientService(client: any, headers?: HttpHeaders): Observable<any> {

    const httpOptions = {
      headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.apiUrl, client, httpOptions);
  }

}
