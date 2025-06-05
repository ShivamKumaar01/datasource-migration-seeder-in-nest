
// import { Seeder } from '@typeorm-extension/seeder';
import { Seeder, runSeeders } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { faker } from '@faker-js/faker';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(User);

    const users = Array.from({ length: 10 }).map(() =>
      repo.create({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 60 }),
        password: 'abcdef', 
        gender: faker.helpers.arrayElement(['m', 'f', 'u']),
      }),
    );

    await repo.save(users);
  }
}
