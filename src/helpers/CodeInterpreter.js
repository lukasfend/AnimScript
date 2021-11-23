
export default class CodeInterpreter {
	constructor() {
		this.memory = [];
	}

	v(value) {
		if(isNaN(value)) {
			return 1;
		} else {
			return parseInt(value);
		}
	}

	applyPreprocessor(codelines) {
		// Apply system variables
		for(let i = 0; i < codelines.length; i++) {
			let args = codelines[i].split(" ");
			const command = args.shift();
			
			codelines[i] = codelines[i].replaceAll("$width", window.innerWidth*0.5);
			codelines[i] = codelines[i].replaceAll("$height", window.innerHeight-70);

			if(command === "define") {
				this.memory[args[0]] = args[1];
			}

			for(let j = 0; j < args.length; j++) {
				if(this.memory[args[j]] !== undefined) {
					args[j] = this.memory[args[j]];
				}
			}
			codelines[i] = command + " " + args.join(" ");

		}
		return codelines;
	};

	interpretCode(code) {
		const canvas = document.getElementById("canvas");
		const ctx = canvas.getContext("2d");
		let codelines = code.split("\n");
		
		for(const line of this.applyPreprocessor(codelines)) {
			const args = line.split(" ");
			const command = args.shift();

			switch(command) {

				case "backgroundcolor":
					canvas.style.backgroundColor = args.join(" ");
				break;

				case "size":
					canvas.width = this.v(args[0]);
					canvas.height = this.v(args[1]);
				break;

				case "strokecolor":
					ctx.strokeStyle = args.join(" ");
				break;

				case "line":
					ctx.beginPath();
					ctx.moveTo( this.v(args[0]), this.v(args[1]) );
					ctx.lineTo( this.v(args[2]), this.v(args[3]) );
					ctx.stroke();
					ctx.closePath();
				break;

				case "define":
					break;

				default: 
				console.log("Unknown command: " + command);
				break;
			}
		}
	}
}