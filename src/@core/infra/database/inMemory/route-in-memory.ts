import { Route } from "../../../domain/entities/route.entity";
import { RouteRepositoryInterface } from "../../../domain/repositories/route.repository";

export class RouteInMemoryRepository implements RouteRepositoryInterface {
  items: Route[] = [];
  
  async insert(route: Route): Promise<void> {
    this.items.push(route);
  }

  async findAll(): Promise<Route[]> {
    return this.items;
  }

  async findById(id: string): Promise<Route | undefined> {
    return this.items.find(route => route.id === id)
  }
}