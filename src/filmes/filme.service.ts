import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FILME } from "./filme.entity";
import { criaFilmeDTO } from "./dto/filme.dto";
import { RetornoPadraoDTO } from "src/dto/retorno.dto";
import {v4 as uuid} from 'uuid';
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";
import { GENERO } from "src/genero/genero.entity";
import { GeneroService } from "src/genero/genero.service";

@Injectable()
export class FilmeService {
    constructor(
        @Inject('FILME_REPOSITORY')
        private filmeRepository: Repository<FILME>,
        @Inject('GENERO_REPOSITORY')
        private generoRepository: Repository<GENERO>,
        private generoService: GeneroService,
    ) {}

    async inserir(dados: criaFilmeDTO): Promise<RetornoPadraoDTO> {
        let filme = new FILME();
        filme.ID = uuid();
        filme.NOME = dados.NOME;
        filme.DURACAO = dados.DURACAO;
        filme.SINOPSE = dados.SINOPSE;
        filme.ANO = dados.ANO;
        filme.genero = await this.generoService.localizaNome(dados.GENERO);

        return this.filmeRepository.save(filme)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: filme.ID,
                message: "Filme criado com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao inserir Filme:',error.message);
        });
    }

    async remover(id: string): Promise<RetornoPadraoDTO> {
        const filme =  await this.localizaID(id);

        return this.filmeRepository.remove(filme)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: filme.ID,
                message: "Filme Excluido com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao excluir filme:',error.message);
        });
    }

    async localizaID(id: string): Promise<FILME> {
        const filme = await this.filmeRepository.findOne({
            where: { ID: id },
        });
        if (!filme) {
            throw new Error('Filme não encontrado');
        }
        return filme
    }

    async alterar(id: string, dados: alteraFilmeDTO): Promise<RetornoPadraoDTO> {
        const filme = await this.localizaID(id);

        Object.entries(dados).forEach(
            ([chave, valor]) => {
                if(chave === 'id')  return;
                else if(chave === 'GENERO'){
                    //Alterando o gênero do filme
                    this.generoService.localizaNome(valor).then( genero => {
                        filme.genero = genero;
                    });
                    return;
                }
                filme[chave] = valor;
            }
        );

            return this.filmeRepository.save(filme)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: filme.ID,
                message: "Filme alterado com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao alterar filme:',error.message);
        });
    }

    async listarTodos(): Promise<FILME[]> {    
        return this.filmeRepository.find();
    }
}