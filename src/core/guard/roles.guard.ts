import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesList = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const userRole = request.role;

    if (rolesList.includes(userRole)) {
      return true;
    }
    return false;
  }
}
