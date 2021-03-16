import { IMiddleware, Middleware, QueryParams, Req } from "@tsed/common";
//@ts-ignore
import { QueryBuilder } from "typeorm-express-query-builder";
import qs from "qs";

@Middleware()
export class QueryBuilderMiddleware implements IMiddleware {
  use(@Req() req: Req, @QueryParams("query") query: string): any {
    console.log(qs.parse(query));
    const builder = new QueryBuilder(qs.parse(query));
    // @ts-ignore
    req.ormQuery = builder.build();
  }
}
