import { Faker } from "@faker-js/faker/.";
// import { Group } from "src/group/entities/group.entity";
import { User } from "src/user/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";

export const userFactory=setSeederFactory(User,(faker)=>{
    const user=new User()
    user.name=faker.person.fullName()
    user.email=faker.internet.email()
    // user.age=faker.person.
    user.password=faker.internet.password()
    user.age=faker.number.int({min:18,max:80})
    // const gender=faker.name.gender(true) as "m"|"f"
    // user.gender=faker.name.gender(true)
    user.username=faker.internet.userName()
    user.createdAt=faker.date.anytime()
    user.updatedAt=faker.date.anytime()
    
    return user;
})