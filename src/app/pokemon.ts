export class Pokemon {
    id : number;
    name: string;
    url: string;
    height : number;
    order: number;
    weight:number;
    moves:any[];
    sprites:string;
    species:string[];
    stats:Map<string, number>;
    types:string[];
 
    constructor()
    constructor(name:string, url:string)
    constructor(name: string, url: string, id: number, height: number,order: number, weight:number, moves:any[], sprites:string)
    constructor(name?: string, url?: string, id?: number, height?: number,order?: number, weight?:number, moves?:any[], sprites?:string){
        this.name=name;
        this.url=url;
        this.id=id;
        this.height=height;
        this.order=order;
        this.weight=weight;
        this.moves=moves;
        this.sprites=sprites;
    };

}
