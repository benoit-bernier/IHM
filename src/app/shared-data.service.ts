import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from './pokemon';
import { ApiGetterService } from './api-getter.service';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';



@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(private service: ApiGetterService) { }

  getPokeList(): Observable<Pokemon[]> {
    return this.service.getPokemonList(0, 900).pipe(
      map(
        res => {
          return res.results.map(
            item => { return new Pokemon(item.name, item.url) }
          )
        }
      )
    )
  }

  getPokemons(offset, limit): Observable<Pokemon[]> {
    return this.service.getPokemonList(offset, limit).pipe(
      map(
        res => {
          return res.results.map(
            item => {
              return this.service.getPokemon(item.name).pipe(map(data  => {
                var mPoke = new Pokemon();
                mPoke.height = data.height;
                mPoke.weight = data.weight;
                mPoke.id = data.id;
                mPoke.moves = data.moves;
                mPoke.name = data.name;
                mPoke.order = data.order;
                mPoke.species = data.species;
                mPoke.sprites = data.sprites;
                mPoke.url = item.url;
                mPoke.types = data.types;
                mPoke.stats = new Map<string, number>();
                data.stats.forEach(mStat => {
                  mPoke.stats.set(mStat.stat.name, mStat.base_stat);
                });
                console.log(mPoke.toString());
                // Return seems not works
                return mPoke;
              }
              )
              )
            }
          );

        }
      )
    )
  }

}
