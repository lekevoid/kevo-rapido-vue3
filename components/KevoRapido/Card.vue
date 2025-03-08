<template>
	<div :class="['Card', color]">
		<div class="back">
			<img :src="`/img/back.png`" alt="" />
		</div>
		<div class="front" :style="`--random-rotate:${rotate}deg;`">
			<div :class="['icons_wrapper', { combo: Array.isArray(category) }]">
				<img v-for="icon in icons" class="icon" :src="`/img/${icon}_${color}.png`" alt="" />
			</div>
			<div class="letter">
				{{ letter }}
			</div>
		</div>
	</div>
</template>

<script setup>
const { card } = defineProps({
	card: { type: Object, required: true },
});

const { color, category, letter, rotate } = card;

const icons = computed(() => {
	if (Array.isArray(category)) return category;
	return [category];
});
</script>

<style lang="scss" scoped>
@keyframes flipCard {
	0% {
		left: -12%;
		transform: translateX(-50%) translateY(-50%) rotate3d(0, 1, 0, 180deg) scale(0.4);
		perspective: 600px;
		transform-style: preserve-3d;
	}

	60% {
		left: 0%;
		transform: translateX(-0%) translateY(-50%) translateZ(200px) rotate3d(-2, 1, 0, -180deg) scale(1);
	}

	90% {
		left: 25%;
		transform: translateX(-50%) translateY(-50%) translateZ(60px) rotate3d(-2, 1, 0, -0deg) scale(1);
	}

	100% {
		left: 50%;
		transform: translateX(-50%) translateY(-50%) translateZ(1px) rotate3d(0, 0, 0, 0deg) scale(1);
	}
}

.Card {
	--card-size: min(60vmin, 350px);
	height: 1em;
	width: 1em;
	border-radius: 1000px;
	font-size: var(--card-size);
	transform-style: preserve-3d;
	perspective: 600px;
	position: absolute;
	left: 50%;
	top: 50%;
	color: var(--color);
	transform: translate(-50%, -50%);
	z-index: 10;
	transform-origin: center center;

	&.blue {
		--color: #2057a3;
		--light-color: #90b4dd;
	}

	&.green {
		--color: #5aa320;
		--light-color: #bbdf7e;
	}

	&.orange {
		--color: #f26b15;
		--light-color: #f3b16d;
	}

	&.upcoming_card {
		z-index: 20;
		animation: flipCard 1s ease 0s 1 forwards;
	}
}

.front {
	border: 20px solid var(--color);
	border-radius: 1000px;
	height: 100%;
	background-color: var(--light-color);
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 0;
	padding: 0.1em;
	top: 0;
	transform: rotate(var(--random-rotate));
}

.icons_wrapper {
	flex: 0 0 60%;
	max-width: 60%;
	position: relative;
	max-height: 100%;
	aspect-ratio: 1;

	.icon {
		object-fit: contain;
		object-position: center;
		position: absolute;
	}

	&:not(.combo) {
		.icon {
			max-width: 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	&.combo {
		.icon {
			max-width: 60%;
			transform: none;
		}

		.icon:first-child {
			left: 0;
			top: 0;
		}

		.icon:last-child {
			right: 0;
			bottom: 0;
			transform: none;
		}
	}
}

.letter {
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 40%;
	flex: 0 0 40%;
	padding-left: 10%;
	font-size: 0.25em;
	font-weight: 900;
	/* border: 1px solid purple; */
	aspect-ratio: 1;
}

.back {
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	transform: translateZ(-1px) rotate3d(0, 1, 0, 180deg);

	img {
		height: 100%;
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
}
</style>
