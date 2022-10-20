import { LatLng } from "../../domain/entities/route.entity";
import { RouteRepositoryInterface } from "../../domain/repositories/route.repository"

export class ListAllRoutesUseCase {
  constructor(private routeRepo: RouteRepositoryInterface) {}

  async execute(): Promise<CreateRouteOutput> {
    const routes = await this.routeRepo.findAll();
    return routes.map(route => route.toJSON());
  }
}

type CreateRouteOutput = {
  id: string,
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  paths?: LatLng[];
}[];