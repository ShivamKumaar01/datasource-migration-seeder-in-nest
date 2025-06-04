import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserSeeder {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async seed() {
        const users:User[]=[]
        for (let i = 0; i < 30; i++) {
            const user:User = new User();
            user.name = faker.person.fullName()
            user.email = faker.internet.email()
            // user.age=faker.person.
            user.password = faker.internet.password()
            user.age = faker.number.int({ min: 18, max: 80 })
            user.username = faker.internet.username()
            user.gender='m'
            users.push(user);
        }
        await this.userRepository.save(users);
    }
}
  // "seed:run": "ts-node ./node_modules/typeorm-seeding/dist/cli.js seed -n src/config/typeorm.config-migrations.ts"


//   import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// // import { User } from '../../users/entities/user.entity';
// import { Repository } from 'typeorm';
// import { faker } from '@faker-js/faker';
// import { User } from 'src/user/entities/user.entity';
// import { Product } from 'src/product/entities/product.entity';

// @Injectable()
// export class productSeeder {
//     constructor(
//         @InjectRepository(Product)
//         private readonly userRepository: Repository<Product>,
//     ) { }

//     async seed() {
//         const products = [];
//         for (let i = 0; i < 30; i++) {
//             const product = new Product();
//          product.id=faker.number.int()
//          product.productName=faker.commerce.productName()
//          product.price=faker.commerce.price()
//             // users.push(user);
//             products.push(product)
//         }
//         // await this.userRepository.save(users);
//     }
// }