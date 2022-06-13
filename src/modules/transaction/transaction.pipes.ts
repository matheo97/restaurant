import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseTransactionPipeOrders implements PipeTransform {
  transform(value: string): string | null {
    if (!value) {
      return null;
    }

    if (value.toLowerCase() === 'asc' || value.toLowerCase() === 'desc') {
      return value;
    }

    throw new BadRequestException(
      "Order debe estar incluido en esta lista ['ASC', 'DESC']"
    );
  }
}

@Injectable()
export class ParseTransactionByPipeOrders implements PipeTransform {
  transform(value: string): string | null {
    const orderByTransactions = ['code', 'status', 'createdAt', 'updatedAt'];

    if (!value) {
      return null;
    }

    if (orderByTransactions.filter(orderBy => orderBy === value)[0]) {
      return value;
    }

    throw new BadRequestException(
      `OrderBy debe estar includo en esta lista ${orderByTransactions.toString()}`
    );
  }
}
