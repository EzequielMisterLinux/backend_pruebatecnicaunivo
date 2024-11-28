import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { TaskDto } from './models/task.model';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas obtenida correctamente.' })
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente.' })
  async create(@Body() taskDto: TaskDto): Promise<Task> {
    return this.tasksService.create(taskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea existente' })
  @ApiParam({ name: 'id', description: 'ID de la tarea a actualizar' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({ status: 200, description: 'Tarea actualizada exitosamente.' })
  async update(@Param('id') id: string, @Body() taskDto: TaskDto): Promise<Task> {
    return this.tasksService.update(id, taskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea existente' })
  @ApiParam({ name: 'id', description: 'ID de la tarea a eliminar' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada exitosamente.' })
  async delete(@Param('id') id: string): Promise<Task> {
    return this.tasksService.delete(id);
  }
}
