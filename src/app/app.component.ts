import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
<!--<app-clients>

</app-clients>-->

<button class="btn btn-block" routerLink="clients-view"></button>
<router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'ClientManagementSystem';
}
