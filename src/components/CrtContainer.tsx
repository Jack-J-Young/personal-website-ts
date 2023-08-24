import { type Component, createSignal, useTransition } from 'solid-js';
import { type Cartridge, cartridges } from './models/cartridges';

import logo from './static.gif';

import crtStyles from './CrtContainer.module.css';

enum TransitionStage {
	In = 1,
	Out = 0,
}

const [page, setPage] = createSignal<Cartridge>(cartridges[0]);
const [transitionStage, setTransitionStage] =
	createSignal<TransitionStage>(TransitionStage.Out);

var nextCartridge: Cartridge = page();

const switchCartridge = (cartridge: Cartridge) => {
	nextCartridge = cartridge;
	startTransition(() => {setPage(cartridge)});
};

const startTransition = (func: Function) => {
	setTransitionStage(TransitionStage.In);
	setTimeout(() => {
		func();
		endTransition();
	}, 400);
};

const endTransition = () => {
	setTransitionStage(TransitionStage.Out);
};

const CrtContainer: Component = () => {
	return (
		<div class={crtStyles.tv}>
			<div>
				<div classList={{
					[crtStyles.fadeIn]:
						transitionStage() === TransitionStage.In,
					[crtStyles.fadeOut]:
						transitionStage() === TransitionStage.Out
				}}>	
					{page().component}
				</div>
				<img src={logo} class={crtStyles.static} />
			</div>
		</div>
	);
};

export { CrtContainer, setPage, page, switchCartridge };
