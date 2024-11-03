<template>
    <div class="space-y-2">
        <div class="bg-amber-100 px-4 py-3 rounded-sm text-gray-900">
            Adicione a foto do pet. Usaremos essa foto em todas as ferramentas de divulgação, como cartazes, posts em
            redes sociais e anúncios.
        </div>

        <UFormGroup class="flex flex-col" label="Foto do pet">
            <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />
            <div class="flex flex-col items-center w-full border-2 border-dashed border-gray-400 rounded-md p-2 bg-amber-50"
                @click="triggerFileSelection">
                <UIcon name="i-heroicons-photo" class="w-14 h-14 text-gray-500" />
                <span class="text-gray-800">
                    Arraste uma imagem nesta área, ou clique para selecionar uma imagem.
                </span>
                <span class="mt-5 text-gray-700 text-sm">
                    Para obter máximo resultado, prefira fotos onde apareça apenas o seu pet em
                    evidência, sem escritos adicionais.
                </span>
            </div>
        </UFormGroup>
        <ImageCropper class="bg-amber-100 flex justify-center items-center" :visible="isCropperVisible"
            :imageSrc="selectedImage" @close="isCropperVisible = false" @crop="onImageCropped" />
    </div>
</template>


<script setup lang="ts">
import { computed, watch } from 'vue';
import { useSpecie } from '@/composables/useSpecie';
import { useBreed } from '@/composables/useBreed';

const props = defineProps({
    modelValue: Object,
});

const emit = defineEmits(['update:modelValue']);
const formData = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const fileInput = ref(null);
const selectedImage = ref('');
const isCropperVisible = ref(false);

function triggerFileSelection() {
    fileInput.value.click();
}

function onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.value = e.target?.result as string;
            isCropperVisible.value = true;
        };
        reader.readAsDataURL(file);
    }
}

function onImageCropped(croppedImage: string) {
    console.log('Imagem cortada:', croppedImage);
}

</script>