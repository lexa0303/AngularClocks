import {Component} from '@angular/core';

@Component({
	selector: 'app-clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.css']
})
export class ClockComponent {

	private time = new Date().toLocaleString();

	constructor() {
	}

	ngOnInit() {
		setInterval(() => {
			this.time = (new Date()).toLocaleString();
		}, 1000);
	}

}
