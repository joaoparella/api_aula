import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";

import { filesProviders } from "./files.providers";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";


@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [...filesProviders,
    FilesService
  ]
})
export class FilesModules {}