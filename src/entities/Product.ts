import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "@tsed/schema";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  @Property()
  id: string;

  @Column()
  @Property()
  name: string;

  @Column()
  @Property()
  brand: string;

  @Column()
  @Property()
  price: number;

  @Column()
  @Property()
  color: string;
}
