import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientsFilter'
})
export class FilterPipe implements PipeTransform {


  transform(items: any[], filter: any): any[] {


    if (!items) {
      return [];
    }
    if (!filter) {
      return items;
    }


    return items.filter(item => {
      return (JSON.stringify(item.firstName).toLowerCase().includes(filter.firstName)
        && JSON.stringify(item.lastName).toLowerCase().includes(filter.lastName)
        && JSON.stringify(item.birthdate).toLowerCase().includes(filter.birthdate)
        && JSON.stringify(item.isActive).toLowerCase().includes(filter.isActive));
    });

  }
}



//searchText = searchText.toLowerCase();

//return JSON.stringify(item).toLowerCase().includes(filter.firstName || filter.lastName);

/* return items.filter(item => {
   return JSON.stringify(item).toLowerCase().includes(filter.firstName|| filter.lastName);
 });
}*/


/*transform(items: any[], searchText: string): any[] {

  // filters based on the search text provided; items - list of el to search through

  if (!items) {
    return [];
  }
  if (!searchText) {
    return items;
  }
  searchText = searchText.toLowerCase();

  return items.filter(item => {
    return JSON.stringify(item).toLowerCase().includes(searchText);
  });
}*/


/*

for (let i in searchText){
  lowerCaseSearch.push(searchText[i].toLowerCase());
}

//searchText = searchText.toLowerCase();

return items.filter(item => {
  return JSON.stringify(item).toLowerCase().includes(searchText[0] || searchText[1]);
});*/
