<template>
	<div id="kevo_rapido">
		<KevoRapidoToolbar />
		<div class="board">
			<div class="zone_flipped_down">
				<img class="card" :src="`/img/back.png`" alt="" @click="newCard" />
			</div>
			<div class="zone_flipped_up">
				<KevoRapidoCard v-if="upcomingCard?.letter" class="upcoming_card" :card="upcomingCard" :key="upcomingCard.id" />
				<KevoRapidoCard v-if="currentCard?.letter" class="current_card" :card="currentCard" :key="currentCard.id" />
				<KevoRapidoPlayerBoard v-for="player in players" :player-id="player.id" :key="player.id" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { usePlayersStore } from "~/stores/kevo-rapido/players";

const { players } = storeToRefs(usePlayersStore());

const newCardBtnEnabled = ref(true);
const currentCard = ref({});
const upcomingCard = ref({});

const lettersBase =
	"AAAAAAAAAABBBBBBBBCCCCCCCDDDDDDDDEEEEEEEFFFFFFFFGGGGGHHHHHHHIIIIIJJJJJJJKKKKKLLLLLLLLLMMMMMMMMMMNNNNNNNNNNOOOOOOPPPPPPPPQQQRRRRRRRRRRSSSSSSSSSSTTTTTTTTTTTTUUUUVVVVVWWWWWWXXXYYYYZZZ";
const lettersCities =
	"AAAAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCCCCCCCCCCCDDDDDDDDDDDDDDDEEEEEEEFFFFFFFFGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHIIIIIIIIIIJJJJJJJJJJJKKKKKKKKKKKKKKKKKKKKKKKKKKKKKLLLLLLLLLLLLLLLLLLMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOOPPPPPPPPPPPPPPPPPPPPPPPQQQQRRRRRRRRRRRRRSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTTTTTTTTTTTTTTTTUUUUUVVVVVVVVVWWWWWWXXXYYYYYYYZZZZZZ";
const lettersCountries =
	"AAAAAAAAAAABBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCDDDDDEEEEEEEEFFFGGGGGGGGGGGHHHHIIIIIIIIJJJKKKKKLLLLLLLLLMMMMMMMMMMMMMMMMMMNNNNNNNNNNNOPPPPPPPPPPQRRRSSSSSSSSSSSSSSSSSSSSSSSSSSTTTTTTTTTTTUUUUUUUVVVYZZ";

const colors = ["blue", "green", "orange"];

const icons = [
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

function newCard() {
	if (!newCardBtnEnabled.value) return;

	newCardBtnEnabled.value = false;

	// Choose color
	const color = colors[Math.floor(Math.random() * colors.length)];

	// Choose category
	const icon = icons[Math.floor(Math.random() * icons.length)];

	// Choose letter
	let compendium = lettersBase;
	if (icon === "country") compendium = lettersCountries;
	if (icon === "city") compendium = lettersCities;
	const letter = compendium[Math.floor(Math.random() * compendium.length)];

	const card = {
		color,
		icon,
		letter,
		rotate: Math.round(Math.random() * 360),
	};

	card.id = `${card.color}-${card.icon}-${card.letter}-${card.rotate}`;

	upcomingCard.value = card;
}

watch(upcomingCard, (unfoldingCard) => {
	if (!unfoldingCard.letter) return;

	setTimeout(() => {
		currentCard.value = unfoldingCard;
		upcomingCard.value = {};
		newCardBtnEnabled.value = true;
	}, 1200);
});
</script>

<style lang="scss" scoped>
#kevo_rapido,
.board {
	pointer-events: all;
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: linear-gradient(to right bottom, #adf 0%, #88f 100%);
}

.board {
	display: flex;
	flex-flow: row nowrap;
}

.zone_flipped_down {
	flex: 0 0 20%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	.card {
		max-height: 50%;
		max-width: 50%;
	}
}

.zone_flipped_up {
	flex: 0 0 80%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	perspective: 800px;
	perspective-origin: 50% 50%;
	transform-style: preserve-3d;
}

@media (orientation: portrait) {
	#kevo_rapido {
		width: 100vh;
		height: 100vw;
		transform: translate(-50%, -50%) rotate(90deg);
	}

	.board {
		width: 100vh;
		height: 100vw;
	}
}
</style>
