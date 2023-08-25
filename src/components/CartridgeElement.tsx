import { type Component } from 'solid-js';

import navStyles from './CartridgeNavBar.module.css';

import { CartridgeMetaData } from './models/cartridges';

export function CreateCartridgeElement(cartridgeMetaData: CartridgeMetaData): Component {
	return () => {
		return (
			<div class={navStyles.cartridgeWrap}>
				<div class={navStyles.cartridge}
				     style={cartridgeMetaData.animation.styleSignal()}
					 onclick={() => cartridgeMetaData.animate()}
				>
					{cartridgeMetaData.cartridge.name}
				</div>
			</div>
		);
	}
};
