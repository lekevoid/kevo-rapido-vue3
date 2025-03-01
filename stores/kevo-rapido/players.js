import { defineStore } from "pinia";

export const usePlayersStore = defineStore("players", () => {
	const blankPlayer = {
		score: 0,
		rotateBoard: 0,
	};

	const players = ref([
		{
			...blankPlayer,
		},
		{
			...blankPlayer,
		},
	]);

	function addPlayer() {
		players.value.push({ ...blankPlayer });
	}

	return {
		players,
		addPlayer,
	};
});
