import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './auth/auth.service';
import { Person } from './auth/person.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.savePersonConnect(new Person("",""));// met le champt a vide dès que la personne ce déconnecte
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
  onDeletPers(){
    const personCo = this.authService.getPersonCo(); // on récupére la personne qui c'est connecté, grâce au local storage
    console.log(personCo);
    this.authService.suppPerson(personCo); // puis on le supprime et on ce déconnecte
    this.onLogout();
  }
}
