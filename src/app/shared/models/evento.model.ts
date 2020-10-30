export class Evento {

    constructor(
        public nome: string,
        public local: string,
        public dataInicial: string,
        public dataFinal: string,
        public status?: boolean,
        public id?: number,
    ) { }

}