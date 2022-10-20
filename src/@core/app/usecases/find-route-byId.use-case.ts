import { RouteRepositoryInterface } from 'src/@core/domain/repositories/route.repository';

export class FindRouteByIdUseCase {
  constructor(private routeRepo: RouteRepositoryInterface) {}

  async execute(id: string) {
    const findRouteById = await this.routeRepo.findById(id);
    if (!findRouteById) throw new Error('Route not exists!');
    return findRouteById.toJSON();
  }
}
