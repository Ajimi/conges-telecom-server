import { Body, Controller, Get, HttpStatus, Param, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  asyn;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService) {
  }

  @Post('login')
  async loginUser(@Response() res: any, @Body() body: User) {
    if (!(body && body.username && body.password)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
    }

    const user = await this.userService.getUserByUsername(body.username);

    if (user) {
      if (await this.userService.compareHash(body.password, user.passwordHash)) {
        return res.status(HttpStatus.OK).json(await this.authService.createToken(user.id, user.username));
      }
    }

    return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or password wrong!' });
  }

  @Post('register/')
  async registerUser(@Response() res: any, @Body() body: User) {
    if (!(body && body.username && body.password)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
    }

    let user = await this.userService.getUserByUsername(body.username);

    if (user) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username exists' });
    } else {
      user = await this.userService.createUser(body);
      if (user) {
        user.passwordHash = undefined;
      }
    }

    return res.status(HttpStatus.OK).json(user);
  }

  @Get('user/:id')
  async getUser(@Param('id') id) {
    return await this.userService.getUserById(id);
  }

  @Post('register/full')
  async registerFull(@Response() res: any, @Body() body) {
    if (!(body && body.username && body.password)) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
    }

    let user = await this.userService.getUserByUsername(body.username);

    if (user) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username exists' });
    } else {
      user = await this.userService.createUser(body);
      if (user) {
        user.passwordHash = undefined;
        await this.userService.appendHumanResource(user.id, body.humanResourceId);
        await this.userService.appendSupervisor(user.id, body.supervisorId);
      }
    }

    return res.status(HttpStatus.OK).json(user);
  }

  @Post('append/supervisor')
  async appendSupervisorToUser(@Body() body) {
    return await this.userService.appendSupervisor(body.id, body.supervisorId);
  }

  @Post('append/hr')
  async appendHumanResourceToUser(@Body() body) {
    return await this.userService.appendHumanResource(body.id, body.humanResourceId);
  }

  @Post('append/all')
  async appendHumanResourceAndSupervisorToUser(@Body() body) {
    await this.userService.appendSupervisor(body.id, body.supervisorId);
    return await this.userService.appendHumanResource(body.id, body.humanResourceId);
  }

  @Post('solde/:id')
  async modifySolde(@Body() body, @Param('id') id) {
    return await this.userService.modifySolde(id, body.solde);
  }
}
