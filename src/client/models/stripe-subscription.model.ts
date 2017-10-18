export class StripeSubscription {
    id: String;
    current_period_end: Date;
    current_period_start: Date;
    billing: String;
    days_until_due: Number;    
    total_count: Number;    
    object: String;
}