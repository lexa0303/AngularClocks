import {Component, OnInit} from '@angular/core';


@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

	private timer = '00:00:00';
	private timerValue = 0;
	private timeLeft: number;
	private hoursLeft: number;
	private minutesLeft: number;
	private secondsLeft: number;
	private timerActive = false;
	private interval: any;

	constructor() {
	}

	ngOnInit() {
	}

	updateTimer() {
		this.hoursLeft = Math.floor((this.timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		this.minutesLeft = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		this.secondsLeft = Math.floor((this.timeLeft % (1000 * 60)) / 1000);

		const hours = (this.hoursLeft.toString().length < 2) ? `0${this.hoursLeft.toString()}` : this.hoursLeft.toString();
		const minutes = (this.minutesLeft.toString().length < 2) ? `0${this.minutesLeft.toString()}` : this.minutesLeft.toString();
		const seconds = (this.secondsLeft.toString().length < 2) ? `0${this.secondsLeft.toString()}` : this.secondsLeft.toString();

		this.timer = `${hours}:${minutes}:${seconds}`;
	}

	setTimer(e) {
		if (this.timerValue < 0) {
			e.preventDefault();
			this.timerValue = 0;
		}

		this.timeLeft  = this.timerValue * 1000;
		this.updateTimer();
	}

	startTimer() {
		this.timerActive = true;
		this.interval = setInterval(() => {
			this.timeLeft = this.timeLeft - 1000;
			this.updateTimer();
			this.checkTimer();
		}, 1000);
	}

	pauseTimer() {
		clearInterval(this.interval);
		this.timerActive = false;
	}

	resetTimer() {
		this.pauseTimer();
		this.timerActive = false;
		this.timerValue = 0;
		this.timeLeft = 0;
		this.updateTimer();
	}

	stopTimer() {
		this.pauseTimer();
		this.timerValue = 0;
		alert('Timer ended');
	}

	checkTimer() {
		if (this.timeLeft <= 0) {
			this.stopTimer();
		}
	}
}
