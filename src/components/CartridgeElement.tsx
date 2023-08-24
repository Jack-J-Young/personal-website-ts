import { Component, createSignal, useTransition } from 'solid-js';

import { Animation } from './Animation';

import cartStyles from './CartridgeElement.module.css';

//const moveAnimation: Animation = new Animation();
// 
//moveAnimation.keyframes = [];
//moveAnimation.

const CartridgeElement: Component = () => {
	var moveAnimation: Animation = new Animation([
		                 {
			                 length: 200,
			                 className: cartStyles.left
		                 },
		                 {
			                 length: 200,
			                 className: cartStyles.rest
		                 },
		                 {
			                 length: 500,
			                 className: cartStyles.test
		                 }
	                 ]);
	
	function startAnim() {
		console.log("test");
		moveAnimation.bounceToggleCallBack((() => {console.log("a")}), (() => {console.log("b")})); 
	}
	
	return (
		<div class={moveAnimation.classSignal()} on:click={startAnim}>
			Test
		</div>
	);
};

export { CartridgeElement };
