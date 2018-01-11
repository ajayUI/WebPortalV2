import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DirectoryViewComponent } from '../pages/directory-view/directory-view.component';
import { EventComponent } from '../pages/event/event.component';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DirectoryViewComponent;

  pages: Array<{ title: string, component: any, icon :string }>;
  selectOptions:Array<{ title: string, subtitle: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Today's events", component: DirectoryViewComponent , icon: "today" },
      { title: "Events calendar", component: EventComponent , icon: "event" },
      { title: 'Campus maps', component: DirectoryViewComponent , icon: "campus"  },
      { title: 'Speak to a representative', component: EventComponent, icon: "representative" },
      { title: 'Send feedback', component: DirectoryViewComponent, icon: "feedback" }
    ];

  //   this.selectOptions = [{
  //     title: 'Pizza Toppings',
  //     subtitle: 'Select your toppings',
  //   },
  //   {
  //     title: 'Bread Toppings',
  //     subtitle: 'Select your toppings',
  //   },
  //   {
  //     title: 'Sauces Toppings',
  //     subtitle: 'Select your toppings',
  //   },
  //   {
  //     title: 'Veggie Toppings',
  //     subtitle: 'Select your toppings',
  //   }
  // ];

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  // compareFn(e1: Page, e2: employee): boolean {
  //   return e1 && e2 ? e1.id === e2.id : e1 === e2;
  // }
}
