import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentFormDto, ApartmentQueryDto } from './dto/request';
import { ApartmentResponseDto, ApartmentListResponseDto } from './dto/response';
import { PaginatedResponseDTO } from '../common/dto';
import { UploadValidationPipe } from '../pipe/upload-validation/upload-validation.pipe';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create apartment' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateApartmentFormDto,
    description: 'Apartment data with optional images',
  })
  @ApiResponse({ status: 201, type: ApartmentResponseDto })
  @UseInterceptors(FilesInterceptor('images', 5))
  async create(
    @Body() createApartmentDto: CreateApartmentFormDto,
    @UploadedFiles(UploadValidationPipe) images?: Express.Multer.File[],
  ): Promise<ApartmentResponseDto> {
    return this.apartmentsService.create(createApartmentDto, images);
  }

  @Get()
  @ApiOperation({ summary: 'Get apartments' })
  @ApiResponse({ status: 200, type: PaginatedResponseDTO<ApartmentListResponseDto> })
  async findAll(@Query() query: ApartmentQueryDto): Promise<PaginatedResponseDTO<ApartmentListResponseDto>> {
    return this.apartmentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment by ID' })
  @ApiResponse({ status: 200, type: ApartmentResponseDto })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string): Promise<ApartmentResponseDto> {
    return this.apartmentsService.findOne(id);
  }
}
