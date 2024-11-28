import { Schema, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface Task extends Document {
  title: string;
  description: string;
  completed: boolean;
}

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

// DTO para Swagger
export class TaskDto {
  @ApiProperty({ example: 'Comprar pan', description: 'El título de la tarea' })
  title: string;

  @ApiProperty({
    example: 'Comprar pan en la panadería local',
    description: 'Descripción detallada de la tarea',
  })
  description: string;

  @ApiProperty({
    example: false,
    description: 'Si la tarea está completada o no',
    default: false,
  })
  completed: boolean;
}
