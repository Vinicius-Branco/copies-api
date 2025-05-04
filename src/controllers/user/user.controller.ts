import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';

import { User } from '../../entities/user.entity';
import { HttpStatusCode } from '../../enums/status-code.enum';
import { CustomRequest } from '../../interfaces/express.interface';
import { UserRepository } from '../../repositories/user/user.repository';
import { UserService } from '../../services/user/user.service';

interface ErrorResponse {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

@Route('users')
@Tags('Users')
export class UserController extends Controller {
  private userRepository: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  @Post()
  @SuccessResponse(HttpStatusCode.CREATED, 'User created')
  @Response<ErrorResponse>(HttpStatusCode.BAD_REQUEST, 'Bad Request')
  @Response<ErrorResponse>(HttpStatusCode.CONFLICT, 'User already exists')
  public async createUser(
    @Body() userData: CreateUserRequest,
    @Request() req: CustomRequest
  ): Promise<User> {
    const userService = new UserService(this.userRepository, req.logger);
    return userService.createUser(userData);
  }

  @Get('{id}')
  @Security('jwt')
  @SuccessResponse(HttpStatusCode.OK, 'User found')
  @Response<ErrorResponse>(HttpStatusCode.NOT_FOUND, 'User not found')
  @Response<ErrorResponse>(HttpStatusCode.UNAUTHORIZED, 'Unauthorized')
  public async getUserById(@Path() id: string, @Request() req: CustomRequest): Promise<User> {
    const userService = new UserService(this.userRepository, req.logger);
    return userService.getUserById(id);
  }

  @Post('login')
  @SuccessResponse(HttpStatusCode.OK, 'Login successful')
  @Response<ErrorResponse>(HttpStatusCode.UNAUTHORIZED, 'Invalid credentials')
  public async login(
    @Body() credentials: LoginRequest,
    @Request() req: CustomRequest
  ): Promise<LoginResponse> {
    const userService = new UserService(this.userRepository, req.logger);
    return userService.login(credentials.email, credentials.password);
  }
}
