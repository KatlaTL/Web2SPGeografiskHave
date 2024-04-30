<script setup>
import { ref } from 'vue';
import GDPRModal from '@/components/EventComponets/GDPRModal.vue';
import { eventSignup } from '@/services/FormService';

const formData = ref({
    name: "",
    regionalCode: "",
    phone: "",
    email: "",
    numberOfParticipants: "",
    gdpr: false,
    newsletter: false
});

const isModalOpened = ref(false);
const isGDPRRead = ref(false);
const isRequired = ref(false);

const openModal = () => isModalOpened.value = true;

const closeModal = () => isModalOpened.value = false;

const checkGDPR = (event) => {
    if (isGDPRRead.value != true) {
        event.preventDefault();
    }
}

const acceptGDPR = () => {
    formData.value.gdpr = true;
    isGDPRRead.value = true;
    isModalOpened.value = false
}

const unwrapSignupData = ({ name, regionalCode, phone, email, numberOfParticipants }) => ({ name, regionalCode, phone, email, numberOfParticipants });

const submitForm = async () => {
    const signup = await eventSignup("test", unwrapSignupData(formData.value));

    console.log(signup)
}

const validateForm = () => {
    
}

</script>

<template>
    <div class="event-registration">
        <div class="event-registration-info">
            <h2>Tilmelding til Plantemarked d. 25-26 maj 2024</h2>
            <p><i>Medlemmer af Geografisk Haveklub og Geografisk Haves Venner har gratis entré.</i></p>
            <a href="https://www.place2book.com/da/sw2/sales/39pfs0v0xy" target="_blank"><i>Bestil dit
                    Haveklubmedlemskab
                    her</i></a>
        </div>

        <div class="event-registration-form">
            <form @submit.prevent="submitForm">
                <fieldset class="form-input-required">
                    <input id="input-name" type="text" placeholder="Navn" name="name"
                        v-model="formData.name" required />
                    <label for="input-name">Navn</label>
                </fieldset>

                <fieldset class="form-phone-fieldset">
                    <fieldset class="form-input-required">
                        <input id="input-regionCode" type="text" placeholder="Landekode" name="regionCode"
                            v-model="formData.regionalCode" required />
                        <label for="input-regionCode">Landekode</label>
                    </fieldset>
                    <fieldset class="form-input-required">
                        <input id="input-phone" type="text" placeholder="Telefon nummer" name="phone"
                            v-model="formData.phone" required>
                        <label for="input-phone">Telefon nummer</label>
                    </fieldset>
                </fieldset>

                <fieldset class="form-input-required">
                    <input id="input-email" type="email" placeholder="E-mail" name="email" v-model="formData.email"
                        required>
                    <label for="input-email">E-mail</label>
                </fieldset>

                <fieldset class="form-input-required">
                    <input id="input-amount" type="text" name="amount" placeholder="Antal"
                        v-model="formData.numberOfParticipants" required>
                    <label for="input-amount">Antal</label>
                </fieldset>

                <fieldset class="form-input-checkbox">
                    <fieldset>
                        <input id="input-newsletter" type="checkbox" name="newsletter" />
                        <label for="input-newsletter">Tilmeld vores nyhedsbrev</label>
                    </fieldset>

                    <fieldset>
                        <input id="input-gdpr" type="checkbox" name="gdpr" ref="gdpr" v-model="formData.gdpr"
                            @click="(event) => checkGDPR(event)" required>
                        <label>Godkend <span @click="openModal">Privatlivspolitik</span></label>
                    </fieldset>
                </fieldset>

                <button type="submit" @click="validateForm">Tilmeld</button>

                <GDPRModal :isOpen="isModalOpened" @modal-close="closeModal" @accept-gdpr="acceptGDPR" />
            </form>
        </div>
    </div>
</template>