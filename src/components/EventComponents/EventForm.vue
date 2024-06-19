<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import GDPRModal from "@/components/EventComponents/GDPRModal.vue";
import { eventSignup, newsletterSignup } from "@/services/FormService";
import { reverse_debounce } from "@/helpers/debounce";
import {
  validateEmail,
  validateNumberOfParticipants,
  validatePhoneLength,
  validateRegionalCodeLength,
} from "@/helpers/validate";
import { useRoute } from "vue-router";

const route = useRoute();

const formData = ref({
  name: {
    value: "",
    invalid: false,
    required: true,
  },
  regionalCode: {
    value: "",
    invalid: false,
    required: true,
  },
  phone: {
    value: "",
    invalid: false,
    required: true,
  },
  email: {
    value: "",
    invalid: false,
    required: true,
  },
  numberOfParticipants: {
    value: "",
    invalid: false,
    required: true,
  },
  gdpr: {
    value: false,
    invalid: false,
    required: true,
  },
  newsletter: {
    value: false,
    invalid: false,
    required: false,
  },
});

const isModalOpened = ref(false);
const isGDPRRead = ref(false);
const isRegistrationCompleted = ref(false);
const registrationCompleted = ref(null);
const isInitailState = ref(true);
const generalErrorMessage = ref("");

const openModal = () => (isModalOpened.value = true);

const closeModal = () => (isModalOpened.value = false);

const checkGDPR = (event) => {
  if (isGDPRRead.value != true) {
    event.preventDefault();
  }
};

const acceptGDPR = () => {
  formData.value.gdpr.value = true;
  isGDPRRead.value = true;
  isModalOpened.value = false;
};

const unwrapSignupData = ({
  name,
  regionalCode,
  phone,
  email,
  numberOfParticipants,
}) => {
  return {
    name: name.value,
    regionalCode: regionalCode.value,
    phone: phone.value,
    email: email.value,
    numberOfParticipants: numberOfParticipants.value,
  };
};

const submitForm = async () => {
  const data = unwrapSignupData(formData.value);

  const validateData = validateFormData(data);

  if (Object.keys(validateData).length > 0) {
    for (const [key, value] of Object.entries(formData.value)) {
      value.errorMessage = "";
    }
    for (const [key, value] of Object.entries(validateData)) {
      formData.value[key].errorMessage = value;
    }
    return;
  }

  const signup = await eventSignup(route.params.eventID, data);

  if (!signup.error) {
    if (formData.value.newsletter.value) {
      await newsletterSignup(data.email, data.name);
    }

    for (const [key, value] of Object.entries(formData.value)) {
      if (key === "gdpr" || key === "newsletter") {
        value.value = false;
      } else {
        value.value = "";
      }
      value.errorMessage = "";
    }
    isInitailState.value = false;
    isRegistrationCompleted.value = true;
  } else {
    generalErrorMessage.value = signup.error.userFriendlyMessage;
  }
};

//Vue Event modifiers chaining doesn't work with prevent and once. So wrapped submitForm in a debounce
//Prevent future clicks until 1000 ms (1 sec) after the last click
const debounceSubmitForm = reverse_debounce(submitForm, 1000);

const validateForm = () => {
  for (const [key, value] of Object.entries(formData.value)) {
    if (!value.value) {
      value.invalid = true;
    } else {
      value.invalid = false;
    }
  }
};

const validateFormData = (data) => {
  const error = {};

  if (!validateEmail(data?.email)) {
    error.email = "Ugyldig email";
  }

  if (!validatePhoneLength(data?.phone)) {
    error.phone = "Telefonnummeret skal være 8 tegn";
  }

  if (!validateRegionalCodeLength(data?.regionalCode)) {
    error.regionalCode = "Landekoden skal være 2 tegn";
  }

  if (!validateNumberOfParticipants(data?.numberOfParticipants)) {
    error.numberOfParticipants = "Deltager antallet skal være mellem 1 og 30";
  }

  return error;
};

onClickOutside(
  registrationCompleted,
  () => (isRegistrationCompleted.value = false)
);

defineProps({
  formText: String,
});
</script>

<template>
  <div
    class="event-registration flex flex-row xsm:w-[350px] xsm:h-[560px] sm:w-[420px] mdsm:w-[700px] mdsm:h-[560px] md:w-[900px] md:h-[570px]"
  >
    <div class="event-registration-info mx-8" v-html="formText"></div>

    <div class="event-registration-form">
      <form @submit.prevent="debounceSubmitForm">
        <fieldset class="form-input-required">
          <input
            id="input-name"
            :class="{
              required: formData.name.required && formData.name.invalid,
            }"
            type="text"
            placeholder="Navn"
            name="name"
            v-model="formData.name.value"
            required
            class="xsm:w-[140px] sm:w-[200px] mdsm:w-[400px]"
          />
          <label
            for="input-name"
            :class="{ show: formData.name.value.length > 0 }"
            >Navn</label
          >
        </fieldset>

        <fieldset class="form-phone-fieldset">
          <fieldset class="form-input-required">
            <input
              id="input-regionCode"
              :class="{
                required:
                  formData.regionalCode.required &&
                  formData.regionalCode.invalid,
              }"
              type="text"
              placeholder="Landekode"
              name="regionCode"
              v-model="formData.regionalCode.value"
              required
              class="xsm:w-[140px] sm:w-[117px] mdsm:w-[117px]"
            />
            <label
              for="input-regionCode"
              :class="{ show: formData.regionalCode.value.length > 0 }"
              >Landekode</label
            >
          </fieldset>
          <fieldset class="form-input-required">
            <input
              id="input-phone"
              :class="{
                required: formData.phone.required && formData.phone.invalid,
              }"
              type="text"
              placeholder="Telefon nummer"
              name="phone"
              v-model="formData.phone.value"
              required
              class="xsm:w-[140px] sm:w-[200px] mdsm:w-[400px]"
            />
            <label
              for="input-phone"
              :class="{ show: formData.phone.value.length > 0 }"
              >Telefon nummer</label
            >
          </fieldset>

          <p
            v-show="formData.regionalCode.errorMessage"
            class="form-error-message"
          >
            {{ formData.regionalCode.errorMessage }}
          </p>

          <p v-show="formData.phone.errorMessage" class="form-error-message">
            {{ formData.phone.errorMessage }}
          </p>
        </fieldset>

        <fieldset class="form-input-required">
          <input
            id="input-email"
            :class="{
              required: formData.email.required && formData.email.invalid,
            }"
            type="email"
            placeholder="E-mail"
            name="email"
            v-model="formData.email.value"
            required
            class="xsm:w-[140px] sm:w-[200px] mdsm:w-[400px]"
          />
          <label
            for="input-email"
            :class="{ show: formData.email.value.length > 0 }"
            >E-mail</label
          >

          <p v-show="formData.email.errorMessage" class="form-error-message">
            {{ formData.email.errorMessage }}
          </p>
        </fieldset>

        <fieldset class="form-input-required">
          <input
            id="input-amount"
            :class="{
              required:
                formData.numberOfParticipants.required &&
                formData.numberOfParticipants.invalid,
            }"
            type="text"
            name="amount"
            placeholder="Antal"
            v-model="formData.numberOfParticipants.value"
            required
          />
          <label
            for="input-amount"
            :class="{ show: formData.numberOfParticipants.value.length > 0 }"
            >Antal</label
          >

          <p
            v-show="formData.numberOfParticipants.errorMessage"
            class="form-error-message"
          >
            {{ formData.numberOfParticipants.errorMessage }}
          </p>
        </fieldset>

        <fieldset class="form-input-checkbox">
          <fieldset>
            <input
              id="input-newsletter"
              :class="{
                required:
                  formData.newsletter.required && formData.newsletter.invalid,
              }"
              type="checkbox"
              name="newsletter"
              v-model="formData.newsletter.value"
            />
            <label for="input-newsletter">Tilmeld vores nyhedsbrev</label>
          </fieldset>

          <fieldset>
            <input
              id="input-gdpr"
              :class="{
                required: formData.gdpr.required && formData.gdpr.invalid,
              }"
              type="checkbox"
              name="gdpr"
              ref="gdpr"
              v-model="formData.gdpr.value"
              @click="(event) => checkGDPR(event)"
              required
            />
            <label
              >Godkend <span @click="openModal">Privatlivspolitik</span></label
            >
          </fieldset>
        </fieldset>

        <button
          type="submit"
          @click="validateForm"
          class="sm:w-[150px] sm:text-[20px] mdsm:text-[32px] mdsm:w-[250px] 2xl:w-[300px]"
        >
          Tilmeld
        </button>

        <p v-show="generalErrorMessage" class="form-error-general-message">
          {{ generalErrorMessage }}
        </p>

        <GDPRModal
          :isOpen="isModalOpened"
          @modal-close="closeModal"
          @accept-gdpr="acceptGDPR"
        />
      </form>
    </div>
    <div
      class="event-registration-completed"
      :class="{ show: isRegistrationCompleted, initailState: isInitailState }"
      ref="registrationCompleted"
    >
      <h3>Tak for din tilmelding!</h3>
    </div>
  </div>
</template>
