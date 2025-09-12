import { Module } from "@nestjs/common";
import { EventosController } from "./evento.controller";
import { EventosArmazenados } from "./evento.dm";

@Module({
  controllers: [EventosController],
  providers: [EventosArmazenados],
})
export class EventoModule {}