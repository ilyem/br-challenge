import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { filter } from 'rxjs';
import { ConfigService, Filter, Property } from './config/config.service';

enum StringOptions {
  equals = 'equals',
  doesNotEqual = 'does not equal',
  contains = 'contains',
  doesNotContain = 'does not contain',
}
enum NumberOptions {
  equals = 'equals',
  inBetween = 'in between',
  lessThan = 'less Than',
  greaterThan = 'greater Than',
}
export type PropertyStringAValue = {
  [key in StringOptions]: string;
};
export type PropertyNumberValue = {
  [key in NumberOptions]: string;
};
type FilterPropertyLookup = {
  [key: string]: string[];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'br-challenge';
  filters: Filter[] = [];
  filterOptions: string[] = [];
  selectedFilterInit: Filter = { type: '', properties: [] };
  selectedFilters: Filter[] = [this.selectedFilterInit];
  filterPropertiesLookup: FilterPropertyLookup = {};
  propertyValuesLookup = {
    string: Object.values(StringOptions),
    number: Object.values(NumberOptions),
  };
  NumberOptions = NumberOptions;
  hovered: string = '';
  propertyHovered: string = '';

  constructor(private configService: ConfigService) {}
  ngOnInit() {
    this.getFilters();
  }

  getFilters(): void {
    this.configService.searchFilter().subscribe((data) => {
      console.log(data);
      this.filters = data;
      this.filterOptions = this.getFilterOptions(data);
      this.filterPropertiesLookup = data.reduce(
        (a, v) => ({
          ...a,
          [v.type]: v.properties.map((prop) => prop.property),
        }),
        {}
      );
    });
  }
  // get options
  getFilterOptions(filters: Filter[]): string[] {
    return filters.map((filter) => filter.type);
  }
  getPropertyOptions(filterType: string) {
    const properties = this.filters.find(
      (filter: Filter) => filter.type == filterType
    )?.properties as Filter['properties'];
    return properties.map((prop) => prop.property);
  }
  getValueOptions(propertyType: string | undefined) {
    return Object.values(
      propertyType == 'string' ? StringOptions : NumberOptions
    );
  }
  // handlers
  handleFilterSelect(type: string, index: number) {
    this.selectedFilters[index] = { type, properties: [] };
  }
  handleAddAttribute(index: number) {
    this.selectedFilters[index].properties.push({ property: '' });
  }
  handleAttributeSelect(
    event: string,
    filterType: string,
    filterIndex: number,
    propertyIndex: number
  ) {
    const propertyType = this.filters
      .find((filter: Filter) => filter.type == filterType)
      ?.properties.find((prop) => prop.property == event)?.type;
    const valueType = this.getValueOptions(propertyType)[0];
    const selectedProperty: Property = {
      property: event,
      type: propertyType,
      value: { type: valueType, value: [] },
    };
    this.selectedFilters[filterIndex].properties[propertyIndex] =
      selectedProperty;
  }
  handleValueOptionSelect(
    event: string,
    filterIndex: number,
    propertyIndex: number
  ) {
    const propValue =
      this.selectedFilters[filterIndex].properties[propertyIndex].value;
    if (propValue) {
      propValue.type = event;
    }
  }

  handleAddFilter() {
    this.selectedFilters.push({ type: '', properties: [] });
  }

  handleFilterSearch(event: any) {
    const allFilters = this.getFilterOptions(this.filters);
    console.log(event?.target?.value);
    this.filterOptions = allFilters.filter((option) =>
      option.includes(event?.target?.value)
    );
  }
  handlePropertySearch(event: any, filterType: string) {
    console.log(event.target.value, filterType);
    const searchTerm = event.target.value;
    const properties = this.getPropertyOptions(filterType);
    this.filterPropertiesLookup[filterType] = properties.filter((prop) =>
      prop.includes(searchTerm)
    );
  }
  handleAddValue(event: any) {
    console.log(event);
  }
  handleAddNumberValue(event: any, value: (string | number)[]) {
    console.log(value, event);
    value.push(event);
  }
  handleApplyFilters() {
    console.log(this.selectedFilters);
  }
  handleCopyFilter(index: number) {
    const clone = JSON.parse(JSON.stringify(this.selectedFilters[index]));
    this.selectedFilters.push(clone);
  }
  handleDeleteFilter(index: number) {
    this.selectedFilters.splice(index, 1);
  }
  handlePropertyDelete(filterIndex: number, propertyIndex: number) {
    this.selectedFilters[filterIndex].properties.splice(propertyIndex, 1);
  }
  handleDiscardFilters() {
    this.selectedFilters = [this.selectedFilterInit];
  }
}
