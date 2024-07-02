import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from 'rxjs/operators';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon_app';
  loading: boolean = false;
  
  constructor(private spinner: NgxSpinnerService, private _loading: LoadingService) {}

  ngOnInit() {
    /** spinner starts on init */
    console.log()
    this.listenToLoading();
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 1000);

  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
   listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
        // console.log(this.loading);
        this.spinner.show();
      });
  }
}
