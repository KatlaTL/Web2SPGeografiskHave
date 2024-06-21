<script setup>
import { uploadImageToStorage } from "@/services/adminServices/AdminEventService";
import Editor from "@tinymce/tinymce-vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref, watch } from "vue";

const content = ref("");
const formText = ref("");
const contentObj = ref({
    contentHeading: "",
    firstParagraph: "",
    secondParagraph: "",
    formText: "",
    category: "event",
    date: "",
    tileTitle: "",
    tileText: "",
    tileImageAltText: "",
    previewTileImageURL: "",
    contentImageAltText: "",
    previewContentImageURL: ""
});

const tileSubPath = ref("Events/");

const uploadImage = async (e, filePath, previewToUse) => {
    if (previewToUse === "content") {
        contentObj.value.previewContentImageURL = await uploadImageToStorage(e.target.files[0], filePath);
    }

    if (previewToUse === "tile") {
        contentObj.value.previewTileImageURL = await uploadImageToStorage(e.target.files[0], filePath);
    }
}

watch(() => contentObj.value.category, () => {
    if (contentObj.value.category === "event") tileSubPath.value = "Events/";
    if (contentObj.value.category === "tour") tileSubPath.value = "Tours/";
})

const handleAddEvent = () => {
    const parser = new DOMParser();

    const contentHTML = parser.parseFromString(content.value, "text/html");
    const formTextHTML = parser.parseFromString(formText.value, "text/html");

    contentObj.value.contentHeading = contentHTML.querySelector(".contentHeading")?.innerHTML.trim();
    contentObj.value.firstParagraph = wrapContent(".contentFirstParagraphHeading", contentHTML);
    contentObj.value.secondParagraph = wrapContent(".contentSecondParagraphHeading", contentHTML);

    contentObj.value.formText = formTextHTML.querySelector("body")?.innerHTML.trim();

    //TO-DO save content in firebase
    console.log(contentObj.value);
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
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}-${year} ${hours}:${minutes}`;
}
</script>


<template>

    <div class="admin-event">
        <h2>Tilføj, slet eller redigere events og rundvisninger</h2>

        <div class="admin-event-form">
            <form @submit.prevent="">
                <h3>Vælg kategori</h3>
                <select name="category" v-model="contentObj.category">
                    <option value="event" :selected="contentObj.category === 'event'" selected>Event</option>
                    <option value="tour" :selected="contentObj.category === 'tour'">Rundvisning</option>
                </select>
            </form>

            <div class="date-picker">
                <h3>Vælg en dato</h3>
                <VueDatePicker v-model="contentObj.date" :format="dateFormat" />
            </div>

            <form @submit.prevent="">
                <h3>Tile title</h3>
                <input type="text" placeholder="Tile Titel" v-model="contentObj.tileTitle" />

                <h3>Tile tekst</h3>
                <input type="text" placeholder="Tile Tekst" v-model="contentObj.tileText" />
                
                <h3>Upload tile billede</h3>
                <input class="uploader" type="file" accept="image/*" @change="(e) => uploadImage(e, `Calendar/${tileSubPath}`, 'tile')" />
                <input type="text" placeholder="Billede alt tekst" v-model="contentObj.tileImageAltText" />
            </form>

            <div v-show="contentObj.previewTileImageURL">
                <img class="preview" height="78" width="64" :src="contentObj.previewTileImageURL">
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
                    <input class="uploader" type="file" accept="image/*" @change="(e) => uploadImage(e, 'eventsContent/', 'content')" />
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

        <button class="admin-event-form-cta" @click="handleAddEvent">Tilføj event</button>
    </div>

</template>
