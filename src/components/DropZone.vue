<template>
	<div
		@dragenter.prevent="toggleActive"
		@dragleave.prevent="toggleActive"
		@dragover.prevent
		@drop.prevent="toggleActive"
		:class="{ 'active-dropzone': active }"
		class="dropzone"
	>
		<span>Suelta tu archivo</span>
		<span>o</span>
		<label class="btn" for="dropzoneFile">Selecciona</label>
		<input type="file" id="dropzoneFile" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);

const toggleActive = () => {
	active.value = !active.value;
};
</script>

<style scoped lang="scss">
.dropzone {
	width: 40%;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	row-gap: 16px;
	border: 2px dashed #0b231e !important;
	background-color: #fff;
	transition: 0.3s ease all;

	label {
		padding: 8px 12px;
		color: #fff;
		background-color: #235b4e;
		transition: 0.3s ease all;
	}

	input {
		display: none;
	}
}

.active-dropzone {
	color: #fff;
	border-color: #fff;
	background-color: #86918f;

	label {
		background-color: #235b4e;
		transition: 0.3s ease all;
	}
}
@media screen and (max-width: 772px) {
	.dropzone {
		width: 90%;
	}
}
</style>
