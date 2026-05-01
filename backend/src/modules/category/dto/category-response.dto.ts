// DTO for category response

import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Category ID',
  })
  id!: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Category name',
  })
  name!: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Category description',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    example: 'electronics',
    description: 'Category slug',
    nullable: true,
  })
  slug!: string | null;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Category image URL',
    nullable: true,
  })
  imageUrl?: string | null;

  @ApiProperty({
    example: true,
    description: 'Category status',
  })
  isActive!: boolean;

  @ApiProperty({
    example: 5,
    description: 'Number of products in the category',
  })
  productCount!: number;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'Category creation date',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'Category update date',
  })
  updatedAt!: Date;
}
