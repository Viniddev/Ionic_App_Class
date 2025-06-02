import { FormGroup } from "@angular/forms";
import { EnumCargos } from "./Enums/Cargos";

export interface IUserInformations{
    nome: string;
    email:string;
    cpf:string;
    telefone:string;
    cargo: EnumCargos;
}

export function MapUserInformations(UserInformations: FormGroup){
    return {
        nome: UserInformations.get("nome").value || '',
        email: UserInformations.get("email").value || '',
        cpf: UserInformations.get("cpf").value || '',
        telefone: UserInformations.get("telefone").value || '',
        cargo: UserInformations.get("cargo").value || EnumCargos.Garcom,
    }
}
