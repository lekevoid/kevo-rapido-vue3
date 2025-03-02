<template>
	<div class="PlayerBoard" ref="playerBoardRef" :style="`--rotate:${parseInt(player.rotateBoard) + 90}deg`" v-if="player">
		<div class="scoreboard" v-if="!editMode">
			<button @click="adjustScore(-1)">&minus;</button>
			<div class="score">{{ player.score }}</div>
			<button @click="adjustScore(1)">&plus;</button>
		</div>
		<div v-else class="edit_player">
			<button class="cancel" @click="editMode = false">Cancel</button>
			<button v-if="players.length > 2" class="delete" @click="removePlayer(playerId)">Remove</button>
		</div>
	</div>
</template>

<script setup>
import { onLongPress } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { usePlayersStore } from "~/stores/kevo-rapido/players";

const { players } = storeToRefs(usePlayersStore());
const { removePlayer } = usePlayersStore();

const { playerId } = defineProps({ playerId: { type: Number, required: true } });

const editMode = ref(false);

const player = computed(() => players.value.find((p) => p.id === playerId));

function adjustScore(by) {
	const player = players.value.find((p) => p.id === playerId);
	if (player.score + by >= 0) {
		player.score = player.score + by;
	}
}

const playerBoardRef = useTemplateRef("playerBoardRef");

function handleOnLongPress(e) {
	editMode.value = true;
}

onLongPress(playerBoardRef, handleOnLongPress, {
	modifiers: {
		prevent: true,
	},
});
</script>

<style lang="scss" scoped>
.PlayerBoard {
	position: absolute;
	left: 50%;
	top: 50%;
	transform-origin: center top;
	height: 45vmin;
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
	user-select: none;

	.score {
		font-size: 30px;
		user-select: none;
		color: #000;
		font-weight: 900;
	}

	button {
		appearance: none;
		font-weight: 900;
		user-select: none;
		color: #000;
		font-size: 40px;
		background: rgba(#ddf, 0.01);
		border: 0 none;
	}
}

.edit_player {
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	user-select: none;

	button {
		appearance: none;
		border: 0 none;
		border-radius: 4px;
		height: 30px;
		font-size: 12px;
		margin: 0 auto;

		&.cancel {
			background-color: #aa0;
			box-shadow: inset 0px 0px 8px #880, inset 0px 0px 4px #880;
			color: #110;
		}

		&.delete {
			box-shadow: inset 0px 0px 8px #800, inset 0px 0px 4px #800;
			background-color: #a00;
			color: #200;
		}
	}
}
</style>
