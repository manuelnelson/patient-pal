import { Injectable } from '@angular/core';
import { CurriculumStore } from './curriculum.store';

@Injectable()
export class Stores {
  constructor( private curriculumStore: CurriculumStore) { }
}

export const STORES = [
  Stores,
  CurriculumStore
];