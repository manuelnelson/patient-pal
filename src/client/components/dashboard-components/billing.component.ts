import { Component, OnInit } from '@angular/core';
import { BillingService, AlertService, AuthenticationService } from '../../services';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {StripeCustomer, StripeSource, StripeSubscription} from '../../models';
import { Constants } from '../../constants';

//import * as Stripe from 'stripe';
@Component({
    selector: 'billing-component',
    template: require('./billing.component.html')
})
export class BillingComponent implements OnInit{
    paymentForm: FormGroup;
    customer: StripeCustomer = new StripeCustomer();
    creditCards: Array<StripeSource>;
    subscription: StripeSubscription;
    showCreditCardForm: boolean = false;
    constants: any;
    style = {
        base: {
          color: '#32325d',
          lineHeight: '24px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };

    constructor(private billingService: BillingService, private authService: AuthenticationService, 
        private alertService: AlertService, private route: ActivatedRoute, private router: Router) 
    {
      this.constants = Constants;
      this.billingService.getCustomer().subscribe(customer => {
            this.customer = customer;
            this.creditCards = this.customer.sources.data.filter(x=> x.object === "card");
            this.subscription = this.customer.subscriptions.data.length > 0 ? this.customer.subscriptions.data[0] : null;
            console.log(this.customer)
          });
    }

    ngOnInit(){
        this.paymentForm = new FormGroup({
        });
        
        let stripe = (<any>window).Stripe('pk_test_0TTtYVeRzuM9YtclkxUw5lZ1');
        //let stripe = Stripe('pk_test_0TTtYVeRzuM9YtclkxUw5lZ1');
        let elements = stripe.elements();
        let card = elements.create('card', {style:this.style});
        card.mount('#card-element');

        ///I know this isn't the most elegant typescript solution...currently not sure how to mix and match the third party library with
        ///angulars incessant mingling in forms
        let form = document.getElementById('payment-form');
        let that = this;
        form.addEventListener('submit', function(event) {
          event.preventDefault();
        
          stripe.createToken(card).then((result:any) => {
            if (result.error) {
              // Inform the user if there was an error
              var errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
                that.billingService.createSource(result.token.id, that.customer.id).subscribe(customer => that.customer = customer);
                console.log(result);
                // this.billingService.
              // Send the token to your server
              //stripeTokenHandler(result.token);
            }
          });
        });
        //console.log(elements);
    }
}
