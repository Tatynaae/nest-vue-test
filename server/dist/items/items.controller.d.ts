import { ItemsService } from './items.service';
import { GetItemsDto } from './dto/get-items.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    getItems(query: GetItemsDto): Promise<import("./item.entity").Item[]>;
}
