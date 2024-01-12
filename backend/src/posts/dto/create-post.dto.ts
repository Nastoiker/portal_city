import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  userId?: number;
  @IsString()
  description: string;
  @IsOptional()
  isResolved: boolean;
  @IsOptional()
  @IsString()
  isPublished: boolean;
  @IsOptional()
  @IsString()
  picture?: string;
}
