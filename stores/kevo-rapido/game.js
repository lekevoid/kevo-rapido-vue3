import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
	const originalCategories = ["animal", "book", "city", "country", "celebrity", "profession", "object", "plant", "food", "name", "movie"];
	const kevCategories = ["adjective", "brand", "event", "fictional", "game", "houseware", "location", "song", "verb"];
	const twistCategories = ["big", "fast", "hard", "inside", "noisy", "outside", "quiet", "slow", "small", "soft"];

	const allCategories = [...originalCategories, ...kevCategories, ...twistCategories];

	const comboCategories = [
		["animal", "big"],
		["animal", "brand"],
		["animal", "fast"],
		["animal", "fictional"],
		["animal", "hard"],
		["animal", "inside"],
		["animal", "name"],
		["animal", "noisy"],
		["animal", "profession"],
		["animal", "quiet"],
		["animal", "slow"],
		["animal", "small"],
		["animal", "soft"],
		["big", "city"],
		["big", "country"],
		["big", "fast"],
		["big", "fictional"],
		["big", "hard"],
		["big", "movie"],
		["big", "name"],
		["big", "noisy"],
		["big", "object"],
		["big", "outside"],
		["big", "plant"],
		["big", "quiet"],
		["big", "slow"],
		["book", "fictional"],
		["book", "game"],
		["book", "movie"],
		["brand", "food"],
		["brand", "inside"],
		["brand", "object"],
		["celebrity", "movie"],
		["celebrity", "song"],
		["city", "fictional"],
		["city", "name"],
		["city", "small"],
		["fast", "hard"],
		["fast", "noisy"],
		["fast", "quiet"],
		["fast", "small"],
		["fictional", "movie"],
		["fictional", "object"],
		["fictional", "plant"],
		["fictional", "small"],
		["food", "hard"],
		["food", "noisy"],
		["food", "plant"],
		["food", "small"],
		["food", "soft"],
		["game", "movie"],
		["hard", "houseware"],
		["hard", "inside"],
		["hard", "name"],
		["hard", "noisy"],
		["hard", "outside"],
		["hard", "small"],
		["houseware", "movie"],
		["houseware", "noisy"],
		["houseware", "outside"],
		["houseware", "quiet"],
		["houseware", "slow"],
		["houseware", "small"],
		["houseware", "soft"],
		["inside", "noisy"],
		["inside", "outside"],
		["inside", "plant"],
		["inside", "profession"],
		["inside", "quiet"],
		["inside", "slow"],
		["inside", "small"],
		["inside", "soft"],
		["location", "fictional"],
		["location", "movie"],
		["location", "name"],
		["movie", "fictional"],
		["name", "object"],
		["name", "plant"],
		["noisy", "outside"],
		["noisy", "slow"],
		["noisy", "small"],
		["object", "outside"],
		["object", "quiet"],
		["object", "slow"],
		["object", "small"],
		["object", "soft"],
		["outside", "profession"],
		["outside", "quiet"],
		["outside", "slow"],
		["outside", "small"],
		["outside", "soft"],
		["plant", "profession"],
		["plant", "small"],
		["plant", "soft"],
		["quiet", "slow"],
		["quiet", "small"],
		["slow", "small"],
	];

	const enableComboCategories = ref(true);
	const permissiveComboCategories = ref(true);

	const enabledSingleCategories = ref(allCategories);

	const enabledCategories = computed(() => {
		let out = [...enabledSingleCategories.value];

		if (enableComboCategories.value) {
			for (const combo of comboCategories) {
				let addComboCategoryToList = false;
				if (permissiveComboCategories.value) {
					// Permissive mode for Combo Categories
					for (const categoryFromCombo of combo) {
						if (enabledSingleCategories.value.includes(categoryFromCombo)) {
							addComboCategoryToList = true;
						}
					}
				} else {
					// Restrictive mode for Combo Categories
					for (const categoryFromCombo of combo) {
						if (!enabledSingleCategories.value.includes(categoryFromCombo)) {
							addComboCategoryToList = false;
						}
					}
				}

				if (addComboCategoryToList) {
					out.push(combo);
				}
			}
		}

		return out;
	});

	console.log(enabledCategories.value);

	const colors = ["blue", "green", "orange"];

	const lettersBase = [
		"AAAAAAAAAA",
		"BBBBBBBB",
		"CCCCCCC",
		"DDDDDDDD",
		"EEEEEEE",
		"FFFFFFFF",
		"GGGGG",
		"HHHHHHH",
		"IIIII",
		"JJJJJJJ",
		"KKKKK",
		"LLLLLLLLL",
		"MMMMMMMMMM",
		"NNNNNNNNNN",
		"OOOOOO",
		"PPPPPPPP",
		"QQQ",
		"RRRRRRRRRR",
		"SSSSSSSSSS",
		"TTTTTTTTTTTT",
		"UUUU",
		"VVVVV",
		"WWWWWW",
		"XXX",
		"YYYY",
		"ZZZ",
	].join("");

	const lettersCities = [
		"AAAAAAAAAAAAAAAAAAAAAAAAAAA",
		"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
		"CCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
		"DDDDDDDDDDDDDDD",
		"EEEEEEE",
		"FFFFFFFF",
		"GGGGGGGGGGGGGGG",
		"HHHHHHHHHHHHHHHHHH",
		"IIIIIIIIII",
		"JJJJJJJJJJJ",
		"KKKKKKKKKKKKKKKKKKKKKKKKKKKKK",
		"LLLLLLLLLLLLLLLLLL",
		"MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM",
		"NNNNNNNNNNNNNNNNNN",
		"OOOOOOOOO",
		"PPPPPPPPPPPPPPPPPPPPPPP",
		"QQQQ",
		"RRRRRRRRRRRRR",
		"SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
		"TTTTTTTTTTTTTTTTTTTTTTTTTT",
		"UUUUU",
		"VVVVVVVVV",
		"WWWWWW",
		"X",
		"YYYYYYY",
		"ZZZZZZ",
	].join("");

	const lettersCountries = [
		"AAAAAAAAAAA",
		"BBBBBBBBBBBBBBBBB",
		"CCCCCCCCCCCCCCCCC",
		"DDDDD",
		"EEEEEEEE",
		"FFF",
		"GGGGGGGGGGG",
		"HHHH",
		"IIIIIIII",
		"JJJ",
		"KKKKK",
		"LLLLLLLLL",
		"MMMMMMMMMMMMMMMMMM",
		"NNNNNNNNNNN",
		"O",
		"PPPPPPPPPP",
		"Q",
		"RRR",
		"SSSSSSSSSSSSSSSSSSSSSSSSSS",
		"TTTTTTTTTTT",
		"UUUUUUU",
		"VVV",
		"Y",
		"ZZ",
	].join("");

	/* const _comboCategories = {};
	console.log("hello");
	for (let i of allCategories.sort()) {
		for (let j of allCategories.sort()) {
			if (i !== j) {
				const index = [i, j].sort().join("");
				console.log(index);
				_comboCategories[index] = [i, j].sort();
			}
		}
	}
	console.log(Object.values(_comboCategories)); */

	function toggleCategory(c) {
		const index = enabledSingleCategories.value.indexOf(c);
		if (index > -1) {
			enabledSingleCategories.value.splice(index, 1);
		} else {
			enabledSingleCategories.value.push(c);
		}
	}

	function toggleCategories(theme) {
		if (theme === "all") {
			enabledSingleCategories.value = [...allCategories];
			return;
		}

		let list = [];

		if (theme === "original") list = originalCategories;
		if (theme === "kev") list = kevCategories;
		if (theme === "twist") list = twistCategories;

		for (const c of list) {
			toggleCategory(c);
		}
	}

	return {
		allCategories,
		enableComboCategories,
		permissiveComboCategories,
		enabledSingleCategories,
		enabledCategories,
		colors,
		lettersBase,
		lettersCities,
		lettersCountries,
		toggleCategory,
		toggleCategories,
	};
});
