import { Component, Input } from "@angular/core";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { FilterService, BaseFilterCellComponent } from "@progress/kendo-angular-grid";

@Component({
    selector: "dropdown-filter",
    template: `
    <kendo-dropdownlist 
      [data]="data"
      (valueChange)="onChange($event)" 
      [defaultItem]="defaultItem"
      [value]="selectedValue" 
      [valuePrimitive]="true"
      [textField]="textField"
      [valueField]="valueField">
    </kendo-dropdownlist>
  `
})
export class DropdownListFilterComponent extends BaseFilterCellComponent {

    public get selectedValue(): any {
        const filter = this.filterByField(this.valueField);
        return filter ? filter.value : null;
    }

    @Input() public filter: CompositeFilterDescriptor;
    @Input() public data: any[];
    @Input() public textField: string;
    @Input() public valueField: string;
    @Input() public filterValue: string;
    
    public get defaultItem(): any {
        return {
            [this.textField]: "All",
            [this.valueField]: null
        };
    }

    constructor(filterService: FilterService) {
        super(filterService);
    }

    public onChange(value: any): void {
        this.applyFilter(
            value === null ? // value of the default item
                this.removeFilter(this.filterValue) : // remove the filter 
                this.updateFilter({ // add a filter for the field with the value
                    field: this.filterValue,
                    operator: "eq",
                    value: value
                })
        ); // update the root filter
    }    
}
