class Car {
	constructor(battery, position, faceTo) {
		this.battery = battery;
		this.position = position;
		this.faceTo = faceTo;
	}

	Moving(p, faceTo, cost) {
		this.position = p;
		this.faceTo = faceTo;
		if (this.battery >= cost) {
			this.battery -= cost;
			console.log("battery", this.battery)
			return true
		}
		return false
	}

	loadBattery(gain) {
		this.battery += gain;
		console.log("Rechargement", this.battery)
	}
}

class Point {
	constructor(dx, dy) {
		this.dx = dx;
		this.dy = dy;
	}

	// static distance(a, b) {
	// 	const dx = a.x - b.x;
	// 	const dy = a.y - b.y;
	// 	return Math.hypot(dx, dy);
	// }
}

const p1 = new Point(5, 5);
const car = new Car(7, p1, "Top");

function keyPressed(event){
    switch (event.code) {
        case "ControlLeft" || "ControlRight":
			car.loadBattery(4)
            break;
        case "Space":
			if(car.battery >= 2)
            	rollDice(car);
			else
				car.loadBattery(4)
        break;
    
        default:
            break;
    }
}

function rollDice(car) {
	const dice = [...document.querySelectorAll(".die-list")];
	dice.forEach(die => {
		toggleClasses(die);
		die.dataset.roll = getRandomNumber(1, 6);
		car.Moving(new Point(4,die.dataset.roll),"Left", 2)
		console.log("Moving")
	});
}

function toggleClasses(die) {
	die.classList.toggle("odd-roll");
	die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// document.getElementById("die").addEventListener("click", rollDice);

document.body.addEventListener("keydown", keyPressed)