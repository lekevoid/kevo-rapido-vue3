<template>
	<div :class="['toolbar', { open }]">
		<div class="players">
			<div>Players</div>
			<button @click="addPlayer" :disabled="players.length >= 8">+</button>
		</div>
		<div class="open_btn" @click="open = !open">
			<span v-if="open"><</span>
			<span v-else>></span>
		</div>
	</div>
</template>

<script setup>
import { usePlayersStore } from "~/stores/kevo-rapido/players";

const { players } = storeToRefs(usePlayersStore());
const { addPlayer, removePlayer } = usePlayersStore();

const open = ref(false);
</script>

<style lang="scss" scoped>
.toolbar {
	z-index: 10;
	width: 20%;
	background: rgba(#000, 0.2);
	top: 0;
	left: 0;
	position: fixed;
	height: 100%;
	transform: translateX(-100%);
	transition: transform 0.6s ease;

	&.open {
		transform: translateX(0%);
	}
}

.players {
	display: flex;
	flex-flow: row nowrap;
}

.open_btn {
	width: 20px;
	height: 100px;
	background: rgba(#000, 0.6);
	left: 100%;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0 12px 12px 0;
}
</style>
