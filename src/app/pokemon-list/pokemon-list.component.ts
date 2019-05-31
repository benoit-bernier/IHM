import { Component, OnInit } from '@angular/core';
import { ApiGetterService } from '../api-getter.service';
import { MatDialog} from '@angular/material';
import { AfficheComponent } from '../affiche/affiche.component';

import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  providers: [ApiGetterService]
})

export class PokemonListComponent implements OnInit {
  mPokemonList: Pokemon[] = [];
  mMap= new Map();
  constructor(private service: ApiGetterService, public dialog: MatDialog) {}

  openDialog(selectedPokemon : Pokemon): void {
    const dialogRef = this.dialog.open(AfficheComponent, {
      width: '250px',
      data: selectedPokemon
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getPokemons() {
    this.service.getPokemonList(this.mPokemonList.length, 20)
      .subscribe((data: any) => {
        data.results.forEach(element => {
          this.service.getPokemon(element.name).subscribe((e: any) => {
            //console.log(e);
            let mPoke = new Pokemon();
            mPoke.height = e.height;
            mPoke.weight = e.weight;
            mPoke.id = e.id;
            mPoke.moves = e.moves;
            mPoke.name = e.name;
            mPoke.order = e.order;
            mPoke.species = e.species;
            mPoke.sprites = e.sprites;
            mPoke.url = element.url;
            mPoke.types = e.types;
            mPoke.stats = new Map<string, number>();
            e.stats.forEach(mStat => {
              mPoke.stats.set(mStat.stat.name, mStat.base_stat);
            });
            this.mPokemonList.push(mPoke);
          });
        });
        console.log(this.mPokemonList)
        // TODO : patch the sorting function, not displaying as wanted
        this.mPokemonList = this.mPokemonList.sort((t1, t2) => {
          if (t1.id > t2.id) { return 1; }
          if (t1.id < t2.id) { return -1; }
          return 0;
        });
      });
  }

  ngOnInit() {
    this.getPokemons();
  }

}