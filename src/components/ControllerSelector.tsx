import type { Component } from 'solid-js';

import controllersStyles from './ControllerSelector.module.css';

const ControllerSelector: Component = () => {
	return (
		<div class={controllersStyles.box}>
			Controller
		</div>
	);
};

export default ControllerSelector;
