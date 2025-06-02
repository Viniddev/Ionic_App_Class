import { EnumCargos } from "src/@types/Enums/Cargos";
import { IPerfilInformations } from "src/@types/IPerfilInformations";

export const ProfileInfo: IPerfilInformations = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    cargo: EnumCargos.Garcom
}
