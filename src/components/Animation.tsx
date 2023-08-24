import { createSignal, Signal, Accessor, Setter } from 'solid-js';

class Animation {
	private keyframes: Keyframe[];
	
	private toggleState: boolean = false;

	private getClass: Accessor<string>;
	private setClass: Setter<string>;
	
	public constructor(keyframes: Keyframe[]) {
		this.keyframes = keyframes;
		
		try {
			var lastKeyframe = this.keyframes[0];
			
			var signalParts = createSignal<string>(lastKeyframe.className);
			this.getClass = signalParts[0];
			this.setClass = signalParts[1];
		} catch (error) {
			if (error instanceof RangeError) {
				throw new Error('No Keyframes Provided');
			} else {
				throw error;
			}
		}
	}
	
	private toggle() {
		this.toggleState = !this.toggleState;
		this.keyframes = this.keyframes.reverse();
	}
	
	// Play looping animation, ending on the last keyframe, then running the callback
	public wrapCallBack(callback: () => void): void {
		var lastFunc: Function = callback;
		for (const frame of this.keyframes.reverse()) {
			var func = () => {
				setTimeout(() => {
					this.setClass(frame.className);
					lastFunc();
				}, frame.length);
			}
			lastFunc = func;
		}
		return lastFunc();
	}
	
	// Toggles animation direction at start and end, running a callback for each side
	public bounceToggleCallBack(onCallback: Function,
	                            offCallback: Function,
	                            setState: boolean | null = null): void {
		if (setState != null) {
			if (setState && !this.toggleState) this.toggle();
			if (!setState && this.toggleState) this.toggle();
		}
		let callback: Function = this.toggleState ? onCallback : offCallback;
		let functions: Function[] = [];
		
		for(let i = 0; i < this.keyframes.length; i++) {
			let frame = this.keyframes[i];
				
			functions.push(() => {
				this.setClass(frame.className)
				setTimeout(() => {
					(i === 0 ? callback : functions[i-1])();
				},
				frame.length);
			});
		}
		this.toggle();
		functions[functions.length-1]();
	}

	public classSignal(): string {
		return this.getClass();
	}
}

export type Keyframe = {
	length: number;
	className: string;
}

export { Animation };
