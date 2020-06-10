import { Liaison } from './Liaison';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
export class Task {
    id: number;
    name: string;
    pos: XY;
    duree: number;
    liaison: Liaison;
    pointDaccrocheEntrant: XY;
    pointDaccrocheSortant: XY;

    constructor(id: number, name: string, duree: number){
        this.id = id;
        this.name = name;
        this.pos = new XY();
        this.duree = duree;
        this.liaison = new Liaison();
        this.pointDaccrocheEntrant = new XY();
        this.pointDaccrocheSortant = new XY();
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

    calculateEndTime() {
        return this.calculateStartTime() + this.duree;
    }

    calculateStartTime() {
        let startTime = 0;
        if (this.calculateMaxDistance() !== 0) {
            this.liaison.entrant.forEach((task: Task) => {
                const maxCurrentTask = task.calculateEndTime() ;
                if (maxCurrentTask > startTime) {
                    startTime = maxCurrentTask;
                }
            });
        }
        return startTime;
    }

    getAllExcludedTask(): Task[] {
      const excludedTask: Task[] = this.liaison.entrant;
      excludedTask.forEach((task: Task) => {
        const currentTaskEntrante = task.getAllExcludedTask();
        currentTaskEntrante.forEach((parentTask: Task) => {
          excludedTask.push(parentTask);
          parentTask.liaison.sortant.forEach((cousinTask: Task) => {
            excludedTask.push(cousinTask);
          });
        });
      });
      return excludedTask;
    }
}

export class XY {
    x: number;
    y: number;
}
