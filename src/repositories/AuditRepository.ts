import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";
import { Audit } from "../entities/Audit";

@EntityRepository(Audit)
export class AuditRepository extends Repository<Audit> {}
