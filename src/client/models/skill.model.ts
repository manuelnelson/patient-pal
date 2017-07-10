import { DdtType, TargetType} from '../models';

export class Skill {
    targetName: string;
    goalName: string;
    stimulus: string;
    numberOfTrials:number;
    targetType: TargetType;
    //specific to ddt target type and jump-to
    ddtType: DdtType;
    //specific to target types duration (seconds), fluency/rate (amount), whole/partial interval
    //will always store amount in seconds
    interval: number;
    //specific to quantity target type
    maxThreshold: number;
    //two mastery types, 1 = Automatic, 2 = Manual
    masteryType: number;
    targetInstructions: string;
}
