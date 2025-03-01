<template>
	<div class="card_zone">
		<div v-if="gameStarted" :class="['card', currentCard.color]" :style="rotateCard">
			<div class="icon">
				<img :src="icon" />
			</div>
			<div class="letter">{{ currentCard.letter }}</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

import adjective_blue from "../img/adjective_blue.png";
import adjective_green from "../img/adjective_green.png";
import adjective_orange from "../img/adjective_orange.png";
import animal_blue from "../img/animal_blue.png";
import animal_green from "../img/animal_green.png";
import animal_orange from "../img/animal_orange.png";
import book_blue from "../img/book_blue.png";
import book_green from "../img/book_green.png";
import book_orange from "../img/book_orange.png";
import brand_blue from "../img/brand_blue.png";
import brand_green from "../img/brand_green.png";
import brand_orange from "../img/brand_orange.png";
import celebrity_blue from "../img/celebrity_blue.png";
import celebrity_green from "../img/celebrity_green.png";
import celebrity_orange from "../img/celebrity_orange.png";
import city_blue from "../img/city_blue.png";
import city_green from "../img/city_green.png";
import city_orange from "../img/city_orange.png";
import country_blue from "../img/country_blue.png";
import country_green from "../img/country_green.png";
import country_orange from "../img/country_orange.png";
import cover from "../img/cover.png";
import event_blue from "../img/event_blue.png";
import event_green from "../img/event_green.png";
import event_orange from "../img/event_orange.png";
import fictional_character_blue from "../img/fictional_character_blue.png";
import fictional_character_green from "../img/fictional_character_green.png";
import fictional_character_orange from "../img/fictional_character_orange.png";
import food_blue from "../img/food_blue.png";
import food_green from "../img/food_green.png";
import food_orange from "../img/food_orange.png";
import game_blue from "../img/game_blue.png";
import game_green from "../img/game_green.png";
import game_orange from "../img/game_orange.png";
import houseware_blue from "../img/houseware_blue.png";
import houseware_green from "../img/houseware_green.png";
import houseware_orange from "../img/houseware_orange.png";
import location_blue from "../img/location_blue.png";
import location_green from "../img/location_green.png";
import location_orange from "../img/location_orange.png";
import movie_blue from "../img/movie_blue.png";
import movie_green from "../img/movie_green.png";
import movie_orange from "../img/movie_orange.png";
import mythology_blue from "../img/mythology_blue.png";
import mythology_green from "../img/mythology_green.png";
import mythology_orange from "../img/mythology_orange.png";
import name_blue from "../img/name_blue.png";
import name_green from "../img/name_green.png";
import name_orange from "../img/name_orange.png";
import object_blue from "../img/object_blue.png";
import object_green from "../img/object_green.png";
import object_orange from "../img/object_orange.png";
import plant_blue from "../img/plant_blue.png";
import plant_green from "../img/plant_green.png";
import plant_orange from "../img/plant_orange.png";
import profession_blue from "../img/profession_blue.png";
import profession_green from "../img/profession_green.png";
import profession_orange from "../img/profession_orange.png";
import song_blue from "../img/song_blue.png";
import song_green from "../img/song_green.png";
import song_orange from "../img/song_orange.png";
import verb_blue from "../img/verb_blue.png";
import verb_green from "../img/verb_green.png";
import verb_orange from "../img/verb_orange.png";

const { single, showScores, gameStarted, currentCard, singleCardRotation, randomRotate, staticRotate } = defineProps({
	single: { type: Boolean },
	showScores: { type: Boolean },
	gameStarted: { type: Boolean },
	currentCard: { type: Object },
	singleCardRotation: { type: Number },
	randomRotate: { type: Boolean },
	staticRotate: { type: Number },
});

const icon = computed(() => {
	const allIcons = {
		animal_blue: animal_blue,
		animal_green: animal_green,
		animal_orange: animal_orange,
		celebrity_blue: celebrity_blue,
		celebrity_green: celebrity_green,
		celebrity_orange: celebrity_orange,
		city_blue: city_blue,
		city_green: city_green,
		city_orange: city_orange,
		country_blue: country_blue,
		country_green: country_green,
		country_orange: country_orange,
		cover: cover,
		food_blue: food_blue,
		food_green: food_green,
		food_orange: food_orange,
		movie_blue: movie_blue,
		movie_green: movie_green,
		movie_orange: movie_orange,
		name_blue: name_blue,
		name_green: name_green,
		name_orange: name_orange,
		object_blue: object_blue,
		object_green: object_green,
		object_orange: object_orange,
		plant_blue: plant_blue,
		plant_green: plant_green,
		plant_orange: plant_orange,
		profession_blue: profession_blue,
		profession_green: profession_green,
		profession_orange: profession_orange,
		book_blue: book_blue,
		book_green: book_green,
		book_orange: book_orange,
		adjective_blue: adjective_blue,
		adjective_green: adjective_green,
		adjective_orange: adjective_orange,
		brand_blue: brand_blue,
		brand_green: brand_green,
		brand_orange: brand_orange,
		event_blue: event_blue,
		event_green: event_green,
		event_orange: event_orange,
		fictional_character_blue: fictional_character_blue,
		fictional_character_green: fictional_character_green,
		fictional_character_orange: fictional_character_orange,
		game_blue: game_blue,
		game_green: game_green,
		game_orange: game_orange,
		houseware_blue: houseware_blue,
		houseware_green: houseware_green,
		houseware_orange: houseware_orange,
		location_blue: location_blue,
		location_green: location_green,
		location_orange: location_orange,
		mythology_blue: mythology_blue,
		mythology_green: mythology_green,
		mythology_orange: mythology_orange,
		song_blue: song_blue,
		song_green: song_green,
		song_orange: song_orange,
		verb_blue: verb_blue,
		verb_green: verb_green,
		verb_orange: verb_orange,
	};

	return allIcons[currentCard.type.toLowerCase() + "_" + currentCard.color.toLowerCase()];
});

const rotateCard = computed(() => {
	if (randomRotate) {
		return {
			transform: "rotate(" + singleCardRotation + "deg)",
		};
	}
	return {
		transform: "rotate(" + staticRotate + "deg)",
	};
});
</script>
