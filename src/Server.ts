import { Env } from "@tsed/core";
import { Configuration, Inject, InjectorService } from "@tsed/di";
import { $log, PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/typeorm";
import typeormConfig from "./config/typeorm";
import "./interfaces";
import { exec } from "child_process";
import { promisify } from "util";
import { ProductRepository } from "./repositories/ProductRepository";
const execAsync = promisify(exec);
//

export const rootDir = __dirname;
export const isProduction = process.env.NODE_ENV === Env.PROD;

if (isProduction) {
  $log.appenders.set("stdout", {
    type: "stdout",
    levels: ["info", "debug"],
    layout: {
      type: "json",
    },
  });

  $log.appenders.set("stderr", {
    levels: ["trace", "fatal", "error", "warn"],
    type: "stderr",
    layout: {
      type: "json",
    },
  });
}

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8081,
  httpsPort: false, // CHANGE
  logger: {
    disableRoutesSummary: isProduction,
  },
  mount: {
    "/rest": [`${rootDir}/controllers/**/*{.js,.ts}`],
  },
  componentsScan: [`${rootDir}/repositories/**/*{.js,.ts}`],
  swagger: [
    {
      path: "/v3/docs",
      specVersion: "3.0.1",
    },
  ],
  typeorm: typeormConfig,
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  @Inject()
  injector: InjectorService;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
  }

  async $onReady(): Promise<void> {
    const repository = this.injector.get<ProductRepository>(ProductRepository)!,
      count = await repository.count();
    if (!count) {
      await execAsync("npm run dev:seeds");
    }
  }
}
