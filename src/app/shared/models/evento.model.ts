export class Evento {

    constructor(
        public id?: number,
        public nome?: string,
        public local?: string,
        public dataInicial?: string,
        public dataFinal?: string,
        public status?: boolean,
    ) { }

}