import { EndpointInfo, IMiddleware, Middleware, Req } from "@tsed/common";
import { AuditRepository } from "../repositories/AuditRepository";
import { Inject } from "@tsed/di";
import { Audit, AuditActionType } from "../entities/Audit";

@Middleware()
export class AuditMiddleware implements IMiddleware {
  @Inject()
  private repo: AuditRepository;
  async use(
    @Req() request: Req,
    @EndpointInfo() endpoint: EndpointInfo
  ): Promise<any> {
    const [type] = endpoint.get<AuditActionType[]>(AuditMiddleware),
      audit = new Audit();
    audit.type = type;
    if (type === AuditActionType.VIEW_PRODUCT) {
      audit.data = request.param("id");
    } else {
      // @ts-ignore
      audit.data = JSON.stringify(request.ormQuery);
    }
    await this.repo.save(audit);
  }
}
