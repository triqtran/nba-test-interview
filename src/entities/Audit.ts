import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Property, Required } from "@tsed/schema";

export enum AuditActionType {
  VIEW_PRODUCT = "view-product",
  SEARCH = "search",
}

@Entity()
export class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: AuditActionType, nullable: false })
  @Property()
  @Required()
  type: AuditActionType;

  @Column()
  @Property()
  @Required()
  data: string;

  @Property()
  @CreateDateColumn()
  createdAt: Date;
}
