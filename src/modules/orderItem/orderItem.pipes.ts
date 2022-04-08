import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseOrderPipeOrderItems implements PipeTransform {
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
export class ParseOrderByPipeOrderItems implements PipeTransform {
  transform(value: string): string | null {
    const orderByOrderItems = [
      'orderId',
      'itemId',
      'companyId',
      'createdAt',
      'updatedAt',
    ];

    if (!value) {
      return null;
    }

    if (orderByOrderItems.filter(orderBy => orderBy === value)[0]) {
      return value;
    }

    throw new BadRequestException(
      `OrderBy debe estar includo en esta lista ${orderByOrderItems.toString()}`
    );
  }
}
