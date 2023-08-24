import { Component, createSignal, useTransition } from 'solid-js';
import { Cartridge, cartridges } from './models/cartridges';

import logo from './static.gif';

import crtStyles from './Cartridge.module.css';

enum TransitionStage {
	In = 1,
	Out = 0,
}

const [page, setPage] = createSignal<Cartridge>(cartridges[0]);
const [transitionStage, setTransitionStage] = createSignal<TransitionStage>(TransitionStage.Out);

var nextCartridge: Cartridge = page();

const switchCartridge = (cartridge: Cartridge) => {
	nextCartridge = cartridge;
	startTransition(() => {setPage(cartridge)});
};

const startTransition = (func) => {
	setTransitionStage(TransitionStage.In);
	setTimeout(() => {
		func();
		endTransition();
	}, 400);
};

const endTransition = () => {
	setTransitionStage(TransitionStage.Out);
};

const Cartridge: Component = () => {
	return (
		<div class={crtStyles.tv}>
			<div>
				<div classList={{
					[crtStyles.fadeIn]: transitionStage() === TransitionStage.In,
					[crtStyles.fadeOut]: transitionStage() === TransitionStage.Out
				}}>	
					{page().component}
				</div>
				<img src={logo} class={crtStyles.static} />
			</div>
		</div>
	);
};

export { Cartridge, setPage, page, switchCartridge };
