import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/items.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private ItemModel: Model<CreateItemDto>) {}

  async findAll(): Promise<Item[]> {
    return await this.ItemModel.find({});
  }

  async findOne(itemId): Promise<Item> {
    return await this.ItemModel.findOne({ _id: itemId });
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.ItemModel(item);
    return await newItem.save();
  }

  async delete(itemId): Promise<Item> {
    return await this.ItemModel.findOneAndDelete({ _id: itemId });
  }

  async update(itemId: string, item: Item): Promise<Item> {
    return await this.ItemModel.findByIdAndUpdate(itemId, item, {
      returnDocument: 'after',
    });
  }
}
