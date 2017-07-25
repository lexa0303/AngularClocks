import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MD_PLACEHOLDER_GLOBAL_OPTIONS} from '@angular/material';


import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { TimerComponent } from './timer/timer.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';

@NgModule({
	declarations: [
		AppComponent,
		ClockComponent,
		TimerComponent,
		StopwatchComponent
	],
	imports: [
		BrowserModule,
		MaterialModule,
		FormsModule,
		BrowserAnimationsModule
	],
	providers: [
		{provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: { float: 'always' }}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
