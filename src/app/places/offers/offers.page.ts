import { Component, OnInit, ViewChild } from '@angular/core';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { AlertController, IonItemSliding, NavController } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  @ViewChild (IonItemSliding) ionItemSliding: IonItemSliding
  offers: Place[];// récupérer mes offres
  places: Place[]; // récupérer toutes les places pour la supression
  constructor(
    private placesService: PlacesService,
    private alertController : AlertController,
    private navCtr: NavController,
    ) { }

  ngOnInit() {
    this.offers = this.placesService.myPlaces;
    this.places = this.placesService.getAllPlaces()
  }
  onDeleteOffer(offer : Place){
    this.alertController.create({
      header: 'Confirmation',
      message: 'Supprimer l offre ' + offer.title,
      buttons: [
        {
        text: 'Annuler',
        role: 'cancel ',
        handler: () => this.ionItemSliding.close()
      },
      {
        text: 'Supprimer',
        handler: () => {
          // supprimer l'offre selectionnée
          
          this.places = this.placesService.deletePlace(this.places,offer); 
          
          // on enregistre le tableau dans le localstaorage;
          this.placesService.savePlaces(this.places);

          // on met a vide pour que quand il revient dans cette page il ne récupère pas l'ancien tableau 
          this.offers = this.placesService.myPlaces;
          this.navCtr.navigateBack('/places/tabs/offers');
        }
        
      }]
      }).then(alertEl => {
        alertEl.present();
      });
  }
}
