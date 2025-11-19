import { Controller, Get, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { GetItemsDto } from './dto/get-items.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    async getItems(@Query() query: GetItemsDto) {
        return this.itemsService.getItems(query.limit, query.offset);
    }
}
