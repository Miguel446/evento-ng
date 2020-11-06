import { Participante } from './participante.model';
import { Evento } from './evento.model';

export class Inscricao {

    constructor(
        public id?: number,
        public participante?: Participante,
        public evento?: Evento,
        public status?: boolean,
    ) { }

}