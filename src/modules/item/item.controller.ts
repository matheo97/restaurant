import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Item } from '../../../entities/Item.entity';
import { ItemService } from './item.service';

@Controller('/item')
@ApiTags('Items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:itemId')
  @ApiOperation({ summary: 'Get all Item information' })
  @ApiOkResponse({ description: 'All Item information', type: Item })
  async getItemById(
    @Param('itemId', ParseUUIDPipe) itemId: string
  ): Promise<Item> {
    return this.itemService.getItemById(itemId);
  }
}
