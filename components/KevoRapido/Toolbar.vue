<template>
	<div :class="['toolbar', { open }]">
		<div class="scroll">
			<div class="players">
				<img :src="icon_players" alt="" />
				<button :class="['btn_negative', { disabled: players.length <= 2 }]" :disabled="players.length <= 2" @click="removeLastPlayer">&minus;</button>
				<button :class="['btn_positive', { disabled: players.length >= 8 }]" :disabled="players.length >= 8" @click="addPlayer">+</button>
			</div>
			<hr />
			<div class="choose_categories">
				<div class="row">
					<button class="multiple_categories" @click="toggleCategories('all')">All</button>
					<button class="multiple_categories" @click="toggleCategories('original')">Original</button>
					<button class="multiple_categories" @click="toggleCategories('kev')">Kev</button>
					<button class="multiple_categories" @click="toggleCategories('twist')">Twist</button>
				</div>
				<button
					v-for="category in allCategories"
					:class="['single_category', enabledSingleCategories.includes(category) ? 'enabled' : 'disabled']"
					@click="toggleCategory(category)"
					:key="category">
					<img :src="`/img/${category}_blue.png`" />
				</button>
				<button :class="['combo_category', enableComboCategories ? 'enabled' : 'disabled']" @click="enableComboCategories = !enableComboCategories">
					<img :src="`/img/animal_blue.png`" /> / <img :src="`/img/name_blue.png`" />
				</button>
				<button
					:class="['single_category', permissiveComboCategories ? 'enabled' : 'disabled']"
					style="font-size: 10px; font-weight: bold"
					@click="permissiveComboCategories = !permissiveComboCategories">
					Permissive
				</button>
			</div>
			<hr />
			<div class="players_rotates">
				<h2>Players' positions</h2>
				<input v-for="player in players" type="range" min="0" max="360" step="2" v-model="player.rotateBoard" />
			</div>
			<hr />
			<div class="reset_game">
				<div class="col"><h2>Reset game</h2></div>
				<div class="col">
					<button v-if="!confirmReset" class="btn_negative reset" @click="confirmReset = true">Reset</button>
					<button v-if="confirmReset" class="btn_negative reset" @click="resetGame">Sure ?</button>
				</div>
			</div>
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
const { addPlayer, removeLastPlayer } = usePlayersStore();
const { allCategories, toggleCategory, toggleCategories } = useGameStore();
const { enableComboCategories, permissiveComboCategories, enabledSingleCategories } = storeToRefs(useGameStore());

const open = ref(false);

const confirmReset = ref(false);

function resetGame() {
	window.location.reload();
}
</script>

<style lang="scss" scoped>
.toolbar {
	z-index: 10;
	width: 40%;
	background: linear-gradient(to bottom, rgba(#002, 0.6) 0%, rgba(#002, 1) 100%);
	top: 0;
	left: 0;
	color: #fff;
	position: fixed;
	height: 100%;
	transform: translateX(-100%);
	transition: transform 0.6s ease;
	padding: 0;

	.scroll {
		overflow-y: auto;
		padding: 30px 20px;
		height: 100vh;
	}

	.arrow {
		border-width: 5px 0 5px 10px;
		border-color: transparent transparent transparent rgba(#fff, 0.6);
		height: 0px;
		border-style: solid;
		width: 0px;
		display: block;
		transition: transform 0.6s ease;
	}

	hr {
		margin: 40px 0;
		opacity: 0.4;
	}

	&.open {
		transform: translateX(0%);

		.arrow {
			transform: rotate(180deg) translateX(20%);
		}

		.open_btn {
			width: 50px;
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
	margin-bottom: 40px;

	input {
		margin: 16px 0;
		width: 100%;
	}
}

.choose_categories {
	display: flex;
	gap: 10px;
	flex-flow: row wrap;

	.row {
		display: flex;
		gap: 10px;
		flex-flow: row nowrap;
		justify-content: space-between;
		flex: 0 0 100%;
	}

	button {
		appearance: none;
		height: 36px;
		padding: 1.2%;
		border: 0 none;
		border-radius: 8px;
		transition: background-color 0.3s, box-shadow 0.3s;

		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			transition: filter 0.3s;
		}

		&.multiple_categories {
			flex: 1 1 auto;
			margin-bottom: 10px;
			background-color: #f6f;
			box-shadow: inset 0px 0px 4px #404, inset 0px 0px 8px #404;
			color: #202;
			font-size: 12px;
		}

		&.single_category {
			width: 10%;
		}

		&.combo_category {
			width: calc(70% + 60px);
			font-size: 1.4em;
			line-height: 0.5em;
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
	appearance: none;

	&.btn_positive {
		background-color: #0d0;
		width: 40px;
		height: 40px;
		border: 0 none;
		border-radius: 8px;
		font-size: 30px;
		margin: 0 8px;
		font-weight: 900;
		padding: 0;
		line-height: 0.8;
		box-shadow: inset 0px 0px 4px #040, inset 0px 0px 8px #040;
		transition: opacity 0.3s;
		color: #030;

		&.disabled {
			opacity: 0.2;
		}
	}

	&.btn_negative {
		background-color: #d00;
		width: 40px;
		height: 40px;
		border: 0 none;
		border-radius: 8px;
		font-size: 30px;
		margin: 0 8px;
		font-weight: 900;
		padding: 0;
		line-height: 0.8;
		box-shadow: inset 0px 0px 4px #400, inset 0px 0px 8px #400;
		transition: opacity 0.3s;
		color: #300;

		&.reset {
			font-size: 12px;
			width: auto;
			padding: 0 20px;
		}

		&.disabled {
			opacity: 0.2;
		}
	}
}

.reset_game {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;

	.col {
		padding: 0 10px;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}

	h2 {
		margin: 0;
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
	transition: width 0.6s ease;
}
</style>
