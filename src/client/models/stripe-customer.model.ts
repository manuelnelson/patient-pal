import {StripeSource, StripeSubscription} from '../models'

export class StripeCustomer {
    id: String;
    email: String;
    account_balance: number;
    sources: {
        data: Array<StripeSource>
    }
    subscriptions: {
        data: Array<StripeSubscription>
    }

}