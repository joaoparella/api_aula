import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EventosArmazenados } from "./evento.dm";
import { criaEventoDTO } from "./dto/criaEvento.dto";
import { EventoEntity } from "./evento.entity";
import {v4 as uuid} from 'uuid';
import { alteraEventoDTO } from "./dto/alteraEvento.dto";
import { ApiTags } from "@nestjs/swagger";
import { HttpModule, HttpService } from "@nestjs/axios";
import { lastValueFrom, map } from "rxjs";

@Controller('/eventos')
@ApiTags('eventos')
export class EventosController {
  constructor(private Eventos : EventosArmazenados, private httpService: HttpService){

  }

  @Put('/:id')
  async atualizaEvento(@Param('id') id: string, @Body() dadosAtualizacao: alteraEventoDTO){
    const eventoAtualizado = await this.Eventos.atualizaEvento(id, dadosAtualizacao);
    return {
        evento: eventoAtualizado,
        message: 'Evento atualizado com sucesso'
    };
  }

  @Delete('/:id')
  async deletaEvento(@Param('id') id: string){
    const eventoRemovido = await this.Eventos.removeEventos(id);
    return {
        evento: eventoRemovido,
        message: 'Evento removido com sucesso'
    };
  }

  @Post()
  async criarEvento(@Body() dadosEvento:criaEventoDTO){
    var retornoCep = await lastValueFrom(this.httpService
        .get(`https://viacep.com.br/ws/${dadosEvento.cep}/json/`)
        .pipe(
            map((response) => response.data)
        )
    );


    var novoEvento = new EventoEntity(uuid(),dadosEvento.nome,dadosEvento.horario,dadosEvento.dia, 
                                    retornoCep.logradouro, dadosEvento.complemento, retornoCep.bairro,
                                    retornoCep.localidade, retornoCep.uf, dadosEvento.cep);
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