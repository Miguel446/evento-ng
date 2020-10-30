import { Categoria } from './categoria.model';
import { Empresa } from './empresa.model';

export class Participante {

    constructor(
        public nome: string,
        public cracha: string,
        public cpf: string,
        public cep: string,
        public endereco: string,
        public bairro: string,
        public cidade: string,
        public estado: string,
        public empresa: Empresa,
        public categoria: Categoria,
        public status?: boolean,
        public id?: number,
    ) { }

}