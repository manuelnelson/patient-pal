import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Error } from '../models';

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
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: error.message });
        setTimeout(()=>{this.subject.next()},this.timeout);
    }

    error(response: Response, keepAfterNavigationChange = false) {
        var error = response.json() as Error;
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: error.message });
        setTimeout(()=>{this.subject.next()},this.timeout);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
