import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Error } from '../models';
import {Constants, MessageTypes} from '../constants';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private timeout: number = 6000;
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(response: Response, keepAfterNavigationChange = false) {
        var error = response.json() as Error;
        this.sendMessage(error.message,keepAfterNavigationChange,Constants.MessageTypes.success);
    }

    error(response: Response, keepAfterNavigationChange = false) {
        var error = response.json() as Error;
        this.sendMessage(error.message,keepAfterNavigationChange,Constants.MessageTypes.error);
    }
    warning(response: Response, keepAfterNavigationChange = false) {
        var error = response.json() as Error;
        this.sendMessage(error.message,keepAfterNavigationChange,Constants.MessageTypes.warning);
    }

    errorMessage(message: string, keepAfterNavigationChange = false) {
        this.sendMessage(message,keepAfterNavigationChange,Constants.MessageTypes.error);
    }

    warningMessage(message: string, keepAfterNavigationChange = false) {
        this.sendMessage(message,keepAfterNavigationChange,Constants.MessageTypes.warning);
    }
    successMessage(message: string, keepAfterNavigationChange = false) {
        this.sendMessage(message,keepAfterNavigationChange,Constants.MessageTypes.success);
    }

    sendMessage(message: string, keepAfterNavigationChange = false, messageType: string){        
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: messageType, text: message });
        setTimeout(()=>{this.subject.next()},this.timeout);
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
