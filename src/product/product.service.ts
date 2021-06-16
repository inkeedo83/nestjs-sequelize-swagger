import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return await this.productRepository.create(dto);
  }

  async getByUid(uid: string): Promise<Product> {
    return await this.productRepository.findByPk(uid);
  }

  async update(uid: string, dto: CreateProductDto) {
    return await this.productRepository.update(
      {
        product: dto.product,
        price: dto.price,
        quantity: dto.quantity,
      },
      { where: { uid } },
    );
  }

  async delete(uid: string) {
    return await this.productRepository.destroy({ where: { uid } });
  }

  async getAll(): Promise<Product[]> {
    return await this.productRepository.findAll({ include: { all: true } });
  }
}
