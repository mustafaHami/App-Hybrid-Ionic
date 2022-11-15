import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { Person } from 'src/app/auth/person.model';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  place: Place = new Place("","","","",0,false);
  places : Place[];
  file : Blob;
  imageUrl?: string;
  constructor(
    public placeService : PlacesService,
    private navCtr: NavController,
  ) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (!form.valid) { return; }
    // on récupère toutes les valeurs du formulaire
      this.place.title = form.value.title;
      this.place.description = form.value.description;
      this.place.price = form.value.price;
      this.place.imageUrl = this.imageUrl
      this.place.personal = true; 
      console.log(this.place)
      this.createOffers();
    }
    onSelectedFile(e: any): void {
      // save url image
      if (e.target.files) {
        this.file = e.target.files[0];
        if (this.file?.type.startsWith('image/')) {
          let reader = new FileReader();
          reader.readAsDataURL(<Blob>this.file);
          reader.onload = (e: any) => {
            this.imageUrl = e.target.result;
          }
        } else {
          this.file = null;
          e.target.value = '';
          this.imageUrl = undefined;
        }
      }
    }
    // ajouter la place dans le local storage 
    // puisque l'attrivue personnal = vrai
    // ça sera une offre
    createOffers(){
      this.places = this.placeService.getAllPlaces();

      this.places.push(this.place)
      // on rengistre une fois pour mettre la nouelle place dans le local
      this.placeService.savePlaces(this.places)
      var i = 1;
      // après l'enregistrement on parcours tout le tableau pour donner des id unique
      for(var p of this.places){
        p.id = 'p'+i;
        i++;
      }
      // on enregistre une deuxième fois pour enregistré leurs id
      this.placeService.savePlaces(this.places)
      
      this.navCtr.navigateBack('/places/tabs/discover');
    }
  }
