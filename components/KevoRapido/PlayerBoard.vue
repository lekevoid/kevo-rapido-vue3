<template>
	<div class="PlayerBoard" @dblclick="editMode = true" :style="`--rotate:${player.rotateBoard}deg`" v-if="player">
		<div class="scoreboard" v-if="!editMode">
			<button @click="adjustScore(-1)">&minus;</button>
			<div class="score">{{ player.score }}</div>
			<button @click="adjustScore(1)">&plus;</button>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePlayersStore } from "~/stores/kevo-rapido/players";

const { players } = storeToRefs(usePlayersStore());

const { playerId } = defineProps({ playerId: { type: Number, required: true } });

const editMode = ref(false);

function adjustScore(by) {
	const player = players.value.find((p) => p.id === playerId);
	if (player.score + by >= 0) {
		player.score = player.score + by;
	}
}

const player = computed(() => players.value.find((p) => p.id === playerId));
console.log(players.value, playerId, player);
</script>

<style lang="scss" scoped>
.PlayerBoard {
	position: absolute;
	left: 50%;
	top: 50%;
	transform-origin: center top;
	height: 50vmin;
	width: 120px;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: flex-end;
	transform: translateX(-50%) rotate(var(--rotate));
	z-index: 1;
}

.scoreboard {
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;

	.score {
		font-size: 30px;
		font-family: Arial black;
		font-weight: 900;
	}

	button {
		appearance: none;
		font-family: Arial black;
		font-weight: 900;
		font-size: 40px;
		background: rgba(#ddf, 0.01);
		border: 0 none;
	}
}

pre {
	margin: 0;
}
</style>
