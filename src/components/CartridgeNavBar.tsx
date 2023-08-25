import { type Component } from 'solid-js';
import { type Cartridge, cartridges, type CartridgeMetaData } from './models/cartridges';

import navStyles from './CartridgeNavBar.module.css';

import { switchCartridge } from './CrtContainer';
import { Animation, Keyframe } from './Animation';
import { CreateCartridgeElement } from './CartridgeElement';

function animateSwitchCartridge(index: number) {
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
			{
				length: 200,
				styleObject: {
					transform: "translateY(" + i*22 + "px)",
					background: "red"
				}
			},
			{
				length: 200,
				styleObject: {
					transform: "translateY(" + i*22 + "px) scale(1.1, 1.1)",
					"box-shadow": "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
					background: "green",
					"z-index":11
				}
			},
			{
				length: 1000,
				styleObject: {
					transition: "background 1s, transform 1s, box-shadow 1s",
					transform: "translateY(calc(100vh - 200px)) scale(1.1, 1.1)",
					"box-shadow": "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
					background: "blue",
					"z-index":11
				}
			}
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
			<For each={metaTable}>{(metaData) => CreateCartridgeElement(metaData)}</For>
		</div>
	);
};

export default CartridgeNavBar;
