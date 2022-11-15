import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '../places/places.service';
import { ReservePlaceService } from './reserve-place.service';
import { ReservePlace } from './reservePlace.model';
import { Place } from '../places/place.model';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  @ViewChild (IonItemSliding) ionItemSliding: IonItemSliding
  loadedReservePlaces: ReservePlace[];
  placesAndReserveplace : any[] = [];
  constructor(
    private reservePlaces: ReservePlaceService,
    private placesService: PlacesService,
    private alertController : AlertController
    ){
  }

  ngOnInit() {
    // chargemenet des réservations
    this.loadedReservePlaces = this.reservePlaces.getAll()
    this.chargePlace()
  }

  chargePlace(){
   // je push les places des réservations faites pour l'afficher
    this.placesAndReserveplace = [];
    for(var reservePlace of this.loadedReservePlaces){
      // création d'un objet pour récupérer la date et le nombre de jour de la réservation
      // et les informations de la places 
      var placeObject = {
        reservePlace: reservePlace,
        place : this.placesService.getPlace(reservePlace.placeId)
      }
      this.placesAndReserveplace.push(placeObject)
    }
  }

  onDeleteBooking(place: Place){
    this.alertController.create({
    header: 'Confirmation',
    message: 'Supprimer la reservation ' + place.title,
    buttons: [
      {
      text: 'Annuler',
      role: 'cancel ',
      handler: () => this.ionItemSliding.close()
    },
    {
      text: 'Supprimer',
      handler: () => {this.loadedReservePlaces = this.reservePlaces.deleteBooking(place.id,this.loadedReservePlaces); this.chargePlace()}
      
    }]
    }).then(alertEl => {
      alertEl.present();
    });
    }
  }

