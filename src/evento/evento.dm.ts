import { EventoEntity } from "./evento.entity";


export class EventosArmazenados{
    #eventos: EventoEntity[] = [];  

    adicionarEvento(evento: EventoEntity){
        this.#eventos.push(evento);
    }   

    get eventos(): EventoEntity[]{
        return this.#eventos;
    }
}