import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { GENERO } from "./genero.entity";
import {v4 as uuid} from 'uuid';
import { RetornoPadraoDTO } from "src/dto/retorno.dto";
import { AlteraGeneroDTO } from "./dto/alteraGenero.dto";
import { CriaGeneroDTO } from "./dto/criaGenero.dto";

@Injectable()
export class GeneroService {
    constructor(
        @Inject('GENERO_REPOSITORY')
        private generoRepository: Repository<GENERO>,
    ) {

    }

    async localizaID(id: string): Promise<GENERO> {
        const genero = await this.generoRepository.findOne({
            where: { ID: id },
        });
        if (!genero) {
            throw new Error('Gênero não encontrado');
        }
        return genero
    }

    async localizaNome(nome: string): Promise<GENERO> {
        const genero = await this.generoRepository.findOne({
            where: { NOME: nome },
        });
        if (!genero) {
            throw new Error('Gênero não encontrado');
        }
        return genero
    }

    async BuscaGenero(nome: string): Promise<boolean> {
        const genero = await this.generoRepository.findOne({
            where: { NOME: nome },
        });
        return genero?true:false;
    }

    async listarTodos(): Promise<GENERO[]> {    
        return this.generoRepository.find();
    }



    async remover(id: string): Promise<RetornoPadraoDTO> {
        const genero =  await this.localizaID(id);

        return this.generoRepository.remove(genero)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: genero.ID,
                message: "Gênero Excluido com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao excluir gênero:',error.message);
        });
    }

    async alterar(id: string, dados: AlteraGeneroDTO): Promise<RetornoPadraoDTO> {
        const genero = await this.localizaID(id);

        Object.entries(dados).forEach(
            ([chave, valor]) => {
                if(chave === 'id')  return;
                genero[chave] = valor;
            }
        );

         return this.generoRepository.save(genero)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: genero.ID,
                message: "Gênero alterado com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao alterar gênero:',error.message);
        });
    }

    async inserir(dados: CriaGeneroDTO): Promise<RetornoPadraoDTO> {
        let genero = new GENERO();
        genero.ID = uuid();
        genero.NOME = dados.NOME;
        genero.DESCRICAO = dados.DESCRICAO;

        return this.generoRepository.save(genero)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: genero.ID,
                message: "Gênero criado com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao inserir gênero:',error.message);
        });
    }
}