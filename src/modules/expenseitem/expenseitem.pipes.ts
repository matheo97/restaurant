import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseOrderPipeClients implements PipeTransform {
  transform(value: string): string | null {
    if (!value) {
      return null;
    }

    if (value.toLowerCase() === 'asc' || value.toLowerCase() === 'desc') {
      return value;
    }

    throw new BadRequestException(
      "Order must be included in this list ['ASC', 'DESC']"
    );
  }
}

@Injectable()
export class ParseOrderByPipeClients implements PipeTransform {
  transform(value: string): string | null {
    const orderByExpenses = [
      'description',
      'cost',
      'expenseId',
      'createdAt',
      'updatedAt',
    ];

    if (!value) {
      return null;
    }

    if (orderByExpenses.filter(orderBy => orderBy === value)[0]) {
      return value;
    }

    throw new BadRequestException(
      `OrderBy must be included in this list ${orderByExpenses.toString()}`
    );
  }
}
