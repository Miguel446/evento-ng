import { Participante } from './participante.model';
import { Evento } from './evento.model';

export class Inscricao {

    constructor( 
        public participante: Participante,
        public evento: Evento,
        public status?: boolean,
        public id?: number
    ) { }

}