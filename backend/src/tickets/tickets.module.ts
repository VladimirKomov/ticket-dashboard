import { Module } from '@nestjs/common';
import { TicketsService } from './services/tickets.service';
import { TicketsController } from './controllers/tickets.controller';
import {SeedService} from "./seed/seed.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ticket} from "./entities/ticket.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketsService, SeedService],
  controllers: [TicketsController]
})
export class TicketsModule {}
