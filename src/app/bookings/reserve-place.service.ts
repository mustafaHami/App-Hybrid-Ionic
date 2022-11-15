import { Injectable } from '@angular/core';
import { ReservePlace } from './reservePlace.model';

@Injectable({
  providedIn: 'root'
})
export class ReservePlaceService {

  private _reservePlaces : ReservePlace[] = [
    new ReservePlace(
      'p1',
      new Date(),
      15
    ),
    new ReservePlace(
      'p3',
      new Date(),
      5
    ),
    new ReservePlace(
      'p4',
      new Date(),
      3
    )
  ]

  getPlace(placeId: string) {
    return {...this._reservePlaces.find(p => p.placeId === placeId)};
  }
  getAll(){
    return this._reservePlaces;
  }
  constructor(){
  }
  deleteBooking(placeId : string, resPlaces : ReservePlace[] ) : ReservePlace[]{
    return resPlaces.filter( p => p.placeId !== placeId )
  }
}
