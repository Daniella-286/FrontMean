import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeDevisService {
  private apiUrl = `https://backmean.onrender.com/api/demande-devis`;
  private apiUrl2 = `https://backmean.onrender.com/api/devis`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDemandeEnvoye();
    }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Récupérer le token du localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajouter le token dans l'Authorization
    });
  }

  AddDemandeDevis(demande: FormData): Observable<any> {
    const headers = this.getHeaders(); // Appelle getHeaders() pour récupérer les en-têtes avec le token
    // Retourne la requête POST avec FormData et les headers, sans avoir besoin de définir Content-Type
    return this.http.post<any>(this.apiUrl, demande, {
      headers: headers  // Passe les headers récupérés à l'appel HTTP
    });
  }

  getDemandeEnAttenteByDate(dateDebut: string, dateFin: string): Observable<any> {

     // Convertir les dates en format 'YYYY-MM-DD'
          const dateDebutFormatted = this.formatDate(dateDebut);
          const dateFinFormatted = this.formatDate(dateFin);

          // Créer les paramètres pour la requête HTTP
          const params = new HttpParams()
            .set('date_debut', dateDebutFormatted)
            .set('date_fin', dateFinFormatted);

        return this.http.get(`${this.apiUrl}/mes-demandes`, { params: params,
          headers: this.getHeaders() });
  }

  loadDemandeEnAttente(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mes-demandes`, {
      headers: this.getHeaders() });
  }

  getDemandeEnvoyeByDate(dateDebut: string, dateFin: string): Observable<any> {
      // Convertir les dates en format 'YYYY-MM-DD'
      const dateDebutFormatted = this.formatDate(dateDebut);
      const dateFinFormatted = this.formatDate(dateFin);

      // Créer les paramètres pour la requête HTTP
      const params = new HttpParams()
        .set('date_debut', dateDebutFormatted)
        .set('date_fin', dateFinFormatted);
    return this.http.get(`${this.apiUrl}/mes-devis`, {
      params: params,
      headers: this.getHeaders() });
  }

  loadDemandeEnvoye(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mes-devis`, {
      headers: this.getHeaders() });
  }

  loadDemandeDevisClientToManager(): Observable<any> {
    return this.http.get(`${this.apiUrl}/demandes-en-attente`, {
      headers: this.getHeaders() });
  }

  loadDemandeClientToManagerByDate(dateDebut: string, dateFin: string): Observable<any> {

    // Convertir les dates en format 'YYYY-MM-DD'
         const dateDebutFormatted = this.formatDate(dateDebut);
         const dateFinFormatted = this.formatDate(dateFin);

         // Créer les paramètres pour la requête HTTP
         const params = new HttpParams()
           .set('date_debut', dateDebutFormatted)
           .set('date_fin', dateFinFormatted);

       return this.http.get(`${this.apiUrl}/demandes-en-attente`, { params: params,
         headers: this.getHeaders() });
 }

  loadDetailDevis(id_demande : string): Observable<any> {
    console.log(`Requête API envoyée itoooooo ooooh: /api/${id_demande}`);
    return this.http.get(`${this.apiUrl2}/details/${id_demande}`, {
      headers: this.getHeaders() });
  }

  EnvoyerDetailDevis(id_demande : string): Observable<any> {
    console.log(`Requête API envoyée itoooooo ooooh: /api/${id_demande}`);
    return this.http.put(`${this.apiUrl}/envoyer-devis/${id_demande}`, {
      headers: this.getHeaders() });
  }

        // Méthode de formatage des dates
    formatDate(date: string): string {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois entre 01 et 12
      const day = String(d.getDate()).padStart(2, '0'); // Jour entre 01 et 31
      return `${year}-${month}-${day}`;
    }

}
