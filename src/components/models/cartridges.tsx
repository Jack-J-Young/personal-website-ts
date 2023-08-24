import type { Component } from 'solid-js';

import Welcome from '../pages/Welcome';
import Test from '../pages/Test';

type Cartridge = {
	name: string,
	component: Component
}

const cartridges: Cartridge[] = [
	{ name: "Welcome", component: Welcome },
	{ name: "Test", component: Test }
];

export { Cartridge, cartridges };
