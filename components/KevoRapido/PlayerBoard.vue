<template>
	<div class="PlayerBoard" @dblclick="editMode = true" :style="`--rotate:${player.rotateBoard}deg`">
		<pre>{{ player }}</pre>
	</div>
</template>

<script setup>
const { player } = defineProps({ player: { type: Object, required: true } });
const editMode = ref(false);
</script>

<style lang="scss" scoped>
.PlayerBoard {
	position: absolute;
	left: 50%;
	top: 50%;
	border: 1px solid blue;
	transform-origin: center top;
	height: 50vmin;
	width: 100px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	transform: rotate(var(--rotate));
}
</style>
