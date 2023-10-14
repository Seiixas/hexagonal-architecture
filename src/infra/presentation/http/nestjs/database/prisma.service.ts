import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.$connect()
      .then(() => {
        this.logger.debug("Connection with postgres database started");
      })
      .catch(() => {
        this.logger.error("Connection with postgres database error");
      });
  }
}
