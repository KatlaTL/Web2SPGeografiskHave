<script setup>
import { uploadImageToStorage, createEvent, getAllEvents, deleteEvent } from "@/services/adminServices/AdminEventService";
import DeleteModal from '@/components/AdminComponents/DeleteModal.vue';
import Editor from "@tinymce/tinymce-vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import { onMounted, ref, watch } from "vue";

const initialState = () => {
    return {
        contentHeading: "",
        firstParagraph: "",
        secondParagraph: "",
        formText: "",
        category: "event",
        date: "",
        tileTitle: "",
        tileText: "",
        thumbnailAltText: "",
        previewThumbnailImageURL: "",
        contentImageAltText: "",
        previewContentImageURL: ""
    }
}

const contentObj = ref(initialState());
const content = ref("");
const formText = ref("");
const eventList = ref(null);
const selectedEvent = ref("");
const selectedEventID = ref(null);
const isModalOpened = ref(false);

const errorMessage = ref("");
const succesMessage = ref("");

const tileSubPath = ref("Events/");

watch(() => contentObj.value.category, () => {
    if (contentObj.value.category === "event") tileSubPath.value = "Events/";
    if (contentObj.value.category === "tour") tileSubPath.value = "Tours/";
})

watch(selectedEvent, () => {
    const event = eventList.value[selectedEvent.value];

    if (!event) {
        return;
    }

    contentObj.value.category = event?.category;
    contentObj.value.date = event?.dateRange.map(date => date.toDate());
    contentObj.value.tileTitle = event?.titel;
    contentObj.value.tileText = event?.text;
    contentObj.value.thumbnailAltText = event?.thumbnailAltText;
    contentObj.value.previewThumbnailImageURL = event?.thumbnailSrc;

    contentObj.value.contentHeading = event?.content?.contentHeading;
    contentObj.value.firstParagraph = event?.content?.firstParagraph;
    contentObj.value.secondParagraph = event?.content?.secondParagraph;
    contentObj.value.formText = event?.content?.formText;
    contentObj.value.previewContentImageURL = event?.content?.imageURL;
    contentObj.value.contentImageAltText = event?.content?.imageAltText;

    content.value = `<div class="contentHeading" style="color: red;">${event?.content?.contentHeading}</div>
        <div class="contentFirstParagraphHeading" style="color: green;">${event?.content?.firstParagraph}</div>
        <div class="contentSecondParagraphHeading" style="color: blue;">${event?.content?.secondParagraph}</div>`;

    formText.value = event?.content?.formText;

    selectedEventID.value = eventList.value[selectedEvent.value].id;
})

onMounted(() => loadEvents());

const loadEvents = async () => {
    const result = await getAllEvents();
    console.log(result.result)
    if (result.result) {
        eventList.value = result.result;
    }
}

const uploadImage = async (e, filePath, previewToUse) => {
    if (previewToUse === "content") {
        contentObj.value.previewContentImageURL = await uploadImageToStorage(e.target.files[0], filePath);
    }

    if (previewToUse === "tile") {
        contentObj.value.previewThumbnailImageURL = await uploadImageToStorage(e.target.files[0], filePath);
    }
}

const handleDeleteEvent = async (eventID) => {
    const result = await deleteEvent(eventID);

    if (result.error) {
        errorMessage.value = result.error?.userFriendlyMessage;
        succesMessage.value = "";
    } else {
        errorMessage.value = "";
        succesMessage.value = "Eventet er blevet slettet";
        contentObj.value = initialState();
        closeModal();
        loadEvents();
        content.value = "";
        formText.value = "";
    }
}

const handleAddEvent = async () => {
    const parser = new DOMParser();

    const contentHTML = parser.parseFromString(content.value, "text/html");
    const formTextHTML = parser.parseFromString(formText.value, "text/html");

    contentObj.value.contentHeading = contentHTML.querySelector(".contentHeading")?.innerHTML.trim();
    contentObj.value.firstParagraph = wrapContent(".contentFirstParagraphHeading", contentHTML);
    contentObj.value.secondParagraph = wrapContent(".contentSecondParagraphHeading", contentHTML);

    contentObj.value.formText = formTextHTML.querySelector("body")?.innerHTML.trim();

    const result = await createEvent(contentObj.value);

    if (result?.error) {
        errorMessage.value = result.error?.userFriendlyMessage;
        succesMessage.value = "";
    } else {
        errorMessage.value = "";
        succesMessage.value = "Eventet er blevet oprettet";
        contentObj.value = initialState();
        content.value = "";
        formText.value = "";
    }
};

const wrapContent = (className, DOM) => {
    let paragraph = "";
    let paragraphGroup = "";

    DOM.querySelector(className)?.innerHTML.trim().split("\n").forEach((item, index, array) => {

        if (item.startsWith("p", 1) && item.endsWith("p", item.length - 1)) {
            paragraphGroup += item;
        }

        if (item.startsWith("h2", 1) && item.endsWith("h2", item.length - 1)) {
            if (paragraphGroup != "") {
                paragraph += `<div>${paragraphGroup}</div>`;
            }
            paragraph += `<div>${item}</div>`;
        }

        if (array.length - 1 === index && paragraphGroup != "") {
            paragraph += `<div>${paragraphGroup}</div>`;
        }

    });

    return paragraph;
}

const dateFormat = (date) => {
    let dateString = "";

    date.forEach((d, index) => {
        if (index === date.length - 1 && date.length > 1) {
            dateString += " - "
        }
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const hours = d.getHours();
        let minutes = d.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        dateString += `${day}/${month}-${year} ${hours}:${minutes}`;
    })

    return dateString;
}


const openModal = () => isModalOpened.value = true;

const closeModal = () => isModalOpened.value = false;

const acceptModal = async () => await handleDeleteEvent(selectedEventID.value);
</script>


<template>

    <div class="admin-event">
        <h2>Tilføj, slet eller redigere events og rundvisninger</h2>

        <form @submit.prevent="">
            <h3>Vælg event fra listen for at redigere eller slette det</h3>
            <select name="events" v-model="selectedEvent">
                <option disabled value="">Vælg event</option>
                <option v-for="event, index in eventList" :value="index">{{ event.titel }}</option>
            </select>
        </form>
        <hr />

        <div class="admin-event-form">
            <form @submit.prevent="">
                <h3>Vælg kategori</h3>
                <select name="category" v-model="contentObj.category">
                    <option value="event" :selected="contentObj.category === 'event'">Event</option>
                    <option value="tour" :selected="contentObj.category === 'tour'">Rundvisning</option>
                </select>
            </form>

            <div class="date-picker">
                <h3>Vælg en dato</h3>
                <VueDatePicker v-model="contentObj.date" :format="dateFormat" :range="{ maxRange: 5 }" />
            </div>

            <form @submit.prevent="">
                <h3>Tile title</h3>
                <input type="text" placeholder="Tile Titel" v-model="contentObj.tileTitle" />

                <h3>Tile tekst</h3>
                <input type="text" placeholder="Tile Tekst" v-model="contentObj.tileText" />

                <h3>Upload tile billede</h3>
                <input class="uploader" type="file" accept="image/*"
                    @change="(e) => uploadImage(e, `Calendar/${tileSubPath}`, 'tile')" />
                <input type="text" placeholder="Billede alt tekst" v-model="contentObj.thumbnailAltText" />
            </form>

            <div v-show="contentObj.previewThumbnailImageURL">
                <img class="preview" height="78" width="64" :src="contentObj.previewThumbnailImageURL">
            </div>
        </div>

        <div class="admin-event-form">
            <h3>Tilføj indholdet til eventet eller rundvisningen</h3>

            <Editor v-model="content" api-key="wxgn1powgxd69sy9kfqz73tgztmnxz1lmqjktebfa296ll9c" :init="{
                toolbar: 'undo redo | styles | bold italic | code',
                plugins: 'code',
                menubar: '',
                width: 800,
                height: 700,
                formats: {
                    contentHeading: { block: 'div', classes: 'contentHeading', styles: { 'color': 'red' }, wrapper: true, exact: true },
                    firstParagraph: { block: 'div', classes: 'contentFirstParagraphHeading', styles: { 'color': 'green' }, wrapper: true, exact: true },
                    secondParagraph: { block: 'div', classes: 'contentSecondParagraphHeading', styles: { 'color': 'blue' }, wrapper: true, exact: true },
                },
                style_formats: [
                    { title: 'Content Heading', format: 'contentHeading' },
                    { title: 'First Paragraph', format: 'firstParagraph' },
                    { title: 'Second Paragraph', format: 'secondParagraph' },
                    {
                        title: 'Headings', items: [
                            { title: 'Content heading', format: 'h1' },
                            { title: 'Paragraph heading', format: 'h2' },
                        ]
                    },
                    {
                        title: 'Inline', items: [
                            { title: 'Bold', format: 'bold' },
                            { title: 'Italic', format: 'italic' },
                            { title: 'Underline', format: 'underline' },
                            { title: 'Strikethrough', format: 'strikethrough' }
                        ]
                    },
                ]

            }" />

            <div class="admin-event-form-uploader">
                <h3>Upload billede til indholdet</h3>
                <form @submit.prevent="">
                    <input class="uploader" type="file" accept="image/*"
                        @change="(e) => uploadImage(e, 'eventsContent/', 'content')" />
                    <input type="text" placeholder="Billede alt tekst" v-model="contentObj.contentImageAltText" />
                </form>

                <div v-show="contentObj.previewContentImageURL">
                    <img class="preview" height="78" width="64" :src="contentObj.previewContentImageURL">
                </div>
            </div>

        </div>

        <div class="admin-event-form">
            <h3>Tilføj teksten til tilmeldingsformularen</h3>

            <Editor v-model="formText" api-key="wxgn1powgxd69sy9kfqz73tgztmnxz1lmqjktebfa296ll9c" :init="{
                toolbar: 'undo redo | styles | bold italic | code',
                plugins: 'code',
                menubar: '',
                width: 800,
                height: 300,
                style_formats: [
                    { title: 'Heading', format: 'h2' },
                    {
                        title: 'Inline', items: [
                            { title: 'Bold', format: 'bold' },
                            { title: 'Italic', format: 'italic' },
                            { title: 'Underline', format: 'underline' },
                            { title: 'Strikethrough', format: 'strikethrough' }
                        ]
                    },
                ]

            }" />
        </div>

        <div class="admin-event-cta-group">
            <button class="admin-event-form-cta" @click="handleAddEvent">Tilføj event</button>
            <button v-show="selectedEventID" class="admin-navbar-form-cta" @click="openModal">Slet
                event</button>

            <DeleteModal :isOpen="isModalOpened" @modal-close="closeModal" @accept-delete="acceptModal"
                @cancel-delete="closeModal" :itemID="selectedEventID"  />
        </div>

        <p v-show="errorMessage" class="login-error-message login-panel-error-message">
            {{ errorMessage }}
        </p>

        <p v-show="succesMessage" class="succes-message login-panel-error-message">
            {{ succesMessage }}
        </p>
    </div>

</template>
