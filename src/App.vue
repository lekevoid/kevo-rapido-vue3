<template>
	<div id="global">
		<div id="app" :class="[{ is_running: gameStarted, single_card_mode: singleCard }, 'players_' + playersNum]">
			<div id="toolbar" :class="[{ open: toolbarOpen }]">
				<button id="open" @click="toggleOpenToolbar"></button>
				<div class="dash players double">
					<button id="add_player" @click="changePlayersNum(1)"><img :src="icon_add_player" /></button>
					<button id="remove_player" @click="changePlayersNum(-1)"><img :src="icon_remove_player" /></button>
				</div>
				<div class="dash scores">
					<button id="toggle_scores" :class="[{ active: showScores }]" @click="toggleScores"><img :src="icon_scores" /></button>
				</div>
				<div class="dash labels">
					<button id="toggle_labels" :class="[{ active: showLabels }]" @click="toggleLabels"><img :src="icon_labels" /></button>
				</div>
				<div class="dash single_card">
					<button
						id="toggle_labels"
						:class="[{ active: singleCard && !disableSingleCardBtn }]"
						@click="toggleSingleCard"
						:disabled="disableSingleCardBtn">
						Single Card
					</button>
				</div>
				<div :class="['dash', 'random_rotate', { double: !cardRandomRotate }]">
					<button id="toggle_labels" :class="[{ active: cardRandomRotate }]" @click="toggleRandomRotate">Random Rotate</button>
					<button id="toggle_labels" :class="[{ hide: cardRandomRotate }]" @click="rotateCard90">Rotate 90&deg;</button>
				</div>
			</div>
			<div id="hull">
				<div id="turnCard">
					<button @click="newTurn" id="new_turn"></button>
				</div>
				<div id="cardsBoard">
					<PlayerBoard
						v-for="i in playersNum"
						:key="'board' + i"
						:playerNum="i"
						:gameStarted="gameStarted"
						:currentCard="currentCard"
						:handicap="playerHandicaps[i - 1]"
						:showScores="showScores"
						:rotateOrigValue="playerBoardsRotates[i - 1]"
						:turn="turn" />
					<div v-for="i in playersNum" :key="'options' + i" :class="['modal', { active: showPlayerOptions === i }]" @click="togglePlayerOptions(i)">
						<div class="options" @click.stop.prevent>
							<h2>Player {{ i }} Options</h2>
							<table>
								<tr>
									<td>Handicap</td>
									<td>
										<button @click="changePlayerHandicap(i, -1)" :disabled="handicapChangeDisabled">
											<span class="btn_arrow left"></span>
										</button>
									</td>
									<td>
										<div class="handicap">{{ playerHandicaps[i - 1] }}</div>
									</td>
									<td>
										<button @click="changePlayerHandicap(i, 1)" :disabled="handicapChangeDisabled">
											<span class="btn_arrow right"></span>
										</button>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<Card
						id="the_one"
						:gameStarted="gameStarted"
						:currentCard="currentCard"
						:showScores="showScores"
						:singleCardRotation="singleCardRotation"
						:randomRotate="cardRandomRotate"
						:staticRotate="cardStaticRotate" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import Card from "./components/Card.vue";
import PlayerBoard from "./components/PlayerBoard.vue";

import icon_add_player from "./img/icon_add_player.svg";
import icon_remove_player from "./img/icon_remove_player.svg";
import icon_scores from "./img/icon_scores.svg";
import icon_labels from "./img/icon_labels.svg";

const colors = ref(["blue", "green", "orange"]);
const currentCard = ref({
	type: "",
	letter: "",
	color: "",
});
const types = ref([
	"Animal",
	"City",
	"Country",
	"Celebrity",
	"Profession",
	"Object",
	"Plant",
	"Food",
	"Name",
	"Movie",
	"Book",
	"Brand",
	"Event",
	"Fictional_Character",
	"Game",
	"Houseware",
	"Location",
	"Mythology",
	"Adjective",
	"Song",
	"Verb",
]);
const playersNum = ref(2);
const playerBoardsRotates = ref([0, 180]);
const playerHandicaps = ref([0, 0]);
const handicapChangeDisabled = ref(false);
const gameStarted = ref(false);
const showScores = ref(false);
const showLabels = ref(false);
const disableSingleCardBtn = ref(false);
const lettersMR = ref(
	"AAAAAAAAAABBBBBBBBCCCCCCCDDDDDDDDEEEEEEEFFFFFFFFGGGGGHHHHHHHIIIIIJJJJJJJKKKKKLLLLLLLLLMMMMMMMMMMNNNNNNNNNNOOOOOOPPPPPPPPQQQRRRRRRRRRRSSSSSSSSSSTTTTTTTTTTTTUUUUVVVVVWWWWWWXXXYYYYZZZ"
);
const lettersScrabbleFR = ref("AAAAAAAAABBCCDDDEEEEEEEEEEEEEEEFFGGHHIIIIIIIIJKLLLLLMMMNNNNNNOOOOOOPPQRRRRRRSSSSSSTTTTTTUUUUUUVVWXYZ");
const lettersScrabbleEN = ref("AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ");
const lettersCities = ref(
	"AAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDEEEEEEEFFFFFFFFGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHIIIIIIIIIIJJJJJJJJJJJKKKKKKKKKKKKKKKKKKKKKKKKKKKKKLLLLLLLLLLLLLLLLLLMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPPQQQQRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTTTTTTUUUUUVVVVVVVVVWWWWWWXXXYYYYYYYZZZZZZ"
);
const lettersCountries = ref(
	"AAAAAAAAAAABBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCDDDDDEEEEEEEEFFFGGGGGGGGGGGHHHHIIIIIIIIJJJKKKKKLLLLLLLLLMMMMMMMMMMMMMMMMMMNNNNNNNNNNNOPPPPPPPPPPQRRRSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTUUUUUUUVVVYZZ"
);
const lang = ref("fr");
const singleCard = ref(true);
const singleCardRotation = ref(0);
const toolbarOpen = ref(false);
const turn = ref(0);
const cardRandomRotate = ref(true);
const cardStaticRotate = ref(0);
const showPlayerOptions = ref(null);

const randomKey = computed(() => {
	return Math.ceil(Math.random() * 999999999);
});

function shuffle(obj) {
	if (typeof obj === "string") {
		obj = obj.split("");
	}
	for (let i = obj.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[obj[i], obj[j]] = [obj[j], obj[i]];
	}
	return obj;
}

function newTurn() {
	turn.value = turn.value + 1;

	// chooseType() will take care of choosing the letter too.
	chooseType();
	chooseColor();

	singleCardRotation.value = Math.random() * 360;
}

function chooseType() {
	const shuffledTypes = shuffle(types.value);
	currentCard.value.type = shuffledTypes[Math.floor(Math.random() * shuffledTypes.length)];
	chooseLetter();
}

function chooseLetter() {
	const currentType = currentCard.value.type;
	let compendium = [lettersMR.value, lettersMR.value];

	if (currentType === "Country") {
		compendium.push(lettersCountries.value);
	} else if (currentType === "City") {
		compendium.push(lettersCities.value);
	} else if (lang.value === "en") {
		compendium.push(lettersScrabbleEN.value);
	} else {
		compendium.push(lettersScrabbleFR.value);
	}

	const chosenCompendium = shuffle(compendium[Math.floor(Math.random() * compendium.length)]);
	currentCard.value.letter = chosenCompendium[Math.floor(Math.random() * chosenCompendium.length)];
}

function chooseColor() {
	currentCard.value.color = colors.value[Math.floor(Math.random() * colors.value.length)];
}

function changePlayersNum(val) {
	if (playersNum.value + val >= 2 && playersNum.value + val <= 6) {
		playersNum.value += val;
	}
}

function changePlayerHandicap(player, val) {
	const num = player - 1;
	handicapChangeDisabled.value = true;
	if (playerHandicaps.value[num] || playerHandicaps.value[num] === 0) {
		if (playerHandicaps.value[num] + val >= 0) {
			playerHandicaps.value[num] += val;
		}
	}
}

function rotateCard90() {
	cardStaticRotate.value += 90;
	if (cardStaticRotate.value >= 360) {
		cardStaticRotate.value = 0;
	}
}

function toggleScores() {
	showScores.value = !showScores.value;
}

function toggleLabels() {
	showLabels.value = !showLabels.value;
}

function togglePlayerOptions(i) {
	if (showPlayerOptions.value === i) {
		showPlayerOptions.value = null;
	} else {
		showPlayerOptions.value = i;
	}
}

function toggleSingleCard() {
	singleCard.value = !singleCard.value;
}

function toggleRandomRotate() {
	cardRandomRotate.value = !cardRandomRotate.value;
}

function toggleOpenToolbar() {
	toolbarOpen.value = !toolbarOpen.value;
}

watch(playersNum, (newVal) => {
	switch (newVal) {
		case 2:
			playerBoardsRotates.value = [0, 180];
			break;
		case 3:
			playerBoardsRotates.value = [0, 120, 240];
			break;
		case 4:
			playerBoardsRotates.value = [0, 90, 180, 270];
			break;
		case 5:
			playerBoardsRotates.value = [0, 72, 144, 216, 288];
			break;
		case 6:
			playerBoardsRotates.value = [0, 60, 120, 180, 240, 300];
			break;
		default:
	}

	for (let x = 0; x < newVal; x++) {
		//if (playerHandicaps.value[x]) {
		//}
	}

	if (newVal >= 4) {
		singleCard.value = true;
		disableSingleCardBtn.value = true;
	} else {
		disableSingleCardBtn.value = false;
	}
});

watch(handicapChangeDisabled, (newVal) => {
	handicapChangeDisabled.value = false;
});

watch(turn, (newVal) => {
	gameStarted.value = true;
});
</script>

<style lang="scss">
@use "styles/styles.scss";
</style>

<style scoped lang="scss">
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
