import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GeneroService } from './genero.service';
import { GeneroController } from './genero.controller';
import { generoProviders } from './genero.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [GeneroController],
  providers: [
    ...generoProviders,
    GeneroService,
  ],
})
export class GeneroModule {}