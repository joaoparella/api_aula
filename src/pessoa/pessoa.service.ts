import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { PESSOA } from './pessoa.entity';
import { RetornoPadraoDTO } from 'src/dto/retorno.dto';
import { CriaPessoaDTO } from './dto/criaPessoa.dto';
import { AlteraPessoaDTO } from './dto/alteraPessoa.dto';


@Injectable()
export class PessoaService {
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<PESSOA>,
  ) {}

  async listar(): Promise<PESSOA[]> {
    return this.pessoaRepository.find();
  }

  async inserir(dados: CriaPessoaDTO): Promise<RetornoPadraoDTO>{
    let pessoa = new PESSOA();
        pessoa.ID = uuid();
        pessoa.NOME = dados.NOME;
        pessoa.NASCIMENTO = dados.NASCIMENTO;
        pessoa.PAIS = dados.PAIS;
        

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoPadraoDTO>{
        data: pessoa.ID,
        message: "Pessoa cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoPadraoDTO>{
        data: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }


  async localizarID(id: string): Promise<PESSOA> {
        const genero = await this.pessoaRepository.findOne({
            where: { ID: id },
        });
        if (!genero) {
            throw new Error('PESSOA não encontrado');
        }
        return genero
    }

      async localizarNome(NOME: string): Promise<PESSOA> {
        const genero = await this.pessoaRepository.findOne({
            where: { NOME: NOME },
        });
        if (!genero) {
            throw new Error('PESSOA não encontrado');
        }
        return genero
    }

  async remover(id: string): Promise<RetornoPadraoDTO> {
    const pessoa = await this.localizarID(id);
    
    return this.pessoaRepository.remove(pessoa)
    .then((result) => {
      return <RetornoPadraoDTO>{
        data: pessoa,
        message: "Pessoa excluido!"
      };
    })
    .catch((error) => {
      return <RetornoPadraoDTO>{
        data: pessoa,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraPessoaDTO): Promise<RetornoPadraoDTO> {
    const pessoa = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          pessoa[chave] = valor;
      }
    )

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoPadraoDTO>{
        data: pessoa.ID,
        message: "Pessoa alterado!"
      };
    })
    .catch((error) => {
      return <RetornoPadraoDTO>{
        data: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }
}