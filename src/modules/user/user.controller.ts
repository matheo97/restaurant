import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../../entities/User.entity';
import { UserService } from './user.service';
import { DeleteResult } from 'typeorm';
import { UserRoleType } from './user.enum';
import { Request } from 'express';
import { PageResponse } from '../../constants/PageResponse';
import { ParseOrderByPipeUsers, ParseOrderPipeUsers } from './user.pipes';
import RoleGuard from '../auth/roles.guard';
@Controller('/user')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(RoleGuard([UserRoleType.ADMIN]))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get all info of a User based on its Id' })
  @ApiOkResponse({ description: 'All info of a User', type: User })
  async getUserInfoById(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<User> {
    return this.userService.getUserInfoById(id, (user as any).company.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all info of all Users based on its Id' })
  @ApiOkResponse({ description: 'All info of all Users', type: User })
  async find(
    @Req() { user }: Request,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('q') searchCriteria: string,
    @Query('order', ParseOrderPipeUsers) order: 'ASC' | 'DESC',
    @Query('orderBy', ParseOrderByPipeUsers) orderBy: string
  ): Promise<PageResponse<User>> {
    return this.userService.find(
      (user as any).company.id,
      page,
      pageSize,
      searchCriteria,
      order,
      orderBy
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ description: 'User correctly updated', type: User })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: User
  ): Promise<User> {
    return this.userService.update(id, user, (user as any).companyId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user based on User ID' })
  @ApiOkResponse({
    description: 'Delete user based on User ID',
    type: DeleteResult,
  })
  async delete(
    @Req() { user }: Request,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<DeleteResult> {
    return this.userService.delete(id, (user as any).company.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponse({ description: 'User correctly created', type: User })
  async create(
    @Req() { user }: Request,
    @Body() userBody: User
  ): Promise<User> {
    return this.userService.save(userBody, (user as any).company.id);
  }
}
