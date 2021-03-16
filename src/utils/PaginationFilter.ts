import {
  ResponseFilter,
  ResponseFilterMethods,
  PlatformContext,
} from "@tsed/common";
import Pagination from "./Pagination";

@ResponseFilter("application/json")
export class PaginationFilter implements ResponseFilterMethods {
  transform(data: unknown, ctx: PlatformContext): any {
    if (ctx.data instanceof Pagination) {
      // @ts-ignore
      if (ctx.data.isPaginated) {
        ctx.response.status(206);
      }
    }

    return data;
  }
}
