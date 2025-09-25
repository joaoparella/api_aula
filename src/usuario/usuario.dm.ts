import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuariosArmazenados{
    #usuarios: UsuarioEntity[] = [];  

    AdicionarUsuario(usuario: UsuarioEntity){
            this.#usuarios.push(usuario);
        
    }

    async validaEmail(email: string): Promise<boolean>{
        const usuarioEncontrado = this.#usuarios.find(u => u.email === email);
        return usuarioEncontrado !== undefined;
    }

    private BuscaPorID(id: string): UsuarioEntity {
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if (!possivelUsuario) {
            throw new Error('Usuário não encontrado');
        }
        return possivelUsuario;
    }
    
    private BuscaPorEmail(email: string): UsuarioEntity {
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.email === email
        );

        if (!possivelUsuario) {
            throw new Error('Usuário não encontrado');
        }
        return possivelUsuario;
    }


    loginUsuario(email: string, senha: string): UsuarioEntity | null {
        const possivelUsuario = this.BuscaPorEmail(email);

        if(possivelUsuario && possivelUsuario.login(senha)){
            return possivelUsuario;
        }
        return null;

    }

    async removeUsuario(id: string) {
        const usuario = this.BuscaPorID(id);

        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );

        return usuario;
    }
 
    async atualizaUsuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>) {
        var possivelUsuario = this.BuscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }else if (valor === undefined) {
                    return;

                }else if (chave === 'senha' && typeof valor === 'string') {
                    possivelUsuario.trocarSenha(valor);
                    return;
                }
                possivelUsuario[chave] = valor;
            }
        );

        return possivelUsuario;
    }

    get Usuarios(){        
        return this.#usuarios;
    }
}