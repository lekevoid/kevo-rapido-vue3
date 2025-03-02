<template>
	<NuxtPwaAssets />
	<NuxtPage />
</template>

<script setup></script>

<style lang="scss">
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

* {
	position: relative;
	box-sizing: border-box;
}
</style>
