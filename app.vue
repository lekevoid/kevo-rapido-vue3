<template>
	<NuxtPwaAssets />
	<NuxtPage />
</template>

<script setup></script>

<style lang="scss">
* {
	position: relative;
	box-sizing: border-box;
}

html {
	overscroll-behavior: none;
	overflow: hidden;
}

body {
	overscroll-behavior: none;
	overflow: hidden;
	margin: 0;
	padding: 0;
	font-family: Roboto;
}

div {
	display: block;
}

input,
textarea,
button,
select,
a {
	outline: none;
	-webkit-tap-highlight-color: transparent;
}
</style>
