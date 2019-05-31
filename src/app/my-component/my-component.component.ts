import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../pokemon';
import { SharedDataService } from '../shared-data.service';
import {FormControl} from '@angular/forms'
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog} from '@angular/material';
import { AfficheComponent } from '../affiche/affiche.component';


@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  providers: [SharedDataService]
})

export class MyComponentComponent implements OnInit {
  myControl = new FormControl();

  mFilter: string = '';
  mPokemons: Pokemon[] = [];
  filteredOptions : Observable<Pokemon[]>;

  selectedPokemon: Pokemon;
  
  constructor(private service : SharedDataService, public dialog: MatDialog) { }

  execution(){
    console.log(this.mFilter);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AfficheComponent, {
      width: '250px',
      data: this.selectedPokemon
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.service.getPokeList().subscribe(data => {
      this.mPokemons=data;
    }
    );
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Pokemon>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.mPokemons.slice())
      );
  }

  displayFn(user?: Pokemon): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Pokemon[] {
    const filterValue = name.toLowerCase();

    return this.mPokemons.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectionChanged(event$) { 
    this.selectedPokemon = event$.option.value; 
    this.openDialog();
  }
}
