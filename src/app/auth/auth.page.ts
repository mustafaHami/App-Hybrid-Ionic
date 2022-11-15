import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Person } from './person.model';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading=false;
 
  persons: Array<any> = [];
  person: Person = new Person("",""); // info personne lors de la conenxion
  newPerson : Person = new Person("",""); // info personne lors de l'inscription
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    public toastController: ToastController,

    ) {}
  ngOnInit() {
    // dès l'ouverture on récupère toutes les personnes enregistré dans le localstorag
    this.persons = this.authService.getAllPlayers();
  }

  onLogin() {
    var traitement;
    var result;
    if(this.persons.length != 0){
      // appel au service pour vérifier la personne
      traitement = this.authService.verifPassword(this.person.login,this.person.password);
      switch (traitement) {
        case "valide" : 
          this.isLoading = true;
          this.authService.login();
          this.authService.savePersonConnect(this.person); // on rengistre la personne qui vien de ce connecter dans le local storage
          this.loadingCtrl
          .create({ keyboardClose: true, message: 'Authentification en cours...' })
          .then(loadingEl => {
            loadingEl.present();
            setTimeout(() => {
              this.isLoading = false;
              loadingEl.dismiss();
            // après la fermeture du premier chargement si tout est bon je salut la personne avec un deuxième chargement
              this.loading()
            }, 1000);
          });
        break;
        case "invalide" : 
        this.toast("Failed: Incorrect password",'danger')
        break;
        case "inexistant" : 
          this.toast("Failed: Non-existent person","danger")
      }

    }else{
      this.toast("Failed: Non-existent person","danger")
    }
    }
    onIncription(){
      var existe = false;
      for (var p of this.persons){
        if(p.login == this.newPerson.login){
          existe = true; // on vérifier si la personne elle existe
        }
      }
      if(!existe){
        this.persons.push(this.newPerson);
        this.authService.savePlayers(this.persons);
        this.toast("Success: Inscripton Valid", "success");              

      }else{
        this.toast("Failed: Person exists", "danger");
      }
      setTimeout(() => {
        window.location.reload();
        }, 2000);
    }
  loading(){
      this.loadingCtrl
    .create({ keyboardClose: true, message: 'Bonjour '+ this.person.login })
    .then(loadingEl => {
    loadingEl.present();
    setTimeout(() => {
    this.isLoading = false;
    loadingEl.dismiss();
    this.router.navigateByUrl('/places/tabs/discover');
    }, 2000);
    });
    }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }
    this.person.login = form.value.login;
    this.person.password = form.value.password;
    this.onLogin() // execution de cette méthode après avoir enregistré le login et le mot de passe
    
    }
    onSubmit2(form: NgForm) {
      if (!form.valid) { return; }
      this.newPerson.login = form.value.login;
      this.newPerson.password = form.value.password;
      if(form.value.password == form.value.passwordconfirm){
        this.onIncription() // si son mot de passe correspond on isncrit la personne
      }else{
        this.toast("Failed: Invalid inscription", "danger");
      }
      
      }
      async toast(message,color) {
        const toast = await this.toastController.create({
          color: color,
          message: message,
          duration: 2000,
          position: 'middle',
        });
        toast.present();
      }
    
}
