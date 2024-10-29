<template>
    <div v-if="visible">
        <div class="cropper-wrapper w-full">
            <Cropper 
                :src="imageSrc" 
                ref="cropper"
                :stencil-props="{ aspectRatio: 1, movable: true, scalable: false, resizable: false }"
                :stencil-size="{ width: 300, height: 300 }"
                :auto-zoom="true"
                :zoom="{ factor: 0, center: 0 }"
                :background-color="'#fffbeb'"
                :style="{ height: '200px', width: '100%' }" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps({
    imageSrc: String,
    visible: Boolean,
});

const emit = defineEmits(['close', 'crop']);

const cropper = ref(null);

function close() {
    emit('close');
}

async function cropImage() {
    const canvas = cropper.value?.getResult()?.canvas;
    if (canvas) {
        const croppedImage = canvas.toDataURL();
        emit('crop', croppedImage);
        close();
    }
}
</script>

<style scoped>
.cropper-wrapper {
    background-color: #fffbeb;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
