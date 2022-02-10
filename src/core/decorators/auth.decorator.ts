import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JWTAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(...roles: any[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JWTAuthGuard, RolesGuard),
    ApiBearerAuth('Authorization'),
  );
}