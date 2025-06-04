import { User } from "src/user/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder{
   public async run(dataSource:DataSource,factoryManager:SeederFactoryManager):
   Promise<any>{

    const typeRepo=dataSource.getRepository(User)
    const userTypes=await typeRepo.save([
        {}
    ])

    const userFactory=factoryManager.get(User)
    console.log("seeding users");
    const users=await userFactory.saveMany(10)
   }
    
}