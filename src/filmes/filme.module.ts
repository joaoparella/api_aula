//classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
//tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { FilmeController } from './filme.controller';
import { DatabaseModule } from 'src/database/database.module';
import { filmeProviders } from './filme.provider';
import { FilmeService } from './filme.service';
import { generoProviders } from 'src/genero/genero.provider';
import { GeneroService } from 'src/genero/genero.service';
import { GeneroValidator } from 'src/genero/validacao/genero.validator';

@Module({  
  imports: [DatabaseModule],
  controllers: [FilmeController],  
  providers: [
    ...filmeProviders,
    FilmeService,
    ...generoProviders,
    GeneroService,
    GeneroValidator,
  ],
})
export class FilmeModule {}
