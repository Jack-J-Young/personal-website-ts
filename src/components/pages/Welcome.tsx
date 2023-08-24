import type { Component } from 'solid-js';

import welcomeStyles from './Welcome.module.css';

const Welcome: Component = () => {
	return (
		<div class={welcomeStyles.test}>
			Console
		</div>
	);
};

export default Welcome;
