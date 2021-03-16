import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Product } from "../entities/Product";

export default class ProductSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Product)().createMany(100);
  }
}
