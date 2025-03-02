import { defineStore } from "pinia";

export const usePlayersStore = defineStore("players", () => {
	const blankPlayer = {
		score: 0,
		rotateBoard: 0,
	};

	function playerId() {
		const now = Date.now();
		return Math.round(Math.random() * parseInt(now));
	}

	function deepClone(obj) {
		if (typeof obj !== "object" || obj === null) {
			return obj;
		}

		const newObj = Array.isArray(obj) ? [] : {};

		for (const key in obj) {
			newObj[key] = deepClone(obj[key]);
		}

		return newObj;
	}

	function findFarthestEmptyPosition() {
		const numbers = players.value.map((p) => p.rotateBoard);

		console.log(numbers);

		if (numbers.length === 0) {
			return 0;
		}

		// Sort the numbers in ascending order
		numbers.sort((a, b) => a - b);

		// Calculate the differences between consecutive numbers and between the last and first (wrapping around)
		const diffs = numbers.map((n, i) => {
			const next = numbers[(i + 1) % numbers.length]; // Next number, wrapping around
			let diff = (next - n + 360) % 360; // Calculate difference, handling wrap-around
			return diff;
		});

		// Find the maximum difference
		const maxDiff = Math.max(...diffs);

		// Find the index of the maximum difference
		const maxDiffIndex = diffs.indexOf(maxDiff);

		// Calculate the midpoint of the largest gap
		const farthestNumber = (numbers[maxDiffIndex] + maxDiff / 2) % 360;

		return farthestNumber;
	}

	const players = ref([
		{
			...blankPlayer,
			rotateBoard: 0,
			id: playerId(),
		},
		{
			...blankPlayer,
			rotateBoard: 180,
			id: playerId(),
		},
	]);

	function addPlayer() {
		if (players.value.length >= 8) return;
		const farthestEmptyPosition = findFarthestEmptyPosition();
		let playerToAdd = deepClone(blankPlayer);
		players.value.push({ ...playerToAdd, rotateBoard: farthestEmptyPosition, id: playerId() });
		console.log(players.value);
	}

	return {
		players,
		addPlayer,
	};
});
