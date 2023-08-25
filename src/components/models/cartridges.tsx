import type { Component } from 'solid-js';

import Welcome from '../pages/Welcome';
import Test from '../pages/Test';
import { Animation } from '../Animation';

export type Cartridge = {
	name: string,
	component: Component
}

export const cartridges: Cartridge[] = [
	{ name: "Welcome", component: Welcome },
	{ name: "Test", component: Test }
];

export type CartridgeMetaData = {
	cartridge: Cartridge;
	animation: Animation;
	animate: Function;
};
