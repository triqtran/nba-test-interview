import {useDecorators} from "@tsed/core";
import {UseBefore} from "@tsed/common";
import {QueryBuilderMiddleware} from "../middlewares/QueryBuilderMiddleware";

export function OrmQueryBuilder(){
    return useDecorators(
        UseBefore(QueryBuilderMiddleware)
    )
}
