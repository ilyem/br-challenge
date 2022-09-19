import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PropertyNumberValue, PropertyStringAValue } from '../app.component';

export enum PropertyType {
  STRING = 'string',
  NUMBER = 'number',
}
export interface Property {
  property: string;
  type?: PropertyType;
  value?: { type: string; value: (string | number)[] };
}

export interface Filter {
  type: string;
  properties: Property[];
}

@Injectable()
export class ConfigService {
  filterUrl = 'https://customer-events.herokuapp.com';

  constructor(private http: HttpClient) {}
  searchFilter(): Observable<Filter[]> {
    return this.http
      .get<{ data: { events: Filter[] } }>(this.filterUrl, {})
      .pipe(
        map((response: { data: { events: Filter[] } }) => response.data.events)
      );
  }
}
