<template>
	<div :class="['toolbar', { open }]">
		<div class="players">
			<img :src="icon_players" alt="" />
			<button class="btn_positive" @click="addPlayer" :disabled="players.length >= 8">+</button>
		</div>
		<div class="players_rotates">
			<h2>Players' positions</h2>
			<input v-for="player in players" type="range" min="0" max="360" step="2" v-model="player.rotateBoard" />
		</div>
		<div class="choose_categories">
			<button
				:class="[enabledCategories.includes(category) ? 'enabled' : 'disabled']"
				v-for="category in allCategories"
				@click="toggleCategory(category)"
				:key="category">
				<img :src="`/img/${category}_blue.png`" />
			</button>
		</div>
		<div class="open_btn" @click="open = !open">
			<span class="arrow"></span>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useGameStore } from "~/stores/kevo-rapido/game";
import { usePlayersStore } from "~/stores/kevo-rapido/players";

import icon_players from "~/img/icon_players.png";

const { players } = storeToRefs(usePlayersStore());
const { addPlayer } = usePlayersStore();
const { allCategories } = useGameStore();
const { enabledCategories } = storeToRefs(useGameStore());

function toggleCategory(c) {
	const index = enabledCategories.value.indexOf(c);
	if (index > -1) {
		enabledCategories.value.splice(index, 1);
	} else {
		enabledCategories.value.push(c);
	}
}

const open = ref(false);
</script>

<style lang="scss" scoped>
.toolbar {
	z-index: 10;
	width: 40%;
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
		margin: 8px 0;
		width: 100%;
	}
}

.choose_categories {
	display: flex;
	gap: 10px;
	flex-flow: row wrap;

	button {
		appearance: none;
		height: 36px;
		padding: 1.2%;
		border: 0 none;
		width: 10%;
		border-radius: 8px;
		transition: background-color 0.3s, box-shadow 0.3s;

		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			transition: filter 0.3s;
		}

		&.enabled {
			background-color: #6f6;
			box-shadow: inset 0px 0px 4px #040, inset 0px 0px 8px #040;
			color: #030;

			img {
				filter: hue-rotate(-90deg) brightness(0.6);
			}
		}

		&.disabled {
			background-color: #f66;
			box-shadow: inset 0px 0px 4px #400, inset 0px 0px 8px #400;
			color: #030;

			img {
				filter: hue-rotate(140deg) brightness(0.6);
			}
		}
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
