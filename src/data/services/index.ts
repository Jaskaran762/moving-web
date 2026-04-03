import type { Service } from './types';
import { longDistanceMovingService } from './long-distance-moving';
import { residentialMovingService } from './residential-moving';
import { specialtyItemsService } from './specialty-moving';
import { commercialMovingService } from './commercial-moving';

export const SERVICES: Record<string, Service> = {
  'residential-moving': residentialMovingService,
  'specialty-items': specialtyItemsService,
  'long-distance-moving': longDistanceMovingService,
  'commercial-moves': commercialMovingService,
};
