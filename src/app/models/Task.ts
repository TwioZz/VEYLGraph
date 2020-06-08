import { Liaison } from './Liaison';
export class Task {
    id: number;
    name: string;
    pos: XY;
    duree: number;
    liaison: Liaison;
    pointDaccrocheEntrant: XY;
    pointDaccrocheSortant: XY;
    nextPlacementVertical: number;

    constructor(id: number, name: string, duree: number){
        this.id = id;
        this.name = name;
        this.pos = new XY();
        this.duree = duree;
        this.liaison = new Liaison();
        this.pointDaccrocheEntrant = new XY();
        this.pointDaccrocheSortant = new XY();
        this.nextPlacementVertical = 0;
    }

    calculateMaxDistance(): number {
        let tempDistance = 0;
        this.liaison.entrant.forEach((task: Task) => {
            const distanceParent = task.calculateMaxDistance();
            if (distanceParent >= tempDistance) {
                tempDistance = distanceParent + 1;
            }
        });
        return tempDistance;
    }

    calculatePlacementVertical(): number {
        let nextPlacementVertical = 0;
        this.liaison.entrant.forEach((taskParent: Task) => {
            taskParent.liaison.sortant.forEach((taskCousin: Task) => {
              const nextPlacementVerticalTemp = taskCousin.nextPlacementVertical;
              if (nextPlacementVerticalTemp >= nextPlacementVertical) {
                nextPlacementVertical = nextPlacementVerticalTemp;
              }
            });
        });
        return nextPlacementVertical;
    }
}

export class XY {
    x: number;
    y: number;
}
