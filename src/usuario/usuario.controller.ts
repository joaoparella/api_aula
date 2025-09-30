import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import {v4 as uuid} from 'uuid';
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";
import { RetornoPadraoDTO } from "src/dto/retorno.dto";

@Controller('/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
  constructor(private Usuarios : UsuariosArmazenados){

  }

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO): Promise<RetornoPadraoDTO> {    
    try{
        var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome,dadosUsuario.idade,
                                dadosUsuario.cidade,dadosUsuario.email,
                                dadosUsuario.telefone,dadosUsuario.senha);
        
        
        this.Usuarios.AdicionarUsuario(novoUsuario);
        var retorno = new RetornoPadraoDTO(        
            'Usuário criado com sucesso',
            novoUsuario
        );
        return retorno;
    }
    catch(error){
        throw new InternalServerErrorException('Erro inesperado no servidor');
    }
  }

  @Post('/login')
  async login(@Body() dadosLogin: LoginDTO):Promise<RetornoPadraoDTO>{ 
     try {
        const usuarioLogado = this.Usuarios.loginUsuario(dadosLogin.email, dadosLogin.senha);   
        if(usuarioLogado){
            return new RetornoPadraoDTO(                
                'Login realizado com sucesso',
                usuarioLogado
            );
        }
        return new RetornoPadraoDTO(
            'Email ou senha inválidos',
            null
        );
    } catch (error) {
        
      if(error.message === 'Usuário não encontrado'){
        throw new NotFoundException(`Usuário com email ${dadosLogin.email} não encontrado`);
      }
      throw new InternalServerErrorException('Erro inesperado no servidor');
    }
  }     


  @Get()
  async retornaUsuario(): Promise<ListaUsuarioDTO[]> {

      var usuariosListados = this.Usuarios.Usuarios;
      const ListaRetorno = usuariosListados.map(
          usuario => new ListaUsuarioDTO(
              usuario.id,
              usuario.nome,
              usuario.email
          )
      );
      return ListaRetorno;
  }

  @Put('/:id')
  async alteraUsuario(@Param('id') id: string, @Body() dadosAtualizacao: AlteraUsuarioDTO) {
    try {
      const usuarioAtualizado = await this.Usuarios.atualizaUsuario(id, dadosAtualizacao);
      return new RetornoPadraoDTO(     
          'Usuário atualizado com sucesso',
          usuarioAtualizado
      );
    } catch (error) {
        
      if(error.message === 'Usuário não encontrado'){
        throw new NotFoundException(`Usuário com id ${id} não encontrado`);
      }
      throw new InternalServerErrorException('Erro inesperado no servidor');
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    try {
      const usuarioRemovido = await this.Usuarios.removeUsuario(id);
      return new RetornoPadraoDTO(     
          'Usuário removido com sucesso',
          usuarioRemovido
      );
    } catch (error) {
        if(error.message === 'Usuário não encontrado'){
            throw new NotFoundException(`Usuário com id ${id} não encontrado`);
        }
        throw new InternalServerErrorException('Erro inesperado no servidor');

    }
  }
}