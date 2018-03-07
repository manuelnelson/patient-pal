//this class is needed if there are relationships but we only want to send Id's. Only used for PUT and POST requests
export class TargetSummary {
    _id: string;
    name: string;
}
