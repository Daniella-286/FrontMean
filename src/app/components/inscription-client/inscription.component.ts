import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importer Router
import { InscriptionClientService } from '../../services/inscription-client.service';

@Component({
  selector: 'app-inscription',
   imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  elementForm = { nom: '', prenom: '' , date_naissance:"" , genre:"" , contact: "",
    adresse:"",email:"",mdp:"",confirmMdp:""
   };

   clients: any[] = [];
   serverMessage: string = ''; // Ajouter une variable pour afficher le message du backend

   constructor(private inscriptionClientService: InscriptionClientService  ,  private router: Router) {}

  //  ngOnInit(): void {
  //   this.loadInscriptionClient();
  // }


  registerClient(): void {
    console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée

    // Vérifier si tous les champs requis sont remplis
    if (!this.elementForm.nom || !this.elementForm.prenom || !this.elementForm.date_naissance ||
        !this.elementForm.genre || !this.elementForm.contact || !this.elementForm.adresse ||
        !this.elementForm.email || !this.elementForm.mdp || !this.elementForm.confirmMdp) {
      console.warn("⚠️ Formulaire incomplet :", this.elementForm);
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.inscriptionClientService.registerClient(this.elementForm, headers).subscribe(
      response => {
        console.log("✅ Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
        console.log("📤 Données envoyées au serveur :", JSON.stringify(this.elementForm));
        this.serverMessage = response.message;
        // this.loadInscriptionClient(); // Recharge la liste après ajout
        this.elementForm = { nom: '', prenom: '', date_naissance: "", genre: "", contact: "",
          adresse: "", email: "", mdp: "" , confirmMdp:"" }; // Réinitialise le formulaire
          if (response ) {

             // Redirection vers la page services
             this.router.navigate(['/connexion']);
          }
      },

      error => {
        console.error("❌ Erreur lors de l'ajout :", error);
        this.serverMessage = error.error.message || "Erreur serveur"; // Si erreur, afficher le message d'erreur
      }
    );
  }


  // registerClient(): void {
  //   console.log("📤 Données envoyées retooo:", this.elementForm); // 🔍 Vérifier si cette fonction est bien appelée
  //    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   if (this.elementForm) {
  //     this.inscriptionClientService.registerClient(this.elementForm , headers).subscribe(response => {
  //       console.log("Réponse du serveur :", response); // 🔍 Voir si le backend répond bien
  //       this.loadInscriptionClient(); // Recharge la liste après ajout
  //       this.elementForm = { nom: '', prenom: '' , date_naissance:"" , genre:"" , contact: "",
  //         adresse:"",email:"",mdp:"" }; // Réinitialise le formulaire
  //     }, error => {
  //       console.error("Erreur lors de l'ajout :", error); // 🔍 Afficher les erreurs possibles
  //     });
  //   } else {
  //     console.warn("Formulaire incomplet :", this.elementForm); // 🔍 Avertissement si le formulaire est vide
  //   }
  // }

  // loadInscriptionClient(): void {
  //   this.inscriptionClientService.getData().subscribe(data => {
  //     console.log("📥 Données reçues :", data);
  //     this.clients = data;
  //   }, error => {
  //     console.error("❌ Erreur lors du chargement des clients :", error);
  //   });


}
