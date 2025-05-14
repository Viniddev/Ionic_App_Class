import { FormGroup } from "@angular/forms";

export interface ICredentials {
  email: string;
  password: string;
}

export function MapUserCredentials(cadastroInformations: FormGroup){
  return {
    email: cadastroInformations.get("email").value || '',
    password: cadastroInformations.get("password").value  || '',
  }
}