import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { LoyaltyCardsModule } from './loyalty-cards/loyalty-cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'postgres'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USER', 'fidelity'),
        password: config.get('DB_PASSWORD', 'fidelity'),
        database: config.get('DB_NAME', 'fidelity'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENV') !== 'production',
      }),
    }),
    AuthModule,
    UsersModule,
    EstablishmentsModule,
    LoyaltyCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
