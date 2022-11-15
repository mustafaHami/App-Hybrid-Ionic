import { Injectable } from '@angular/core';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }
  constructor() {}
  login() {
    this._userIsAuthenticated = true;
  }
  logout() {
    this._userIsAuthenticated = false;
  }
  // Sauvegarde le tableau les personnes dans le local storage
  savePlayers(persons: Person[]){
    window.localStorage.setItem("persons", JSON.stringify(persons));
  }

  // Récupère le tableau de personnes dans le local storage
  getAllPlayers() : Array<any>{ // je met any car le tableau peut être vide
    const stringPersons = window.localStorage.getItem("persons");
    // Si tableau non stocké, on renvoie un tableau vide
    if(stringPersons === null)
        return new Array();
    else 
        return JSON.parse(stringPersons);       
    }
    // Vérification du mot de passe et l'existance de la personne
    verifPassword(login: string, password: string) : String{
      // on parcours toutes les personnes pour voir si la personnes existe, si oui verification de son mot de passe
      for(var person of this.getAllPlayers()){
        if(person.login == login){
          if(person.password = password){
            return "valide"
          }else{
            return "invalide"
          }
        }
      }
      return "inexistant"
    }
    suppPerson(loginpers){
      var persons = this.getAllPlayers().filter(function(p) { return p.login !== loginpers.login}) // on return toutes les personnes sauf la personne à supprimer
      this.savePlayers(persons);
    }

    savePersonConnect(personCo: Person){     
      window.localStorage.setItem("personCo", JSON.stringify(personCo));
    }
    getPersonCo() : Person{
      const stringPerson = window.localStorage.getItem("personCo");
      if(stringPerson === null)
        return new Person("","");
      else 
        return JSON.parse(stringPerson);       
      }   
    }
