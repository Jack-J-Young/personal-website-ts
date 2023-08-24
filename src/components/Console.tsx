import type { Component } from 'solid-js';

import consoleStyles from './Console.module.css';

const Console: Component = () => {
	return (
		<div class={consoleStyles.test}>
			Console
		</div>
	);
};

export default Console;
