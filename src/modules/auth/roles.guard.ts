import { UserRoleType } from '../user/user.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

const RoleGuard = (roles: UserRoleType[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const { user } = context.switchToHttp().getRequest();
      return roles.includes(user?.role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
