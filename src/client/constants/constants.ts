enum Roles { Admin = 1, Professional = 2, Client = 10};
export class MessageTypes {
    success: string = "success";
    warning: string = "warning";
    error: string = "error";
}

export const Constants = Object.freeze({
    Roles: Roles,
    DateFormat: "MMMM dd",
    TimeFormat: "hh:mm a", 
    DateYearFormat: "MMMM dd, yyyy",
    DateTimeFormat: "MMMM dd, hh:mm a",
    MessageTypes: new MessageTypes()
})
