<template>
    <div class="space-y-2">
        <UFormGroup class="flex flex-col" label="Cor predominante">
            <USelectMenu size="lg" v-model="localFormData.color" :options="colors"
                placeholder="Selecione a cor" />
        </UFormGroup>
        <UFormGroup class="flex flex-col" label="Porte">
            <USelectMenu size="lg" v-model="localFormData.size" :options="sizes"
                placeholder="Selecione a porte" />
        </UFormGroup>
        <UFormGroup class="flex flex-col" label="Nome">
            <UInput placeholder="" size="lg" v-model="localFormData.name" />
        </UFormGroup>
        <UFormGroup class="flex flex-col" label="Idade">
            <UInput placeholder="" type="number" size="lg" v-model="localFormData.age" />
        </UFormGroup>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useSpecie, type Specie } from '@/composables/useSpecie';
import { useBreed, type Breed } from '@/composables/useBreed';
import { useConstants } from '@/composables/useConstants';
const { sizes, colors } = useConstants();

interface FormData {
    color: string | undefined;
    size: string | undefined;
    name: string | undefined;
    age: string | undefined;
}

const props = defineProps<{
    modelValue: FormData;
}>();

const emit = defineEmits(['update:modelValue']);

const localFormData = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});
</script>
