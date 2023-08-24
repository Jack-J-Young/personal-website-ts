import type { Component } from 'solid-js';
import { Cartridge, cartridges } from './models/cartridges';

import navStyles from './CartridgeNavBar.module.css';

import { switchCartridge } from './CrtContainer';
import { Animation, Keyframe } from './Animation';

type CartridgeMetaData = {
	cartridge: Cartridge;
	animation: Animation;
	animate: Function;
};

function animateSwitchCartridge(index: number) {
	console.log("test");
	console.log(index + 1);
	var cartridge: Cartridge = metaTable[index].cartridge;

	var loadNext = () => {
		metaTable[index].animation
		                .bounceToggleCallBack(
			                 () => switchCartridge(cartridge),
			                 () => {},
			                 true
		                 )
	};
	metaTable[currentIndex].animation
	                       .bounceToggleCallBack(
		                        () => {},
		                        loadNext,
		                        false
	                        );
	currentIndex = index;
}


// Load Animations from cartridge data
function populateMetaTable(realData: Cartridge[]): CartridgeMetaData[] {
	let output: CartridgeMetaData[] = [];
	for(let i = 0; i < realData.length; i++) {
		var keyframes: Keyframe[] = [
			{ length: 200, className:navStyles.one },
			{ length: 200, className:navStyles.two },
			{ length: 200, className:navStyles.three },
		]
		let animation = new Animation(keyframes);
		output.push({
			cartridge: realData[i],
			animation: animation,
			animate: () => animateSwitchCartridge(i)
		});
	}

	return output;
}

var metaTable: CartridgeMetaData[] = populateMetaTable(cartridges);

var currentIndex: number = 0;

const CartridgeNavBar: Component = () => {
	return (
		<div class={navStyles.shelf}>
			<For each={metaTable}>{(metaData) => {
				return (
				<div class={metaData.animation.classSignal()}
				     onclick={metaData.animate}
				>
					{metaData.cartridge.name}
				</div>
				)}
			}</For>
		</div>
	);
};

export default CartridgeNavBar;
