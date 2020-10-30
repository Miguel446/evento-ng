import { Categoria } from './categoria.model';

export class Empresa {

    constructor(
        public razaoSocial: string,
        public nomeFantasia: string,
        public cnpj: string,
        public cep: string,
        public endereco: string,
        public bairro: string,
        public cidade: string,
        public estado: string,
        public categoria: Categoria,
        public categoriaId: number,
        public id?: number,
    ) { }

}