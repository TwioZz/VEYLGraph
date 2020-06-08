import { Liaison } from './Liaison';
export class Task {
    id: number;
    name: string;
    pos: XY;
    duree: number;
    liaison: Liaison;
    pointDaccrocheEntrant: XY;
    pointDaccrocheSortant: XY;
    placementVertical: number;

    constructor(id: number, name: string, duree: number){
        this.id = id;
        this.name = name;
        this.pos = new XY();
        this.duree = duree;
        this.liaison = new Liaison();
        this.pointDaccrocheEntrant = new XY();
        this.pointDaccrocheSortant = new XY();
        this.placementVertical = -1;
    }

    calculateMaxDistance(): number {
        let tempDistance = 0;
        this.liaison.entrant.forEach((task: Task) => {
            const distanceParent = task.calculateMaxDistance();
            if(distanceParent >= tempDistance) {
                tempDistance = distanceParent + 1;
            }
        })
        return tempDistance;
    }

    calculateMaxLine(): number { 
        let maxLine = 0;
        this.liaison.entrant.forEach((task: Task) => {
            const maxLineTemp = task.placementVertical;
            console.log(task);
            console.log(maxLineTemp);
            if(maxLineTemp >= maxLine) {
                maxLine = maxLineTemp; 
            }
        })
        return maxLine;
    }
}

export class XY {
    x: number;
    y: number;
}
