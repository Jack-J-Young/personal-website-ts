import type { Component } from 'solid-js';

import styles from './App.module.css';

import { CrtContainer }  from './components/CrtContainer';
import CartridgeNavBar from './components/CartridgeNavBar';
import Console from './components/Console';
import ControllerSelector from './components/ControllerSelector';

const App: Component = () => {
	return (
		<div class={styles.aspectWrapper}>
			<div class={styles.pageRoot}>
				<div class={styles.navBar}>
					<CartridgeNavBar />
				</div>
				<div class={styles.systemSection}>
					<div class={styles.crtBox}>
						<CrtContainer />
					</div>
					<div class={styles.consoleSection}>
						<div class={styles.consoleBox}>
							<Console />
						</div>
						<div class={styles.controllerBox}>
							<ControllerSelector />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
