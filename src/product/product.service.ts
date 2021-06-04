import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return await this.productRepository.create(dto);
  }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.findByPk(id);
  }

  async update(id: number, dto: CreateProductDto) {
    return await this.productRepository.update(
      {
        product: dto.product,
        price: dto.price,
      },
      { where: { id } },
    );
  }

  async delete(id: number) {
    return await this.productRepository.destroy({ where: { id } });
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.findAll({ include: { all: true } });
  }
}
