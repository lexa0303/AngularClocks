import {Component, OnInit} from '@angular/core';

interface Lap {
	time: number;
	timeString: string;
	average: {
		diff: number,
		string: string,
		positive: boolean
	};
	averageDiffString: string;
	averageDiffPositive: boolean;
	last: {
		diff: number,
		string: string,
		positive: boolean
	};
	lastDiffString: string;
	lastDiffPositive: boolean;
}

@Component({
	selector: 'app-stopwatch',
	templateUrl: './stopwatch.component.html',
	styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

	private lapTime = 0;
	private time = 0;
	public stopwatchTotal = '00:00:00:000';
	public stopwatchLap = '00:00:00:000';
	private hours: number;
	private minutes: number;
	private seconds: number;
	private mseconds: number;
	public active = false;
	private interval: any;
	private stopwatchSpeed = 30;
	public laps = [];
	private lastLap: Lap;
	public averageTime = 0;
	public averageTimeString = '';

	constructor() {
	}

	ngOnInit() {
	}

	private _parseTime(time: number): {time: string, positive: boolean} {
		let positive = true;
		if (time < 0) {
			positive = false;
			time = -time;
		}
		const hoursN = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutesN = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		const secondsN = Math.floor((time % (1000 * 60)) / 1000);
		const msecondsN = Math.floor((time % (1000)));

		const hours = (hoursN.toString().length < 2) ? `0${hoursN.toString()}` : hoursN.toString();
		const minutes = (minutesN.toString().length < 2) ? `0${minutesN.toString()}` : minutesN.toString();
		const seconds = (secondsN.toString().length < 2) ? `0${secondsN.toString()}` : secondsN.toString();
		let mseconds: string;
		if (msecondsN.toString().length === 1) {
			mseconds = `00${msecondsN.toString()}`;
		} else if (msecondsN.toString().length === 2) {
			mseconds = `0${msecondsN.toString()}`;
		} else {
			mseconds = msecondsN.toString();
		}

		return {
			time: `${hours}:${minutes}:${seconds}:${mseconds}`,
			positive: positive
		};
	}

	private _updateTotal() {
		this.stopwatchTotal = this._parseTime(this.time).time;
	}

	private _updateLap() {
		this.stopwatchLap = this._parseTime(this.lapTime).time;
	}

	public start() {
		this.active = true;
		this.interval = setInterval(() => {
			this.time += this.stopwatchSpeed;
			this.lapTime += this.stopwatchSpeed;
			this._updateTotal();
			this._updateLap();
		}, this.stopwatchSpeed);
	}

	public pause() {
		this.active = false;
		clearInterval(this.interval);
	}

	public reset() {
		this.pause();
		this.lapTime = 0;
		this.time = 0;
		this.laps = [];
		this.lastLap = null;
		this.averageTime = 0;
		this.averageTimeString = '';
	}

	public lap() {
		const newLap: Lap = {
			time: this.lapTime,
			timeString: this._parseTime(this.lapTime).time,
			average: {
				diff: 0,
				string: '',
				positive: true
			},
			averageDiffString: '',
			averageDiffPositive: true,
			last: {
				diff: 0,
				string: '',
				positive: true
			},
			lastDiffString: '',
			lastDiffPositive: true
		};
		newLap.time = this.lapTime;
		newLap.timeString = this._parseTime(this.lapTime).time;
		this.laps.unshift(newLap);
		this._countAverage();
		newLap.last.diff = newLap.time - ((this.lastLap && this.lastLap.time) ? this.lastLap.time : 0);
		const lastDiff = this._parseTime(newLap.last.diff);
		newLap.last.string = lastDiff.time;
		newLap.last.positive = lastDiff.positive;
		this.lastLap = newLap;
		this.lapTime = 0;

		console.log(newLap);
	}

	private _countAverage() {
		const totalLapsTime = this.laps.reduce((a, b) => {
			return a + b.time;
		}, 0);
		this.averageTime = totalLapsTime / this.laps.length;
		this.averageTimeString = this._parseTime(this.averageTime).time;
		this.laps.forEach(lap => {
			this._countLapAverage(lap);
		});
	}

	private _countLapAverage(lap: Lap) {
		lap.average.diff = lap.time - this.averageTime;
		const averageDiff = this._parseTime(lap.average.diff);
		lap.average.string = averageDiff.time;
		lap.average.positive = averageDiff.positive;
	}

}
