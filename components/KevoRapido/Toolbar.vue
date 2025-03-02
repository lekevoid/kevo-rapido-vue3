<template>
	<div :class="['toolbar', { open }]">
		<div class="players">
			<img :src="icon_players" alt="" />
			<button class="btn_positive" @click="addPlayer" :disabled="players.length >= 8">+</button>
		</div>
		<div class="players_rotates">
			<h2>Players' positions</h2>
			<input v-for="player in players" type="range" min="0" max="360" step="5" v-model="player.rotateBoard" />
		</div>
		<div class="open_btn" @click="open = !open">
			<span class="arrow"></span>
		</div>
	</div>
</template>

<script setup>
import { usePlayersStore } from "~/stores/kevo-rapido/players";

import icon_players from "~/img/icon_players.png";

const { players } = storeToRefs(usePlayersStore());
const { addPlayer, removePlayer } = usePlayersStore();

const open = ref(false);
</script>

<style lang="scss" scoped>
.toolbar {
	z-index: 10;
	width: 30%;
	background: linear-gradient(to bottom, rgba(#002, 0.6) 0%, rgba(#002, 1) 100%);
	padding: 10px;
	top: 0;
	left: 0;
	color: #fff;
	position: fixed;
	height: 100%;
	transform: translateX(-100%);
	transition: transform 0.6s ease;

	.arrow {
		border-width: 5px 0 5px 10px;
		border-color: transparent transparent transparent rgba(#fff, 0.6);
		height: 0px;
		border-style: solid;
		width: 0px;
		display: block;
	}

	&.open {
		transform: translateX(0%);
		.arrow {
			transform: rotate(180deg);
		}
	}
}

.players {
	display: flex;
	flex-flow: row nowrap;
	margin-bottom: 20px;

	img {
		height: 40px;
		width: 40px;
		object-fit: contain;
		margin-right: 12px;
	}
}

.players_rotates {
	margin-bottom: 20px;

	input {
		margin: 0 0 10px;
		width: 100%;
	}
}

h2 {
	font-size: 18px;
	margin: 0 0 10px;
}

button {
	&.btn_positive {
		background-color: #0d0;
		appearance: none;
		width: 40px;
		height: 40px;
		border: 0 none;
		border-radius: 8px;
		font-size: 30px;
		font-weight: 900;
		padding: 0;
		line-height: 0.8;
		box-shadow: inset 0px 0px 4px #040, inset 0px 0px 8px #040;
		color: #030;
	}
}

.open_btn {
	width: 20px;
	height: 100px;
	background: rgba(#000, 0.6);
	left: 100%;
	top: 50%;
	position: absolute;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0 12px 12px 0;
}
</style>
