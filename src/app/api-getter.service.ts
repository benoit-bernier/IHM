import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiGetterService {

  //TODO : switch to promises

  constructor(private http:HttpClient) { }

  getPokemonList(offset:number, limit:number) : Observable<any>{
    return this.http.get("https://pokeapi.co/api/v2/pokemon/?offset="+offset+"&limit="+limit);
  }

  getPokemon(parameter: String):Observable<any>{
    return (this.http.get("https://pokeapi.co/api/v2/pokemon/"+parameter));
  }
}
