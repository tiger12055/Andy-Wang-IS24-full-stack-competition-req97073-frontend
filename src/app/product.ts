import { Methodology } from './methodology';

export class Product {
    productNumber: number;
    productName: string;
    scrumMaster: string;
    productOwner: string;
    developerNames: string[];
    startDate?: Date;
    methodology: Methodology;
  }