import {
  Controller,
  Get,
  PathParams,
  QueryParams,
  Req,
  UseBefore,
} from "@tsed/common";
import { QueryBuilderMiddleware } from "../middlewares/QueryBuilderMiddleware";
import { Inject } from "@tsed/di";
import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../entities/Product";
import { Description, Returns, Summary } from "@tsed/schema";
import { NotFound } from "@tsed/exceptions";
import { UseAudit } from "../decorators/UseAudit";
import { AuditActionType } from "../entities/Audit";

@Controller("/products")
export class ProductController {
  @Inject()
  private productRepo: ProductRepository;

  @Get("/")
  @Summary("Get all products")
  @Description(
    "For more information about query building, visit [https://github.com/rjlopezdev/typeorm-express-query-builder](https://github.com/rjlopezdev/typeorm-express-query-builder)"
  )
  @UseBefore(QueryBuilderMiddleware)
  @UseAudit(AuditActionType.SEARCH)
  @(Returns(200, Array).Of(Product))
  get(@Req() req: Req, @QueryParams("query") query: string) {
    // @ts-ignore
    return this.productRepo.find(req.ormQuery);
  }

  @Get("/:id")
  @UseAudit(AuditActionType.VIEW_PRODUCT)
  @Returns(200, Product)
  @Returns(404, NotFound)
  getOne(@PathParams("id") id: string) {
    try {
      return this.productRepo.findOne(id);
    } catch {
      throw new NotFound("Product not found");
    }
  }
}
