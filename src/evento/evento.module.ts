import { Module } from "@nestjs/common";
import { EventosController } from "./evento.controller";
import { EventosArmazenados } from "./evento.dm";
import { DiaValidator } from "src/validacao/dia.validator";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [EventosController],
  providers: [EventosArmazenados,DiaValidator],
})
export class EventoModule {}