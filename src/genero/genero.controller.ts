import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GENERO } from './genero.entity';
import { CriaGeneroDTO } from './dto/criaGenero.dto';
import { AlteraGeneroDTO } from './dto/alteraGenero.dto';
import { RetornoPadraoDTO } from 'src/dto/retorno.dto';



@Controller('/genero')
export class GeneroController {
    constructor(private readonly generoService: GeneroService) {}

    @Get('listar')
    async listar(): Promise<GENERO[]> {
        return this.generoService.listarTodos();
    }

    @Post('')
    async criaGenero(@Body() dados: CriaGeneroDTO): Promise<RetornoPadraoDTO> {
        return this.generoService.inserir(dados);
    }

    @Put(':id')
    async alterarGenero(@Body() dados: AlteraGeneroDTO, @Param('id') id: string): Promise<RetornoPadraoDTO> {
        return this.generoService.alterar(id, dados);
    }

    @Delete(':id')
    async removerGenero(@Param('id') id: string): Promise<RetornoPadraoDTO> {
        return this.generoService.remover(id);
    }
}