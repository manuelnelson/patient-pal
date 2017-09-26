export class FileHolder{
    public pending: boolean = false;
    public serverResponse: { status: number, _body: any };
}