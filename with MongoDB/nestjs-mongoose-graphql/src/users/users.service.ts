import { CrudService } from "../common/services/crud.service";
import { User, UserDocument } from "./users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AuthService } from "../auth/auth.service";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { FileUploadService } from "../common/services/file-upload.service";

@Injectable()
export class UsersService extends CrudService<
  User,
  CreateUserInput,
  UpdateUserInput
> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly fileUploadService: FileUploadService,
  ) {
    super(userModel);
  }

  async create(createDto: CreateUserInput): Promise<User> {
    createDto.password = await this.authService.createPassword(
      createDto.password,
    );
    delete createDto.confirmPassword;
    const newUser = { ...createDto, isActive: true } as any;

    if (createDto.image) {
      newUser.image = await this.fileUploadService.saveFile(createDto.image);
    }

    const user = new this.userModel(newUser);
    try {
      await user.save();
    } catch (e) {
      if (newUser.image) {
        this.fileUploadService.deleteFile(newUser.image);
      }
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await super.findOne({ email });
  }
}
