import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import {v4 as uuid} from 'uuid';
import { CriaUsuarioDTO } from "./dto/criaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {
  constructor(private Usuarios : UsuariosArmazenados){

  }

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {    
    var novoUsuario = new UsuarioEntity(uuid(),dadosUsuario.nome,dadosUsuario.idade,
                            dadosUsuario.cidade,dadosUsuario.email,
                            dadosUsuario.telefone,dadosUsuario.senha);
    
    
    this.Usuarios.AdicionarUsuario(novoUsuario);
    var retorno = {
        novoUsuario,
        message: 'Usuário criado com sucesso'
    };
    return retorno;
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
      const usuarioAtualizado = await this.Usuarios.atualizaUsuario(id, dadosAtualizacao);
      return {
          usuario: usuarioAtualizado,
          message: 'Usuário atualizado com sucesso'
      };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
      const usuarioRemovido = await this.Usuarios.removeUsuario(id);
      return {
          usuario: usuarioRemovido,
          message: 'Usuário removido com sucesso'
      };
  }
}