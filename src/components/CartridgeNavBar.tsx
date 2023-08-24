import type { Component } from 'solid-js';
import { Cartridge, cartridges } from './models/cartridges';

import navStyles from './CartridgeNavBar.module.css';

import { switchCartridge } from './CrtContainer';
import { CartridgeElement } from './CartridgeElement';

const CartridgeNavBar: Component = () => {
	return (
		<div class={navStyles.shelf}>
			<For each={cartridges}>{(cartridge, i) =>
				<CartridgeElement/>
			}</For>
		</div>
	);
};

export default CartridgeNavBar;
