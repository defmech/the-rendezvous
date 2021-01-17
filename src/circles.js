import { Math as MathUtils } from 'three';
const COLORS = ['#d2a14e', '#cd7986', '#cc6458', '#419682', '#86b4b4', '#9191b6', '#6cb1d2'];

const createjs = window.createjs;

// window.noise.seed(100);

console.log(`window.noise`, window.noise);

const PI2 = Math.PI * 2;

export default class Demo {
	constructor(container) {
		this.container = container;
		// this.capturer = new window.CCapture({ format: 'png', framerate: 60, timeLimit: 3 });

		console.log(`this.capturer`, this.capturer);

		console.log('Demo', this.container);

		// console.dir(window);

		this.init();

		// window.onclick = (event) => {
		// 	// this.attemptFullscreen();
		// 	this.capturer.start();
		// };
		// window.ontouchstart = (event) => {
		// 	this.attemptFullscreen();
		// };

		window.onresize = (event) => {
			this.setScreen();
		};
	}

	setScreen() {
		console.log(`window.innerWidth`, window.innerWidth);
		console.log(`window.innerHeight`, window.innerHeight);

		console.dir(window);

		const { devicePixelRatio, innerWidth, innerHeight } = window;

		this.container.width = innerWidth * devicePixelRatio;
		this.container.height = innerHeight * devicePixelRatio;
		this.container.style.width = innerWidth + 'px';
		this.container.style.height = innerHeight + 'px';

		this.stage.scaleX = devicePixelRatio;
		this.stage.scaleY = devicePixelRatio;
	}

	attemptFullscreen() {
		if (this.container.requestFullscreen) {
			this.container.requestFullscreen();
		} else if (this.container.mozRequestFullScreen) {
			this.container.mozRequestFullScreen();
		} else if (this.container.webkitRequestFullscreen) {
			this.container.webkitRequestFullscreen(this.container.ALLOW_KEYBOARD_INPUT);
		} else if (this.container.msRequestFullscreen) {
			this.container.msRequestFullscreen();
		}
	}

	init() {
		this.stage = new createjs.Stage(this.container);

		this.setScreen();

		this.stage.scaleX = window.devicePixelRatio;
		this.stage.scaleY = window.devicePixelRatio;

		console.dir(this.stage.canvas);

		const main = new createjs.Container();
		// main.shadow = new createjs.Shadow('#2a292699', -10 * sizeScaler, 10 * sizeScaler, 0);
		this.stage.addChild(main);

		// Update

		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener('tick', this.stage);

		// --------------------------------------------------------------------

		// const circle = new createjs.Shape();
		// const radius = this.stage.canvas.offsetWidth / 6;
		// const lookUpRadius = 100;

		const howManyCircles = 15;
		const circles = [];

		console.log(`this.stage.canvas.offsetWidth`, this.stage.canvas.offsetWidth);
		console.log(`this.stage.canvas.clientWidth`, this.stage.canvas.clientWidth);
		console.log(`window.devicePixelRatio`, window.devicePixelRatio);

		for (let index = 0; index < howManyCircles; index++) {
			const circle = new createjs.Shape();
			circle.x = this.stage.canvas.offsetWidth / 2;
			circle.y = this.stage.canvas.offsetHeight / 2;
			main.addChild(circle);

			circles.push({
				circle: circle,
				drawRadius:
					this.stage.canvas.offsetWidth / 3 - MathUtils.mapLinear(index, 0, howManyCircles, 0, 20),
				lookUpRadius: 100 - MathUtils.mapLinear(index, 0, howManyCircles, 0, 20),
			});
		}

		createjs.Ticker.addEventListener('tick', (event) => {
			if (this.capturer) this.capturer.capture(this.container);
			if (!event.paused) {
				// Actions carried out when the Ticker is not paused.

				const now = performance.now();

				for (let index = 0; index < circles.length; index++) {
					const item = circles[index];

					const { circle, drawRadius, lookUpRadius } = item;

					circle.x = this.stage.canvas.offsetWidth / 2;
					circle.y = this.stage.canvas.offsetHeight / 2;

					circle.graphics.clear();
					circle.graphics.setStrokeStyle(1);

					const color = `hsl(${MathUtils.mapLinear(
						index,
						0,
						howManyCircles,
						0,
						360
					)}, 100%, ${MathUtils.mapLinear(index, 0, howManyCircles, 0, 75)}%)`;

					circle.graphics.beginStroke(color);

					const howMany = 180 * 1;
					const distanceMult = this.stage.canvas.offsetWidth / 20;

					for (let index = 0; index < howMany; index++) {
						const angle = (PI2 / howMany) * index;

						const noiseMult = 0.02;
						const noiseSpeedMult = 0.0005;

						const lookupX = Math.sin(angle) * (lookUpRadius * noiseMult);
						const lookupY = Math.cos(angle) * (lookUpRadius * noiseMult);

						const noise = window.noise.simplex3(lookupX, lookupY, now * noiseSpeedMult);

						const random = noise * distanceMult;

						const nextX = Math.cos(angle) * (drawRadius + random);
						const nextY = Math.sin(angle) * (drawRadius + random);
						circle.graphics.lineTo(nextX, nextY);
					}
					circle.graphics.closePath();
					circle.graphics.endStroke();
				}
			}
		});
	}

	getBetween(minMax) {
		return Math.random() * (minMax.max - minMax.min) + minMax.min;
	}

	getRandomColor() {
		const index = Math.floor(Math.random() * COLORS.length);

		return COLORS[index];
	}
}
