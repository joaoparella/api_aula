import { Body, Controller, Get, Post } from "@nestjs/common";
import { EventosArmazenados } from "./evento.dm";
import { criaEventoDTO } from "./dto/criaEvento.dto";
import { EventoEntity } from "./evento.entity";
import {v4 as uuid} from 'uuid';

@Controller('/eventos')
export class EventosController {
  constructor(private Eventos : EventosArmazenados){

  }

  @Post()
  async criarEvento(@Body() dadosEvento:criaEventoDTO){
    var novoEvento = new EventoEntity(uuid(),dadosEvento.nome,dadosEvento.dia,dadosEvento.horario);
    this.Eventos.adicionarEvento(novoEvento);
    var retorno = {
        novoEvento,
        message: 'Evento criado com sucesso'
    };
    return retorno;
  }

  @Get()
    async retornaEvento(): Promise<EventoEntity[]> {  
        var eventosListados = this.Eventos.eventos;
        return eventosListados;    
    }

}