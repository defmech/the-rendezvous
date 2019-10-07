import { Math as MathUtils } from "three";
const COLORS = [
	"#d2a14e",
	"#cd7986",
	"#cc6458",
	"#419682",
	"#86b4b4",
	"#9191b6",
	"#6cb1d2",
];
const speed = { min: 1, max: 4 };

const createjs = window.createjs;

const sizeScaler = 0.75;

const howMany = {
	wiggles: MathUtils.randInt(5, 10),
	circles: MathUtils.randInt(5, 10),
	squares: MathUtils.randInt(5, 10),
	triangles: MathUtils.randInt(5, 10),
	capsules: MathUtils.randInt(5, 10),
	zaggles: MathUtils.randInt(5, 10),
};

export default class Demo {
	constructor(container) {
		this.container = container;
		this.container.width = window.innerWidth;
		this.container.height = window.innerHeight;
		console.log("Demo", this.container);

		this.wiggles = [];
		this.circles = [];
		this.squares = [];
		this.triangles = [];
		this.capsules = [];
		this.zaggles = [];

		console.dir(window);
		this.init();

		window.onclick = event => {
			this.attemptFullscreen();
		};
		window.ontouchstart = event => {
			this.attemptFullscreen();
		};

		window.onresize = event => {
			this.container.width = window.innerWidth;
			this.container.height = window.innerHeight;

			if (this.grid) this.stage.removeChild(this.grid);

			this.grid = this.getGrid();
			this.stage.addChildAt(this.grid, 0);
		};
	}

	attemptFullscreen() {
		if (this.container.requestFullscreen) {
			this.container.requestFullscreen();
		} else if (this.container.mozRequestFullScreen) {
			this.container.mozRequestFullScreen();
		} else if (this.container.webkitRequestFullscreen) {
			this.container.webkitRequestFullscreen(
				this.container.ALLOW_KEYBOARD_INPUT
			);
		} else if (this.container.msRequestFullscreen) {
			this.container.msRequestFullscreen();
		}
	}

	init() {
		this.stage = new createjs.Stage(this.container);

		console.dir(this.stage.canvas);

		this.grid = this.getGrid();
		this.stage.addChild(this.grid);

		const main = new createjs.Container();
		main.shadow = new createjs.Shadow(
			"#2a292699",
			-10 * sizeScaler,
			10 * sizeScaler,
			0
		);
		this.stage.addChild(main);

		// Wiggle

		(() => {
			// return;

			for (let index = 0; index < howMany.wiggles; index += 1) {
				const sizeB = Math.round(MathUtils.randInt(4, 8));
				const wiggle = this.getWiggle(sizeB);
				wiggle.x = Math.random() * this.stage.canvas.offsetWidth;
				wiggle.y = Math.random() * this.stage.canvas.offsetHeight;

				wiggle.vec = {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1,
				};

				wiggle.speed = MathUtils.randInt(speed.min, speed.max);

				main.addChild(wiggle);

				this.wiggles.push(wiggle);
			}
		})();
		// Zaggle

		(() => {
			// return;

			for (let index = 0; index < howMany.zaggles; index += 1) {
				const iterations = Math.round(MathUtils.randInt(4, 8));
				const zaggle = this.getZaggle(iterations);
				zaggle.x = Math.random() * this.stage.canvas.offsetWidth;
				zaggle.y = Math.random() * this.stage.canvas.offsetHeight;

				zaggle.vec = {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1,
				};

				zaggle.speed = MathUtils.randInt(speed.min, speed.max);

				main.addChild(zaggle);

				this.zaggles.push(zaggle);
			}
		})();

		// Squares

		(() => {
			// return;

			for (let index = 0; index < howMany.squares; index += 1) {
				const square = this.getSquare(MathUtils.randInt(10, 60));
				square.x = Math.random() * this.stage.canvas.offsetWidth;
				square.y = Math.random() * this.stage.canvas.offsetHeight;

				square.vec = {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1,
				};
				square.speed = MathUtils.randInt(speed.min, speed.max);

				main.addChild(square);

				this.squares.push(square);
			}
		})();

		// Circles

		(() => {
			// return;

			for (let index = 0; index < howMany.circles; index += 1) {
				const circle = this.getCircle(MathUtils.randInt(10, 60));
				circle.x = Math.random() * this.stage.canvas.offsetWidth;
				circle.y = Math.random() * this.stage.canvas.offsetHeight;

				circle.vec = {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1,
				};
				circle.speed = MathUtils.randInt(speed.min, speed.max);
				circle.seed = Math.random();

				main.addChild(circle);

				this.circles.push(circle);
			}
		})();

		// Triangles

		(() => {
			// return;

			for (let index = 0; index < howMany.triangles; index += 1) {
				const triangle = this.getTriangle(MathUtils.randInt(20, 60));
				triangle.x = Math.random() * this.stage.canvas.offsetWidth;
				triangle.y = Math.random() * this.stage.canvas.offsetHeight;

				triangle.vec = {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1,
				};
				triangle.speed = MathUtils.randInt(speed.min, speed.max);
				triangle.seed = Math.random();

				main.addChild(triangle);

				this.triangles.push(triangle);
			}
		})();

		// Capsule

		(() => {
			for (let index = 0; index < howMany.capsules; index += 1) {
				const capsule = this.getCapsule(MathUtils.randInt(30, 60));
				capsule.x = Math.random() * this.stage.canvas.offsetWidth;
				capsule.y = Math.random() * this.stage.canvas.offsetHeight;

				capsule.vec = {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1,
				};
				capsule.speed = MathUtils.randInt(speed.min, speed.max);
				capsule.seed = Math.random();

				main.addChild(capsule);

				this.capsules.push(capsule);
			}
		})();

		// Update

		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", this.stage);

		createjs.Ticker.addEventListener("tick", event => {
			if (!event.paused) {
				// Actions carried out when the Ticker is not paused.

				const toAnimate = [
					this.circles,
					this.squares,
					this.capsules,
					this.triangles,
					this.wiggles,
					this.zaggles,
				];

				toAnimate.forEach(group => {
					group.forEach(item => {
						item.x += item.vec.x * item.speed;
						item.y += item.vec.y * item.speed;

						if (
							item.x < -item.radius ||
							item.x > this.stage.canvas.offsetWidth + item.radius
						) {
							item.vec.x *= -1;
						}

						if (
							item.y < -item.radius ||
							item.y > this.stage.canvas.offsetHeight + item.radius
						) {
							item.vec.y *= -1;
						}

						item.rotation =
							(Math.atan2(item.vec.y, item.vec.x) * 180) / Math.PI;
					});
				});
			}
		});
	}

	getBetween(minMax) {
		return Math.random() * (minMax.max - minMax.min) + minMax.min;
	}

	getGrid() {
		const gridGap = this.stage.canvas.offsetWidth / 25;

		const grid = new createjs.Shape();
		grid.graphics.setStrokeStyle(1);
		grid.graphics.beginStroke("#2a292699");

		for (
			let index = 0;
			index < this.stage.canvas.offsetWidth;
			index += gridGap
		) {
			grid.graphics.moveTo(index, 0);
			grid.graphics.lineTo(index, this.stage.canvas.offsetHeight);
		}

		for (
			let index = 0;
			index < this.stage.canvas.offsetHeight;
			index += gridGap
		) {
			grid.graphics.moveTo(0, index);
			grid.graphics.lineTo(this.stage.canvas.offsetWidth, index);
		}

		return grid;
	}

	getCircle(radius = 20, stroke = 2) {
		const shape = new createjs.Shape();
		shape.graphics.beginFill("#2a2926");
		shape.graphics.drawCircle(0, 0, radius);

		shape.radius = radius;

		shape.graphics.beginFill(this.getRandomColor());
		shape.graphics.drawCircle(0, 0, radius - stroke);

		shape.scaleX = shape.scaleY = sizeScaler;

		return shape;
	}

	getSquare(radius = 20, stroke = 4) {
		const shape = new createjs.Shape();
		shape.graphics.beginFill("#2a2926");
		shape.graphics.drawRect(0, 0, radius * 2, radius * 2);

		shape.radius = radius * 1.4142;

		shape.graphics.beginFill(this.getRandomColor());
		shape.graphics.drawRect(
			0 + stroke / 2,
			0 + stroke / 2,
			radius * 2 - stroke,
			radius * 2 - stroke
		);

		shape.regX = shape.regY = radius * sizeScaler;

		shape.rotation = Math.random() * 360;

		shape.scaleX = shape.scaleY = sizeScaler;

		return shape;
	}

	getCapsule(length = 40) {
		const shape = new createjs.Shape();

		shape.graphics.ss(30, 1);
		shape.graphics.beginStroke(`#2a2926`);
		shape.graphics.moveTo(0, 0);
		shape.graphics.lineTo(length, 0);

		shape.graphics.ss(26, 1);
		shape.graphics.beginStroke(this.getRandomColor());
		shape.graphics.moveTo(0, 0);
		shape.graphics.lineTo(length, 0);

		shape.radius = shape.regX = ((length + 30) / 2) * sizeScaler;

		shape.scaleX = shape.scaleY = sizeScaler;

		return shape;
	}

	getTriangle(radius = 20) {
		const shape = new createjs.Shape();
		shape.radius = radius * sizeScaler;

		const sector = (Math.PI * 2) / 3;

		shape.graphics.beginFill("#2a2926");
		shape.graphics.moveTo(radius * Math.cos(0), radius * Math.sin(0));
		shape.graphics.lineTo(radius * Math.cos(sector), radius * Math.sin(sector));
		shape.graphics.lineTo(
			radius * Math.cos(sector * 2),
			radius * Math.sin(sector * 2)
		);
		shape.graphics.lineTo(radius * Math.cos(0), radius * Math.sin(0));

		const innerRadius = radius - 4;

		shape.graphics.beginFill(this.getRandomColor());
		shape.graphics.moveTo(innerRadius * Math.cos(0), innerRadius * Math.sin(0));
		shape.graphics.lineTo(
			innerRadius * Math.cos(sector),
			innerRadius * Math.sin(sector)
		);
		shape.graphics.lineTo(
			innerRadius * Math.cos(sector * 2),
			innerRadius * Math.sin(sector * 2)
		);
		shape.graphics.lineTo(innerRadius * Math.cos(0), innerRadius * Math.sin(0));

		shape.scaleX = shape.scaleY = sizeScaler;

		return shape;
	}

	getWiggle(iterations = 4) {
		const shape = new createjs.Shape();

		const curveHeight = 40;
		const gap = 40;

		const points = [];

		for (let index = 0; index < iterations; index++) {
			points.push({ x: gap * (index + 1), y: 0 });
		}

		// Base

		shape.graphics.ss(20, 1);
		shape.graphics.beginStroke(`#2a2926`);

		shape.graphics.moveTo(0, 0);

		points.forEach((point, index) => {
			const prevX = index === 0 ? 0 : points[index - 1].x;

			const deltaX =
				index === 0 ? point.x : points[index].x - points[index - 1].x;

			const dir = index % 2 === 0 ? -1 : 1;

			shape.graphics.bezierCurveTo(
				prevX + deltaX * 0.25,
				curveHeight * dir,
				prevX + deltaX * 0.75,
				curveHeight * dir,
				point.x,
				point.y
			);
		});

		// Color
		shape.graphics.ss(14, 1);
		shape.graphics.beginStroke(this.getRandomColor());

		shape.graphics.moveTo(0, 0);

		points.forEach((point, index) => {
			const prevX = index === 0 ? 0 : points[index - 1].x;

			const deltaX =
				index === 0 ? point.x : points[index].x - points[index - 1].x;

			const dir = index % 2 === 0 ? -1 : 1;

			shape.graphics.bezierCurveTo(
				prevX + deltaX * 0.25,
				curveHeight * dir,
				prevX + deltaX * 0.75,
				curveHeight * dir,
				point.x,
				point.y
			);
		});

		shape.radius = shape.regX = gap * (iterations / 2) * sizeScaler;

		shape.scaleX = shape.scaleY = sizeScaler;

		return shape;
	}

	getZaggle(iterations = 4) {
		const shape = new createjs.Shape();

		const height = 20;
		const gap = 40;

		const points = [];

		for (let index = 0; index < iterations; index++) {
			points.push({ x: gap * (index + 1), y: 0 });
		}

		// Base

		shape.graphics.ss(20, 2);
		shape.graphics.beginStroke(`#2a2926`);

		shape.graphics.moveTo(0, 0);

		points.forEach((point, index) => {
			const prevX = index === 0 ? 0 : points[index - 1].x;

			const deltaX =
				index === 0 ? point.x : points[index].x - points[index - 1].x;

			const dir = index % 2 === 0 ? -1 : 1;

			shape.graphics.lineTo(
				prevX + deltaX * 0.5,
				height * dir,
				point.x,
				point.y
			);
			shape.graphics.lineTo(point.x, point.y);
		});

		// Color
		shape.graphics.ss(14, 2);
		shape.graphics.beginStroke(this.getRandomColor());

		shape.graphics.moveTo(0, 0);

		points.forEach((point, index) => {
			const prevX = index === 0 ? 0 : points[index - 1].x;

			const deltaX =
				index === 0 ? point.x : points[index].x - points[index - 1].x;

			const dir = index % 2 === 0 ? -1 : 1;

			shape.graphics.lineTo(
				prevX + deltaX * 0.5,
				height * dir,
				point.x,
				point.y
			);
			shape.graphics.lineTo(point.x, point.y);
		});

		shape.radius = shape.regX = gap * (iterations / 2) * sizeScaler;

		shape.scaleX = shape.scaleY = sizeScaler;

		return shape;
	}

	getRandomColor() {
		const index = Math.floor(Math.random() * COLORS.length);

		return COLORS[index];
	}
}
