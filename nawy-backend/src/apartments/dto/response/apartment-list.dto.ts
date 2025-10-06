import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApartmentListResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  unitName: string;

  @ApiProperty()
  unitNumber: string;

  @ApiProperty()
  project: string;

  @ApiPropertyOptional()
  price?: number;

  @ApiPropertyOptional()
  bedrooms?: number;

  @ApiPropertyOptional()
  bathrooms?: number;

  @ApiPropertyOptional()
  area?: number;

  @ApiPropertyOptional()
  floor?: number;

  @ApiProperty()
  isAvailable: boolean;

  @ApiProperty({ type: [String] })
  images: string[];
}
