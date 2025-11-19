import { Repository } from 'typeorm';
import { Item } from './item.entity';
export declare class ItemsService {
    private readonly itemsRepo;
    constructor(itemsRepo: Repository<Item>);
    getItems(limit: number, offset: number): Promise<Item[]>;
}
