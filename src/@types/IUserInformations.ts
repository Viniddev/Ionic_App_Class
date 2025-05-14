import { FormGroup } from "@angular/forms";

export interface IUserInformations{
    nome: string;
    email:string;
    cpf:string;
    telefone:string;
}

export function MapUserInformations(UserInformations: FormGroup){
    return {
        nome: UserInformations.get("nome").value || '',
        email: UserInformations.get("email").value || '',
        cpf: UserInformations.get("cpf").value || '',
        telefone: UserInformations.get("telefone").value || ''
    }
}