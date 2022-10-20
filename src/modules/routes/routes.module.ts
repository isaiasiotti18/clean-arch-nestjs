import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { CreateRouteUseCase } from 'src/@core/app/usecases/create-route.usecase';
import { RouteInMemoryRepository } from 'src/@core/infra/database/inMemory/route-in-memory';
import { RouteRepositoryInterface } from 'src/@core/domain/repositories/route.repository';
import { ListAllRoutesUseCase } from 'src/@core/app/usecases/list-all-routes.use-case';
import { FindRouteByIdUseCase } from 'src/@core/app/usecases/find-route-byId.use-case';

@Module({
  controllers: [RoutesController],
  providers: [
    RoutesService,
    {
      provide: RouteInMemoryRepository,
      useClass: RouteInMemoryRepository,
    },
    {
      provide: CreateRouteUseCase,
      useFactory: (routeRepository: RouteRepositoryInterface) => {
        return new CreateRouteUseCase(routeRepository);
      },
      inject: [RouteInMemoryRepository],
    },
    {
      provide: RouteInMemoryRepository,
      useClass: RouteInMemoryRepository,
    },
    {
      provide: ListAllRoutesUseCase,
      useFactory: (routeRepository: RouteRepositoryInterface) => {
        return new ListAllRoutesUseCase(routeRepository);
      },
      inject: [RouteInMemoryRepository],
    },
    {
      provide: FindRouteByIdUseCase,
      useFactory: (routeRepository: RouteRepositoryInterface) => {
        return new FindRouteByIdUseCase(routeRepository);
      },
      inject: [RouteInMemoryRepository],
    },
  ],
})
export class RoutesModule {}
