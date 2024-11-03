<template>
    <div class="bg-cover bg-center h-screen bg-stone-100">
        <div class="flex h-screen">
            <div class="flex w-full flex-col">
                <form class="relative flex flex-col h-full justify-between" @submit.prevent="handleSubmit">
                    <div class="flex flex-col py-20 px-20 h-full items-center">
                        <div class="flex flex-col gap-3 w-3/4 justify-center h-full">
                            <div v-if="currentStep === 1">
                                <StepOne :modelValue="formData" @update:modelValue="updateFormData" />
                            </div>
                            <div v-if="currentStep === 2">
                                <StepTwo :modelValue="formData" @update:modelValue="updateFormData" />
                            </div>
                            <div v-if="currentStep === 3">
                                <StepThree :modelValue="formData" @update:modelValue="updateFormData" />
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-between w-full p-4 border-gray-800 bg-white items-center">
                        <UButton v-if="currentStep > 1" @click="goToPreviousStep" class="flex justify-center gap-x-1"
                            size="lg" icon="i-heroicons-chevron-left" color="amber" variant="outline">
                            Voltar
                        </UButton>

                        <UButton v-if="currentStep < totalSteps" @click="goToNextStep"
                            class="flex justify-center gap-x-1" size="lg" color="amber" variant="solid">
                            Prosseguir
                        </UButton>

                        <UButton v-if="currentStep === totalSteps" type="submit" class="flex justify-center gap-x-1"
                            size="lg" color="amber" variant="solid">
                            Finalizar
                        </UButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';

const totalSteps = 3;
const currentStep = ref(1);
const formData = ref({
    species: null,
    breed: null,
    gender: null,
});

function goToNextStep() {
    if (currentStep.value < totalSteps) {
        currentStep.value += 1;
    }
}

function goToPreviousStep() {
    if (currentStep.value > 1) {
        currentStep.value -= 1;
    }
}

function handleSubmit() {
    console.log("Dados do formulário:", formData.value);
}

function updateFormData(newData) {
  formData.value = { ...formData.value, ...newData };
}
</script>

<style scoped></style>