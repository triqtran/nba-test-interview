import { Controller, Get } from "@tsed/common";
import { Returns, Summary } from "@tsed/schema";
import { Audit } from "../entities/Audit";
import { Inject } from "@tsed/di";
import { AuditRepository } from "../repositories/AuditRepository";

@Controller("/audit")
export class AuditController {
  @Inject()
  private repo: AuditRepository;

  @Get("/")
  @Summary("List all audits")
  @(Returns(200, Array).Of(Audit))
  get() {
    return this.repo.find();
  }
}
