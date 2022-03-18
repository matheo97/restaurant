import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseOrderPipeCustomers implements PipeTransform {
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
export class ParseOrderByPipeCustomers implements PipeTransform {
  transform(value: string): string | null {
    const orderByCustomers = [
      'firstName',
      'lastName',
      'mobile',
      'line1',
      'email',
      'address',
      'city',
      'country',
      'createdAt',
      'updatedAt',
    ];

    if (!value) {
      return null;
    }

    if (orderByCustomers.filter(orderBy => orderBy === value)[0]) {
      return value;
    }

    throw new BadRequestException(
      `OrderBy debe estar includo en esta lista ${orderByCustomers.toString()}`
    );
  }
}
