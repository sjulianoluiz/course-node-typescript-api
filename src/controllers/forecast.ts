import { Controller, Get } from '@overnightjs/core';
import { Beach } from '@src/models/beach';
import { Forecast } from '@src/services/forecast';
import { Request, Response } from 'express';

const forecastService = new Forecast();

@Controller('forecast')
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(_: Request, res: Response): Promise<void> { // TODO: refatorar para enviar os dados não estáticos
    const beaches = await Beach.find({});
    const forecastData = await forecastService.processForecastForBeaches(beaches);
    res.status(200).send(forecastData);
  }
}
