export class Client{
  public id: number;
  public firstName: string;
  public lastName: string;
  public birthDate: string;
  public clientStatus: string;

//TODO replace with empty constructor when http in place
  constructor(id: number, firstName: string, lastName: string, birthDate: string, clientStatus: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.clientStatus = clientStatus;
  }




}
