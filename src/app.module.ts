import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { EventoModule } from './evento/evento.module';
import { GeneroModule } from './genero/genero.module';
import { FilmeModule } from './filmes/filme.module';

@Module({
  imports: [UsuarioModule,EventoModule,GeneroModule,FilmeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
