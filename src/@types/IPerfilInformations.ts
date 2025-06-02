import { EnumCargos } from "./Enums/Cargos";

export interface IPerfilInformations{
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    cargo: EnumCargos
}
