import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IExpenses } from './expenses.interface';

@Injectable()
export class ExpensesService {
  private expenses = [
    { id: 1, name: 'tupli', category: 'shopping', price: 300 },
    { id: 2, name: 'chalagaji', category: 'food', price: 300 },
    { id: 3, name: 'rdzis nawarmi', category: 'dairy', price: 300 },
  ];

 
  getAll(query): IExpenses[] {
    const { name, category, price, id } = query;

   
    return this.expenses.filter((el) => {
      return (
        (!category || el.category === category) &&
        (!price || el.price === +price) &&
        (!id || el.id === +id) &&
        (!name || el.name.includes(name)) 
      );
    });
  }

  
  getById(id: number): IExpenses {
    const expense = this.expenses.find((el) => el.id === id);
    if (!expense) throw new NotFoundException(`this id not found`);
    return expense;
  }

  
  create(body, headers) {
    
    if (!headers.password || headers.password !== 'gela123')
      throw new BadRequestException('Invalid password');

    const { name, category, price } = body;

    
    if (!name || !category || !price)
      throw new BadRequestException('all field required');

    
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;

    const newExpense = {
      id: lastId + 1,
      name,
      category,
      price,
    };

    this.expenses.push(newExpense);
    return newExpense;
  }
}