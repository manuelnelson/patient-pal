//this class is needed if there are relationships but we only want to send Id's. Only used for PUT and POST requests
export class MasteredSkill {
    _id: string;
    skill: string;
    client: string;
    curriculum: string;
    numberOfTrials: Number;
    started: Date;
    createdAt: Date;
}
