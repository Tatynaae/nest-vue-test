import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemsRepo: Repository<Item>,
    ) {}

    async getItems(limit: number, offset: number): Promise<Item[]> {
        return this.itemsRepo.find({
            take: limit,
            skip: offset,
            order: { id: 'ASC' },
        });
    }
}
