import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListModule } from './modules/list/list.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name:"default",
      type: "postgres",
      url:process.env.POSTGRES_URL,
      // host: process.env.POSTGRES_HOST,
      // port: parseInt(<string>process.env.POSTGRES_PORT),
      // username: process.env.POSTGRES_USER,
      // password:process.env.POSTGRES_PASSWORD,
      // database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities: ["src/entity/*.*"]
    }),
   ListModule
  ]
})
export class AppModule {}

