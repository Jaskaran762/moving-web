import type { Service } from './types';
import { furnitureRemovalService } from './furniture-removal';
import { appliancePickupService } from './appliance-pickup';
import { electronicWasteService } from './electronic-waste';
import { constructionDebrisService } from './construction-debris';
import { householdItemsService } from './household-items';
import { yardWasteService } from './yard-waste';

export const SERVICES: Record<string, Service> = {
  'furniture-removal': furnitureRemovalService,
  'appliance-pickup': appliancePickupService,
  'electronic-waste': electronicWasteService,
  'construction-debris': constructionDebrisService,
  'household-items': householdItemsService,
  'yard-waste': yardWasteService,
};
