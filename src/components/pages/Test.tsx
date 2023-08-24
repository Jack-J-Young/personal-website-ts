import type { Component } from 'solid-js';

import testStyles from './Test.module.css';

const Test: Component = () => {
	return (
		<div class={testStyles.test}>
			Console
		</div>
	);
};

export default Test;
