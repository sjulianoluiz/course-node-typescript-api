import { ForecastPoint, StormGlass } from '@src/clients/stormGlass';

export enum BeachPosition {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}

export interface Beach {
  name: string;
  user: string;
  latitude: number;
  longitude: number;
  position: BeachPosition;
}

export interface BeachForecast extends Omit<Beach, 'user'>, ForecastPoint {}

export class Forecast {
  constructor(protected stormGlass = new StormGlass()) {}

  public async processForecastForBeaches(beaches: Beach[]): Promise<BeachForecast[]> {
    const pointsWithCorrectSources: BeachForecast[] = [];

    for(const beach of beaches) {
      const points = await this.stormGlass.fetchPoints(beach.latitude, beach.longitude);
      const enrichedBeachData = points.map((point) => ({
        ...{
          latitude: beach.latitude,
          longitude: beach.longitude,
          name: beach.name,
          position: beach.position,
          rating: 1,
        },
        ...point,
      }));

      pointsWithCorrectSources.push(...enrichedBeachData);
    }

    return pointsWithCorrectSources;
  }
}