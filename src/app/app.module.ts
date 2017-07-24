import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';

@NgModule({
	declarations: [
		AppComponent,
		ClockComponent
	],
	imports: [
		BrowserModule,
		MaterialModule,
		FormsModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
