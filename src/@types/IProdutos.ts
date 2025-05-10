export interface IProdutos{
    id:number;
    nome:string;
    ingredientes:string;
    preco: number;
    quantidade: number;
    categoria: "Bebida" | "Promoção" | "Recomendado";
}