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
				<KevoRapidoPlayerBoard v-for="(player, k) in players" :player="player" :key="k" />
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

const lettersMR =
	"AAAAAAAAAABBBBBBBBCCCCCCCDDDDDDDDEEEEEEEFFFFFFFFGGGGGHHHHHHHIIIIIJJJJJJJKKKKKLLLLLLLLLMMMMMMMMMMNNNNNNNNNNOOOOOOPPPPPPPPQQQRRRRRRRRRRSSSSSSSSSSTTTTTTTTTTTTUUUUVVVVVWWWWWWXXXYYYYZZZ";
const lettersScrabbleFR = "AAAAAAAAABBCCDDDEEEEEEEEEEEEEEEFFGGHHIIIIIIIIJKLLLLLMMMNNNNNNOOOOOOPPQRRRRRRSSSSSSTTTTTTUUUUUUVVWXYZ";
const lettersScrabbleEN = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
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
];

function newCard() {
	if (!newCardBtnEnabled.value) return;

	newCardBtnEnabled.value = false;

	const card = {
		color: colors[Math.floor(Math.random() * colors.length)],
		icon: icons[Math.floor(Math.random() * icons.length)],
		letter: lettersMR[Math.floor(Math.random() * lettersMR.length)],
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

watch(currentCard, (newVal) => {
	console.log(newVal);
});
</script>

<style lang="scss">
html {
}

body {
	margin: 0;
	padding: 0;
}

div {
	display: block;
}

* {
	position: relative;
	box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
#kevo_rapido,
.board {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: linear-gradient(to right bottom, #adf 0%, #88f 100%);
}

.board {
	border: 1px solid red;
	display: flex;
	flex-flow: row nowrap;
}

.zone_flipped_down {
	border: 1px solid blue;
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
	border: 1px solid green;
	flex: 0 0 80%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: center;
	perspective: 800px;
	perspective-origin: 50% 50%;
	transform-style: preserve-3d;
}
</style>
