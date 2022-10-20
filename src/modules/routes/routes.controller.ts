import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';

import { ListAllRoutesUseCase } from 'src/@core/app/usecases/list-all-routes.use-case';
import { CreateRouteUseCase } from 'src/@core/app/usecases/create-route.usecase';
import { FindRouteByIdUseCase } from 'src/@core/app/usecases/find-route-byId.use-case';

@Controller('routes')
export class RoutesController {
  //constructor(private readonly routesService: RoutesService) {}

  constructor(
    private createRouteUseCase: CreateRouteUseCase,
    private listAllRoutesUseCase: ListAllRoutesUseCase,
    private findRouteByIdUseCase: FindRouteByIdUseCase,
  ) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.createRouteUseCase.execute(createRouteDto);
  }

  @Get()
  findAll() {
    return this.listAllRoutesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findRouteByIdUseCase.execute(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
  //   return this.routesService.update(+id, updateRouteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.routesService.remove(+id);
  // }
}
