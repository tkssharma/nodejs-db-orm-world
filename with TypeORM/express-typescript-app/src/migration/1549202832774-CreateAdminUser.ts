import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../app/modules/entities/User';

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User();
    user.username = 'admin';
    user.email = 'admin';
    user.password = 'wertyhgjnbvcsaQWERTYUJHGBVCAqwertyuhjnbvcxsaqw45rtyhgbvcxz';
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> { }
}
