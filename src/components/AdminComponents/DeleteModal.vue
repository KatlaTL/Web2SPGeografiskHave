<script setup>
import { ref, watch } from "vue";
import { isObject, onClickOutside } from '@vueuse/core';

const props = defineProps({
    isOpen: Boolean,
    itemID: String
});

const emit = defineEmits(["modal-close", "accept-delete", "cancel-delete"]);

const target = ref(null);

onClickOutside(target, () => emit('modal-close'));

watch(target, () => target.value?.scrollIntoView(false));

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container" ref="target">
                <div class="modal-body">
                    <p>Er du sikker på at du vil slette dette item? ID: {{ itemID }}</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn" @click.prevent="emit('accept-delete')">Accept</button>
                    <button class="modal-btn" @click.prevent="emit('cancel-delete')">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-mask {
    position: absolute;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 320px;
    height: 130px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: hidden;
}

.modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.modal-btn {
    background-color: var(--headerColor);
    color: var(--whiteColor);
    font-size: 15px;
    height: 23px;
    width: 126px;
    border: none;
    cursor: pointer;
}

.modal-btn:hover {
    background-color: #7FA761;
}
</style>