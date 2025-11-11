import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { RetornoPadraoDTO } from "src/dto/retorno.dto";
import { PessoaService } from "./pessoa.service";
import { PESSOA } from "./pessoa.entity";
import { CriaPessoaDTO } from "./dto/criaPessoa.dto";
import { AlteraPessoaDTO } from "./dto/alteraPessoa.dto";



@Controller('/pessoa')
export class PessoaController{
    constructor(private readonly pessoaService: PessoaService){
             
    }

    @Get('')
    async listar(): Promise<PESSOA[]>{
        return this.pessoaService.listar();
    }

    @Post('')
    async criaPessoa(@Body() dados: CriaPessoaDTO): Promise<RetornoPadraoDTO>{        
        return this.pessoaService.inserir(dados)        
    }

    @Put('/:id')
    async alterarPessoa(@Body() dados: AlteraPessoaDTO,@Param('id') id: string): Promise<RetornoPadraoDTO>{        
        return this.pessoaService.alterar(id,dados)        
    }
    
    @Get('/:id')
    async listarID(@Param('id') id: string): Promise<PESSOA>{
        return this.pessoaService.localizarID(id);
    }

    @Delete('/:id')
    async removePessoa(@Param('id') id: string): Promise<RetornoPadraoDTO>{
        return this.pessoaService.remover(id);
    }    

}