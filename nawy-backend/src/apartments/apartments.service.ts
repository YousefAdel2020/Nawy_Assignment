import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApartmentFormDto, ApartmentQueryDto } from './dto/request';
import { ApartmentResponseDto, ApartmentListResponseDto } from './dto/response';
import { PaginatedResponseDTO } from '../common/dto';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import configuration from '../config/configuration';

@Injectable()
export class ApartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createApartmentDto: CreateApartmentFormDto,
    images?: Express.Multer.File[],
  ): Promise<ApartmentResponseDto> {
    try {
      // Create apartment first
      const apartment = await this.prisma.apartment.create({
        data: createApartmentDto,
        include: { images: true },
      });

      // Handle images if provided
      if (images && images.length > 0) {
        await this.saveImages(images, apartment.id);

        // Fetch apartment with images
        const apartmentWithImages = await this.prisma.apartment.findUnique({
          where: { id: apartment.id },
          include: { images: true },
        });

        return this.mapToResponseDto(apartmentWithImages!);
      }

      return this.mapToResponseDto(apartment);
    } catch (error) {
      throw new BadRequestException('Failed to create apartment');
    }
  }

  private async saveImages(
    files: Express.Multer.File[],
    apartmentId: string,
  ): Promise<void> {
    const uploadDir = path.join(process.cwd(), 'uploads');

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const file of files) {
      const fileExtension = path.extname(file.originalname);
      const filename = `${uuid()}${fileExtension}`;
      const filePath = path.join(uploadDir, filename);

      // Save file to disk
      fs.writeFileSync(filePath, file.buffer);

      // Save file info to database
      await this.prisma.apartmentImage.create({
        data: {
          filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: filename,
          apartmentId,
        },
      });
    }
  }

  async findAll(
    query: ApartmentQueryDto,
  ): Promise<PaginatedResponseDTO<ApartmentListResponseDto>> {
    const appConfig = configuration();
    const {
      page = appConfig.pagination.defaultPage,
      take = appConfig.pagination.defaultPageSize,
      sortBy = 'createdAt',
      sortDirection = 'DESC',
    } = query;
    const skip = (page - 1) * take;

    const where = this.buildWhereClause(query);
    const orderBy = { [sortBy]: sortDirection.toLowerCase() };

    const [apartments, total] = await Promise.all([
      this.prisma.apartment.findMany({
        where,
        include: { images: true },
        orderBy,
        skip,
        take,
      }),
      this.prisma.apartment.count({ where }),
    ]);

    const mappedApartments = apartments.map((apartment) =>
      this.mapToListResponseDto(apartment),
    );
    return new PaginatedResponseDTO<ApartmentListResponseDto>(
      mappedApartments,
      total,
      page,
      take,
    );
  }

  async findOne(id: string): Promise<ApartmentResponseDto> {
    const apartment = await this.prisma.apartment.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }

    return this.mapToResponseDto(apartment);
  }

  private buildWhereClause(query: ApartmentQueryDto) {
    const {
      search,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      minArea,
      maxArea,
      isAvailable,
    } = query;

    const where: any = {};

    if (search) {
      where.OR = [
        { unitName: { contains: search, mode: 'insensitive' } },
        { unitNumber: { contains: search, mode: 'insensitive' } },
        { project: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (bedrooms !== undefined) {
      where.bedrooms = bedrooms;
    }

    if (bathrooms !== undefined) {
      where.bathrooms = bathrooms;
    }

    if (isAvailable !== undefined) {
      where.isAvailable = isAvailable;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    if (minArea !== undefined || maxArea !== undefined) {
      where.area = {};
      if (minArea !== undefined) where.area.gte = minArea;
      if (maxArea !== undefined) where.area.lte = maxArea;
    }

    return where;
  }

  private mapToResponseDto(apartment: any): ApartmentResponseDto {
    return {
      id: apartment.id,
      unitName: apartment.unitName,
      unitNumber: apartment.unitNumber,
      project: apartment.project,
      description: apartment.description,
      price: apartment.price,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      area: apartment.area,
      floor: apartment.floor,
      isAvailable: apartment.isAvailable,
      createdAt: apartment.createdAt,
      updatedAt: apartment.updatedAt,
      images: apartment.images?.map((image: any) => image.filename) || [],
    };
  }

  private mapToListResponseDto(apartment: any): ApartmentListResponseDto {
    return {
      id: apartment.id,
      unitName: apartment.unitName,
      unitNumber: apartment.unitNumber,
      project: apartment.project,
      price: apartment.price,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      area: apartment.area,
      floor: apartment.floor,
      isAvailable: apartment.isAvailable,
      images: apartment.images?.map((image: any) => image.filename) || [],
    };
  }
}
