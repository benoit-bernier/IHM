import { Component, OnInit, Inject} from '@angular/core';
import {Pokemon} from '../pokemon';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ApiGetterService } from '../api-getter.service';



@Component({
  selector: 'app-affiche',
  templateUrl: './affiche.component.html',
  styleUrls: ['./affiche.component.css'],
  providers: [ApiGetterService]
})
export class AfficheComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AfficheComponent>,
    @Inject(MAT_DIALOG_DATA) public mPok: Pokemon, private service : ApiGetterService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
  ngOnInit() {
    if (!this.mPok.stats){
      this.service.getPokemon(this.mPok.name).subscribe(
        (e:any) => {
          let mPoke = new Pokemon();
          mPoke.height = e.height;
          mPoke.weight = e.weight;
          mPoke.id = e.id;
          mPoke.moves = e.moves;
          mPoke.name = e.name;
          mPoke.order = e.order;
          mPoke.species = e.species;
          mPoke.sprites = e.sprites;
          mPoke.url = this.mPok.url;
          mPoke.types=[];
          e.types.forEach(mType => {
            mPoke.types.push(mType.type.name)
          });
          console.log(mPoke.types)
          mPoke.stats = new Map<string, number>();
          e.stats.forEach(mStat => {
            mPoke.stats.set(mStat.stat.name, mStat.base_stat);
          });
          this.mPok=mPoke;
        }
      )
      
    }
  }

}
