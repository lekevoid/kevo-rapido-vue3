import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
	const allCategories = [
		"animal",
		"city",
		"country",
		"celebrity",
		"profession",
		"object",
		"plant",
		"food",
		"name",
		"movie",
		"book",
		"brand",
		"event",
		"fictional_character",
		"game",
		"houseware",
		"location",
		"mythology",
		"adjective",
		"song",
		"verb",
		"big",
		"fast",
		"hard",
		"inside",
		"noisy",
		"outside",
		"quiet",
		"slow",
		"small",
		"soft",
	];

	const originalCategories = ["animal", "city", "country", "celebrity", "profession", "object", "plant", "food", "name", "movie", "book"];
	const kevCategories = ["brand", "event", "fictional_character", "game", "houseware", "location", "mythology", "adjective", "song", "verb"];
	const twistCategories = ["big", "fast", "hard", "inside", "noisy", "outside", "quiet", "slow", "small", "soft"];

	const enabledCategories = ref(allCategories);

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

	console.log(lettersCountries);

	function toggleCategory(c) {
		const index = enabledCategories.value.indexOf(c);
		if (index > -1) {
			enabledCategories.value.splice(index, 1);
		} else {
			enabledCategories.value.push(c);
		}
	}

	function toggleCategories(theme) {
		if (theme === "all") {
			enabledCategories.value = [...allCategories];
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

	return { allCategories, enabledCategories, colors, lettersBase, lettersCities, lettersCountries, toggleCategory, toggleCategories };
});
