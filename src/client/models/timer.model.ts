import { Observable, Subscription } from 'rxjs/Rx';
import { AlertService } from '../services';
export class Timer{
    timerObservable: Observable<number>;
    timerSubscription: Subscription;
    existingTimerValue: number;
    timerValue: number;
    totalValue: number;
    stopped: boolean;
    //properties if it's a countdown timer
    isCountdown: boolean;
    interval: number;
    countdownValue: number;
    constructor(private alertService: AlertService){
        this.clear();
    }
    start(){
        this.timerSubscription = this.timerObservable.subscribe(t=>{
            this.timerValue = t;
            this.totalValue = this.timerValue + this.existingTimerValue;
            if(this.isCountdown){
                this.countdownValue = this.interval - this.totalValue;
                if(this.countdownValue <= 0)    {
                    this.alertService.warningMessage("The interval timer has ran out of time");
                    this.stop();
                }            
            }
        });
        this.stopped = false;
    }
    initializeCountdownTimer(interval:number){
        this.isCountdown = true;
        this.interval = interval;
        this.countdownValue = interval;

    }
    stop(){
        this.stopped = true;
        this.existingTimerValue = this.timerValue;        
        this.timerSubscription.unsubscribe();        
    }
    clear(){
        this.timerValue = 0;
        this.totalValue = 0;
        this.existingTimerValue = 0;
        this.countdownValue = 0;
        this.stopped = true;
    }
}