import { Liaison } from './Liaison';
export class Task {
    id: string;
    pos: XY;
    duree: number;
    liaison : Liaison;
    pointDaccrocheEntrant: XY;
    pointDaccrocheSortant: XY;

    constructor(id: string, duree: number, liaison: Liaison = new Liaison()){
        this.id = id;
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
