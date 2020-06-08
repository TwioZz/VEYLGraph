import { Liaison } from './Liaison';
export class Task {
    id: number;
    name: string;
    pos: XY;
    duree: number;
    liaison: Liaison;
    pointDaccrocheEntrant: XY;
    pointDaccrocheSortant: XY;

    constructor(id: number, name: string, duree: number, liaison: Liaison = new Liaison()){
        this.id = id;
        this.name = name;
        this.pos = new XY();
        this.duree = duree;
        this.liaison = liaison;
        this.pointDaccrocheEntrant = new XY();
        this.pointDaccrocheSortant = new XY();
    }
}

export class XY {
    x: number;
    y: number;
}
