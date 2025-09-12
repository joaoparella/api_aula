import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { EventoModule } from './evento/evento.module';

@Module({
  imports: [UsuarioModule,EventoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
