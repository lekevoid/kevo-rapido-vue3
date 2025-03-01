<template>
	<div :class="['player_board', { hide: hideBoard }]" :style="rotate">
		<Card :gameStarted="gameStarted" :currentCard="currentCard"></Card>
		<div class="options">
			<div class="row">
				<button class="minus" @click="changeScore(-1)" :disabled="scoreChangeDisabled"><img :src="btn_minus" /></button>
				<div :class="['score', { hidden: showScores }]">{{ score }}</div>
				<button class="plus" @click="changeScore(1)" :disabled="scoreChangeDisabled"><img :src="btn_plus" /></button>
				<div :class="['confirm_score_change', confirmScoreChangeState, { hidden: !showScores }]">
					<img class="plus" :src="thumbsup" />
					<img class="minus" :src="sad" />
				</div>
			</div>
			<div class="row">
				<button class="rotate" v-dragged.prevent="rotateBoard"><img :src="rotate_arrows" /></button>
				<!-- <button class="toggle_options" @click="toggleOptions()">Options</button> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import Card from "./Card.vue";

import btn_minus from "../img/btn_minus.svg";
import btn_plus from "../img/btn_plus.svg";
import thumbsup from "../img/icon_thumbsup.svg";
import rotate_arrows from "../img/rotate_arrows.png";
import sad from "../img/icon_sad.svg";

const { playerNum, gameStarted, handicap, single, showScores, rotateOrigValue, currentCard, turn } = defineProps({
	playerNum: { type: Number },
	gameStarted: { type: Boolean },
	handicap: { type: Number },
	single: { type: Boolean },
	showScores: { type: Boolean },
	rotateOrigValue: { type: Number },
	currentCard: { type: Object },
	turn: { type: Number },
});

const score = ref(0);
const confirmScoreChangeState = ref("");
const scoreChangeDisabled = ref(false);
const boardIsRotating = ref(false);
const rotateValue = ref(rotateOrigValue);
const hideBoard = ref(false);
const handicapChangeDisabled = ref(false);

const rotate = computed(() => {
	return {
		transform: "translateX(-50%) rotate(" + rotateValue.value + "deg)",
	};
});

function changeScore(val) {
	if (score.value + val >= 0) {
		if (val < 0) {
			confirmScoreChangeState.value = "minus";
		} else {
			confirmScoreChangeState.value = "plus";
		}
		scoreChangeDisabled.value = true;

		score.value += val;
		setTimeout(() => {
			resetConfirmState();
		}, 500);
	}
}

function resetConfirmState() {
	confirmScoreChangeState.value = "";
	scoreChangeDisabled.value = false;
	handicapChangeDisabled.value = false;
}

function rotateBoard({ el, deltaX, deltaY, offsetX, offsetY, clientX, clientY, first, last }) {
	console.log("draggggg");

	if (first) {
		isDragging.value = true;
		return;
	}
	if (last) {
		isDragging.value = false;
		return;
	}

	if (rotateValue.value % 360 < 90) {
		rotateValue.value = rotateValue.value - deltaX / 5 - deltaY / 5;
	} else if (rotateValue.value % 360 < 180) {
		rotateValue.value = rotateValue.value + deltaX / 5 - deltaY / 5;
	} else if (rotateValue.value % 360 < 270) {
		rotateValue.value = rotateValue.value + deltaX / 5 + deltaY / 5;
	} else {
		rotateValue.value = rotateValue.value - deltaX / 5 + deltaY / 5;
	}

	if (rotateValue.value > 360) {
		rotateValue.value = 0;
	}

	if (rotateValue.value < 0) {
		rotateValue.value = 359;
	}
}

/* function toggleHideBoard() {
	hideBoard.value = !hideBoard.value;
} */

/* function toggleOptions() {
				this.$parent.togglePlayerOptions(playerNum.value);
			} */

/* watch(turn, () => {
	if (handicap.value > 0) {
		const timer = handicap.value * 1000;
		toggleHideBoard();
		setTimeout(() => {
			toggleHideBoard();
		}, timer);
	}
}); */
</script>
