import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './tickets/tickets.module';
import { Ticket } from './tickets/entities/ticket.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'data.sqlite',
            entities: [Ticket],
            // only dev
            synchronize: true,
        }),
        TicketsModule,
    ],
})
export class AppModule {}
