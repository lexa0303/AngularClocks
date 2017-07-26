import {Component, OnInit} from '@angular/core';


@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

	public timer = '00:00:00';
	public timerValue = 0;
	public timeLeft: number;
	private hoursLeft: number;
	private minutesLeft: number;
	private secondsLeft: number;
	public timerActive = false;
	private interval: any;
	public percentLeft: number;
	public displayedColumns = ['timeString', 'last_string', 'average_string'];

	constructor() {
	}

	ngOnInit() {
	}

	updateTimer() {
		this.percentLeft = (this.timeLeft / this.timerValue) * 100;

		this.hoursLeft = Math.floor((this.timeLeft % (60 * 60 * 24)) / (60 * 60));
		this.minutesLeft = Math.floor((this.timeLeft % (60 * 60)) / (60));
		this.secondsLeft = Math.floor((this.timeLeft % (60)));

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

		this.timeLeft  = this.timerValue;
		this.updateTimer();
	}

	startTimer() {
		this.timerActive = true;
		this.interval = setInterval(() => {
			this.timeLeft = this.timeLeft - 0.2;
			this.updateTimer();
			this.checkTimer();
		}, 200);
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
		this.timer = '00:00:00';
		alert('Timer ended');
	}

	checkTimer() {
		if (this.timeLeft <= 0) {
			this.stopTimer();
		}
	}
}
