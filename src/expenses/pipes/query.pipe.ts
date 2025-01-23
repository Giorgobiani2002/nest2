import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class QueryParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    const { name, category, price, id } = value;

    const categories = ['shopping', 'food', 'dairy'];

    if (category && !categories.includes(category))
      throw new BadRequestException('wrong category provided');

    if (price && price < 0 && price!==Number)
      throw new BadRequestException('price is more than 0');

    if (id && (Number(id) < 0 || !Number(id)))
      throw new BadRequestException('kskda');

    if (name && typeof name !== 'string')
      throw new BadRequestException('Name must be a string');

    if (name && name.trim().length === 0)
      throw new BadRequestException('Name cannot be empty');

    return value;
  }
}
