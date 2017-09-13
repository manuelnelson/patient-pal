import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import Dictionary from '../helpers/IDictionary';
import { AlertService } from '../services';
import { Timer } from '../models'
@Injectable()
export class TimerService {
    constructor(private alertService: AlertService) { }

    timers: Dictionary<Timer> = {};
    addTimer(identifier: string){
        let timer = new Timer(this.alertService);
        timer.timerObservable = Observable.timer(0,1000);
        this.timers[identifier] = timer;
        return timer;
    }
    getTimer(identifier: string){
        return this.timers[identifier];        
    }

    removeTimer(identifier: string){
        this.timers[identifier] = null;        
    }
}
