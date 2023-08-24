import type { Component } from 'solid-js';
import { Cartridge, cartridges } from './models/cartridges';

import navStyles from './CartridgeNavBar.module.css';

import { switchCartridge } from './CrtContainer';

const CartridgeNavBar: Component = () => {
	return (
		<div class={navStyles.shelf}>
			<For each={cartridges}>{(cartridge, i) =>
				<div class={navStyles.cartridge} style={{ cursor: "pointer" }} on:click={() => switchCartridge(cartridge)}>
					{cartridge.name}
				</div>
			}</For>
		</div>
	);
};

export default CartridgeNavBar;
