import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'dateformatter'
})

export class DateFormatter implements PipeTransform {
    transform(value: Date, ...args: any[]) {
        if(!value)
            return null;
        return new Date(value).toDateString();
    }
}