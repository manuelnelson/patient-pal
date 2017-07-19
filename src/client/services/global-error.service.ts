import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }
    handleError(error) {
        const location = this.injector.get(LocationStrategy);
        const message = error.message ? error.message : error.toString();
        const url = location instanceof PathLocationStrategy
        ? location.path() : '';
        //TODO - add logging service to log this info to a remote instance - look at using loggly?

        // IMPORTANT: Rethrow the error otherwise it gets swallowed
        throw error;
    }

}
