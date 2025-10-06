import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDTO<T> {
  @IsArray()
  @ApiProperty({ isArray: true, type: Object })
  readonly data: T[];

  @ApiProperty({ description: 'Total number of records', example: 150 })
  readonly totalRecords: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  readonly page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  readonly limit: number;

  @ApiProperty({ description: 'Total number of pages', example: 15 })
  readonly totalPages: number;

  constructor(data: T[], totalRecords: number, page: number, limit: number) {
    this.data = data;
    this.totalRecords = totalRecords;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(totalRecords / limit);
  }
}