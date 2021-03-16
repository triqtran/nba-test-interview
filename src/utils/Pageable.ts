import {
  array,
  Default,
  Description,
  For,
  Integer,
  Min,
  oneOf,
  SpecTypes,
  string,
} from "@tsed/schema";
import { OnDeserialize } from "@tsed/json-mapper";
import { isString } from "@tsed/core";

export default class Pageable {
  @Integer()
  @Min(0)
  @Default(0)
  @Description("Page number.")
  page = 0;

  @Integer()
  @Min(1)
  @Default(20)
  @Description("Number of objects per page.")
  size = 20;

  @For(SpecTypes.JSON, oneOf(string(), array().items(string()).maxItems(2))) // v6.11.0
  @For(SpecTypes.OPENAPI, array().items(string()).maxItems(2))
  @For(SpecTypes.SWAGGER, array().items(string()).maxItems(2))
  @OnDeserialize((value: string | string[]) =>
    isString(value) ? value.split(",") : value
  )
  @Description(
    "Sorting criteria: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported."
  )
  sort: string | string[];

  constructor(options: Partial<Pageable>) {
    options.page && (this.page = options.page);
    options.size && (this.size = options.size);
    options.sort && (this.sort = options.sort);
  }

  get offset() {
    return this.page ? this.page * this.limit : 0;
  }

  get limit() {
    return this.size;
  }
}
