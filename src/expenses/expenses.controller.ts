import { Body, Controller, Get, Headers, Param, ParseIntPipe, Query,Post, BadRequestException } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { QueryParamsPipe } from './pipes/query.pipe';
import { query } from 'express';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}
  @Get()
  getAll(@Query(new QueryParamsPipe) query,@Headers('authorization') token: string) {
    console.log(query, 'category');
    if(!token || token !=="lashas tokeni"){
      throw new BadRequestException("its nnot valid token")
    }
    
    return this.expensesService.getAll(query);
  }
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id) {
    console.log(+id, 'id');
    return this.expensesService.getById(id);
  }
  @Post()
  create(@Body() body,@Headers() headers){
    console.log(body,"body")
    console.log(headers,"headers")

  }
}
