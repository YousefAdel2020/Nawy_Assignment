import { IsString, IsOptional, IsNotEmpty, IsNumber, IsBoolean, Min, Max, IsArray, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApartmentFormDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  unitName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  project: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  @IsNumber()
  @Min(0)
  @Max(10)
  bedrooms?: number;

  @ApiProperty()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  @IsNumber()
  @Min(0)
  @Max(10)
  bathrooms?: number;

  @ApiProperty()
  @Transform(({ value }) => value ? parseFloat(value) : undefined)
  @IsNumber()
  @Min(0)
  area?: number;

  @ApiProperty()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  @IsNumber()
  @Min(0)
  @Max(100)
  floor?: number;

  @ApiProperty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  @IsBoolean()
  isAvailable?: boolean;
}
