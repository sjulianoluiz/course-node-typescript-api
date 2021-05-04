import './util/module-alias';
import { Server } from '@overnightjs/core';
import { urlencoded, json, Application } from 'express';
import { ForecastController } from './controllers/forecast';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(json());
    this.app.use(
      urlencoded({
        extended: true,
      })
    );
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();

    this.addControllers([forecastController]);
  }

  public getApp(): Application {
    return this.app;
  }
}
