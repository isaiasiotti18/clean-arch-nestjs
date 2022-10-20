import { RouteTypeOrmRepository } from './../../@core/infra/database/typeorm/route-typeorm.repository';
import { RouteSchema } from './../../@core/infra/database/typeorm/route.schema';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { CreateRouteUseCase } from 'src/@core/app/usecases/create-route.usecase';
import { RouteInMemoryRepository } from 'src/@core/infra/database/inMemory/route-in-memory';
import { RouteRepositoryInterface } from 'src/@core/domain/repositories/route.repository';
import { ListAllRoutesUseCase } from 'src/@core/app/usecases/list-all-routes.use-case';
import { FindRouteByIdUseCase } from 'src/@core/app/usecases/find-route-byId.use-case';
import { DataSource } from 'typeorm';
import { Route } from 'src/@core/domain/entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteSchema])],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide: RouteTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new RouteTypeOrmRepository(dataSource.getRepository(Route));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: RouteInMemoryRepository,
      useClass: RouteInMemoryRepository,
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (routeRepository: RouteRepositoryInterface) => {
        return new CreateRouteUseCase(routeRepository);
      },
      inject: [RouteTypeOrmRepository],
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (routeRepository: RouteRepositoryInterface) => {
        return new ListAllRoutesUseCase(routeRepository);
      },
      inject: [RouteTypeOrmRepository],
    },
    {
      provide: FindRouteByIdUseCase,
      useFactory: (routeRepository: RouteRepositoryInterface) => {
        return new FindRouteByIdUseCase(routeRepository);
      },
      inject: [RouteTypeOrmRepository],
    },
  ],
})
export class RoutesModule {}
