import { createSignal, Signal, Accessor, Setter } from 'solid-js';

class Animation {
	private keyframes: Keyframe[];
	
	private toggleState: boolean = false;

	private getStyle: Accessor<object>;
	private setStyle: Setter<object>;
	
	public constructor(keyframes: Keyframe[]) {
		this.keyframes = keyframes;
		
		try {
			var lastKeyframe = this.keyframes[0];
			
			var signalParts = createSignal<object>(lastKeyframe.styleObject);
			this.getStyle = signalParts[0];
			this.setStyle = signalParts[1];
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
					this.setStyle(frame.styleObject);
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
				this.setStyle(frame.styleObject)
				setTimeout(() => {
					(i === 0 ? callback : functions[i-1])();
				},
				frame.length);
			});
		}
		this.toggle();
		functions[functions.length-1]();
	}

	public styleSignal(): object {
		return this.getStyle();
	}
}

export type Keyframe = {
	length: number;
	styleObject: object;
}

export { Animation };
