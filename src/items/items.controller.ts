import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Request, Response } from 'express';
import { ItemsService } from './items.service';
import { Item } from './interfaces/items.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  //   @Get()
  //   findAll(@Req() req: Request, @Res() res: Response): Response {
  //     console.log(req.url);
  //     return res.status(200).send('hello world');
  //   }

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':itemId')
  async findOne(@Param('itemId') itemId): Promise<Item> {
    return await this.itemsService.findOne(itemId);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Delete(':itemId')
  async removeItem(
    @Param('itemId') itemId,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.itemsService.delete(itemId);
    return res.send('this item is deleted successfully');
  }

  @Put(':itemId')
  async updateItem(
    @Param('itemId') itemId,
    @Body() createItemDto: CreateItemDto,
  ) {
    return await this.itemsService.update(itemId, createItemDto);
  }
}
