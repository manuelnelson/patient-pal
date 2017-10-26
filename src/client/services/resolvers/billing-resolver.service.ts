import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, BillingService } from '../../services';
import { StripeCustomer } from '../../models';
@Injectable()
export class BillingResolver implements Resolve<StripeCustomer> {
    constructor(private billingService: BillingService, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<StripeCustomer> {
        return this.billingService.getCustomer().map(customer => customer).toPromise();
    }
}
