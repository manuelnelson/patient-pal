export interface AuthUser{
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: number;
    organizationId: string;
    token: string;
}
