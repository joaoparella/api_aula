import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RetornoPadraoDTO } from 'src/dto/retorno.dto';
import { USUARIO } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { AlteraUsuarioDTO } from './dto/alteraUsuario.dto';
import Datas from 'src/utils/datas';
import { PESSOA } from 'src/pessoa/pessoa.entity';
import { PessoaService } from 'src/pessoa/pessoa.service';




@Injectable()
export class USUARIOService {
  objDatas: Datas;
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<USUARIO>,
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<PESSOA>,
    private readonly pessoaService: PessoaService,
  ) {
    this.objDatas = new Datas();
  }

  async listar(): Promise<any[]> {

    var usuarios = await (this.usuarioRepository
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('PS.NOME', 'NOME')
      .addSelect('usuario.foto', 'FOTO')
      .addSelect('usuario.email', 'EMAIL')
      .leftJoin('PESSOA', 'PS', 'usuario.idpessoa = PS.id')
      .getRawMany());
    return usuarios;
  }

  async listarID(ID: string): Promise<any> {

    var usuario = await (this.usuarioRepository
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('PS.NOME', 'NOME')
      .addSelect('usuario.email', 'EMAIL')
      .addSelect('usuario.foto', 'FOTO')
      .leftJoin('PESSOA', 'PS', 'usuario.idpessoa = PS.id')
      .andWhere('usuario.ID = :ID', { ID: `${ID}` })
      .getRawOne());
    return usuario;
  }

  async adicionaAssinatura(id: string, dias: number) {
    const usuario = await this.localizarID(id);

    usuario.ASSINATURA = this.objDatas.adicionarDias(usuario.ASSINATURA, dias);
    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoPadraoDTO>{
          message: "USUARIO alterado!",
          data: usuario.ID
        };
      })
      .catch((error) => {
        return <RetornoPadraoDTO>{
          data: "",
          message: "Houve um erro ao alterar." + error.message
        };
      });
  }

  async inserir(dados: CriaUsuarioDTO): Promise<RetornoPadraoDTO> {
    let usuario = new USUARIO();
    usuario.ID = uuid();

    let retornoPessoa = await this.pessoaService.inserir(dados.PESSOA)
    let pessoa = await this.pessoaService.localizarID(retornoPessoa.data)

    usuario.CIDADE = dados.CIDADE;
    usuario.EMAIL = dados.EMAIL;
    usuario.trocaSenha(dados.SENHA)
    usuario.TELEFONE = dados.TELEFONE;
    usuario.ASSINATURA = this.objDatas.dataAtual();
    usuario.PESSOA = pessoa;
    // usuario.FOTO = dados.FOTO;


    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoPadraoDTO>{
          data: usuario.ID,
          message: "USUARIO cadastrado!"
        };
      })
      .catch((error) => {
        return <RetornoPadraoDTO>{
          data: "",
          message: "Houve um erro ao cadastrar." + error.message
        };
      })


  }



  async localizarID(id: string): Promise<USUARIO> {
        const genero = await this.usuarioRepository.findOne({
            where: { ID: id },
        });
        if (!genero) {
            throw new Error('Usuario não encontrado!');
        }
        return genero
    }

  async retornaAssinatura(ID: string) {
    //aqui é feita a pesquisa do usuário, depois é criado mapeado os dados desse usuário para um retorno padrão (lista usuario DTO)
    var usuario = await this.localizarID(ID);

    var diferenca = this.objDatas.diferencaDias(usuario.ASSINATURA)

    return {
      validadeAssinatura: diferenca
    };
  }




  async localizarEmail(email: string): Promise<USUARIO> {
        const genero = await this.usuarioRepository.findOne({
            where: { EMAIL: email },
        });
        if (!genero) {
            throw new Error('Usuario não encontrado!!');
        }
        return genero
    }


  async Login(email: string, senha: string) {
    //primeiro é pesquisado o usuário por meio do email
    const possivelUsuario = await this.localizarEmail(email)

    return {
      //aqui é validada a senha, caso a senha esteja correta, é retornado os dados do usuário e também o status (true para correto, false para incorreto)
      usuario: possivelUsuario ? (possivelUsuario.login(senha) ? possivelUsuario : null) : null,
      status: possivelUsuario ? possivelUsuario.login(senha): false
    };
  }

  async validaEmail(emailNovo: string) {
    try{
      const possivelUsuario = await this.localizarEmail(emailNovo)
    }
    catch{
        return true;
    }
    finally{
        return false;
    }
    
  }


  async remover(id: string): Promise<RetornoPadraoDTO> {
    const usuario = await this.localizarID(id);
    

    return this.usuarioRepository.remove(usuario)
      .then((result) => {
        return <RetornoPadraoDTO>{
          data: usuario,
          message: "USUARIO excluido!"
        };
      })
      .catch((error) => {
        return <RetornoPadraoDTO>{
          data: usuario,
          message: "Houve um erro ao excluir." + error.message
        };
      });
  }

  async alterar(id: string, dados: AlteraUsuarioDTO): Promise<RetornoPadraoDTO> {
    const usuario = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
        if (chave === 'ID') {
          return;
        }
        else if (chave === 'PESSOA') {
          this.pessoaService.alterar(usuario.IDPESSOA, valor)
        }
        else if( chave === 'SENHA'){
          usuario.trocaSenha(valor);
        }
        else{
          usuario[chave] = valor;
        }
      }
    )

    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoPadraoDTO>{
          data: usuario.ID,
          message: "USUARIO alterado!"
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