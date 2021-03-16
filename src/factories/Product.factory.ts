import { Product } from "../entities/Product";
import { define } from "typeorm-seeding";
import * as Faker from "faker";

define(Product, (faker: typeof Faker) => {
  const product = new Product();
  product.name = faker.commerce.productName();
  product.brand = faker.company.companyName();
  product.color = faker.commerce.color();
  // noinspection PointlessArithmeticExpressionJS
  product.price = ((faker.commerce.price(100, 1000) as unknown) as number) * 1;
  return product;
});
