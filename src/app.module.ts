import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { EventoModule } from './evento/evento.module';
import { GeneroModule } from './genero/genero.module';

@Module({
  imports: [UsuarioModule,EventoModule,GeneroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
