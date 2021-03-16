import { AuditActionType } from "../entities/Audit";
import { StoreSet, useDecorators } from "@tsed/core";
import { UseAfter } from "@tsed/common";
import { AuditMiddleware } from "../middlewares/AuditMiddleware";

export function UseAudit(...types: AuditActionType[]) {
  return useDecorators(
    UseAfter(AuditMiddleware),
    StoreSet(AuditMiddleware, types)
  );
}
