<script setup>
import { ref } from "vue";
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close", "accept-gdpr"]);

const target = ref(null);

onClickOutside(target, () => emit('modal-close'));

</script>

<template>
  <div v-if="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <h2>Persondatapolitik</h2>
        </div>
        <div class="modal-body">

          <h3>Behandling af personoplysninger</h3>
          <p>Som et led i Geografisk Haves aktiviteter og markedsføring, indsamles og behandles visse oplysninger om
            vores gæster i haven og besøgende på vores hjemmeside. Denne politik beskriver, hvordan Geografisk Have
            behandler disse oplysninger.</p>

          <h4>Dataansvarlig</h4>
          <p>Den selvejende institution Geografisk Have CVR. 36675802, Chr. 4. vej 23, 6000 Kolding. Tlf. 79797000.</p>

          <h4>Indsamling af data</h4>
          <p>Indsamling og lagring af data sker blandt andet, når du besøger vores hjemmeside, www.geografiskhave.dk
            eller når du tilmelder dig vores nyhedsbrev. De oplysninger, som vi gemmer, kan være navn, e-mailadresse og
            telefonnummer, samt hvordan du navigerer rundt på vores hjemmeside.</p>
          <p>Når du køber produkter relateret til Geografisk Have på Kolding Kommunes webshop, for eksempel årskort,
            opbevarer vi også nogle af dine data i en periode. Disse bliver dog slettet, når de ikke bruges længere.</p>
          <p>Som fysisk gæst i Geografisk Have indsamler vi udelukkende anonymiserede data så som postnummer eller
            landekoder om, hvor du kommer fra.</p>

          <h4>Formål og brug</h4>
          <p>Vi indsamler data for at kunne optimere gæsternes oplevelse i haven og yde en god service. Geografisk Have
            behandler dine persondata til følgende formål:</p>
          <p><i>Gennemførsel af ordre i webshop</i> <br />Når du køber et produkt relateret til Geografisk Have i
            Kolding Kommunes webshop, beder vi dig om navn, adresse, fødselsdato og e-mail adresse. Disse oplysninger
            bruges udelukkende til at gennemføre din ordre og til at sende dig en kvittering. Oplysningerne bruges ikke
            til andre formål end dette.</p>
          <p><i>Køb af Årskort</i><br />Når du køber et årskort i vores reception, skal du udfylde en blanket hvorfra
            anonymiserede data gemmes, såsom køn, alder og postnummer. Disse oplysninger bruges til markedsføring og
            tage hensyn til gæsternes præferencer. Vi gemmer ikke dine data længere, end vi har brug for dem.</p>
          <p><i>Køb eller bestilling af oplevelser, rundvisninger eller leje af faciliteter</i><br />Når du bestiller et
            produkt, en oplevelse eller lejer faciliteter i haven, afgiver du forskellige informationer for, at vi kan
            yde den ønskede service. Det kan være navn, telefonnummer og e-mailadresse. Disse oplysninger bruges til at
            udføre den nødvendige service du har bedt om. Vi gemmer ikke dine data længere, end vi har brug for dem. I
            visse tilfælde anonymiseres visse data til brug i statistik, så vi kan se hvilke arrangementer og events vi
            har lavet og på hvilke tidspunkter. Disse oplysninger vil dog aldrig kunne føres tilbage til enkeltpersoner.
          </p>
          <p><i>Nyhedsbreve</i><br />Nyhedsbreve sendes kun ud til personer, der har givet deres samtykke hertil. For
            eksempel gennem tilmelding via Geografisk Haves hjemmeside. De oplysninger der hentes er navn og
            e-mailadresse. Du kan til enhver tid afmelde nyhedsbrevet ved at skrive til os på info@geografiskhave.dk
            eller via linket i bunden af nyhedsbrevet.</p>
          <p><i>Hjemmesiden</i>Geografisk Have har adgang til visse oplysninger om besøgendes brug af hjemmesiden og
            dennes funktioner.
            Ved besøg på Geografisk Haves hjemmeside indsamler vi følgende oplysninger om dig:</p>
          <ul>
            <li>Hvilke sider du besøger på geografiskhave.dk samt hvornår og hvor længe</li>
            <li>Browsertype</li>
            <li>IP &mdash; adresse.</li>
          </ul>
          <p>De indsamlede data behandles på grundlag af Geografisk Haves interesse i at få kendskab til brugernes
            anvendelse af hjemmesiden. Informationen bruges til at forbedre hjemmesiden. Vi bruger derudover data om
            vores bruger til at forstå, hvordan vores brugere generelt anvender hjemmesiden og prøver på baggrund af
            disse informationer at gøre hjemmesiden bedre.
            <br />Vi kan ikke se, hvilke sider du kommer fra &mdash; medmindre du kommer fra en Google søgning eller via
            Facebook link &mdash; eller hvor du surfer hen efter besøget på vores hjemmeside. Desuden indsamler vi
            informationer om, hvilke devices vores brugere generelt foretrækker. Denne information bruger vi også til at
            forbedre vores hjemmeside.
          </p>
          <p><i>Facebook Pixel tracking</i><br />Geografisk Have bruger Facebook Pixel tracking, som indsamler anonyme
            oplysninger om besøg til og fra vores hjemmeside via Facebook.</p>

          <h4>Ansatte, bestyrelsesmedlemmer og samarbejdspartnere</h4>
          <p>Geografisk Have gemmer oplysninger på ansatte og samarbejdspartnere så længe at det er relevant eller
            indtil samarbejder og ansættelsesforhold ophører.</p>

          <h4>Evt. videregivelse af oplysninger til 3.part</h4>
          <p>Geografisk Have videregiver ikke personoplysninger til tredjepart.</p>

          <h4>Sikkerhed</h4>
          <p>Geografisk Have behandler alle personoplysninger fortroligt. Vi opbevarer ikke dine oplysninger længere end
            højst nødvendigt. Vi sletter løbende de oplysninger, som vi ikke længere bruger. Oplysningerne behandles kun
            af medarbejdere, der er instrueret i hvordan personoplysninger behandles.</p>

          <h4>Tilbagekaldelse af samtykke</h4>
          <p>Du kan til enhver tid tilbagekalde dit samtykke til brug af dine personoplysninger, som du har afgivet
            Geografisk Have. Tilbagekaldelse af dine oplysninger kan dog betyde, at vi ikke længere kan tilbyde dig de
            samme ydelser og services. Tilbagekaldelse af samtykke skal ske skriftligt til:</p>
          <ul>
            <li>E-mail til: info@geografiskhave.dk</li>
            <li>Brev til: Geografisk Have, Christian 4 Vej 23, 6000 Kolding</li>
          </ul>

          <h4>Dine rettigheder</h4>
          <p>Du har ret til at få indsigt i, hvilke oplysninger Geografisk Have behandler om dig og til hvilket formål
            oplysningerne behandles. Du har desuden ret til at gøre indsigelse mod, at dine personoplysninger behandles
            eller kræve berigtigelse af oplysninger, der er ukorrekte, vildledende eller på anden måde behandles i strid
            med lovgivningen</p>

          <h4>Ændringer i persondatapolitikken</h4>
          <p>Geografisk Have er en virksomhed i udvikling og vores persondatapolitik opdateres løbende i takt med de nye
            tiltag, der eventuelt måtte komme i fremtiden.</p>
          <p>Hvis du har spørgsmål eller ønsker at klage over behandlingen af personoplysninger, kan du kontakte
            Geografisk Have via mail eller telefon.</p>

          <ul>
            <li>Telefon: 79 79 70 00</li>
            <li>E-mail: info@geografiskhave.dk</li>
            <li>Brev: Geografisk Have, Christian 4 Vej 23, 6000 Kolding</li>
          </ul>

          <p>Udarbejdet af: <br />
            <strong>
              Geografisk Have <br />
              Christian 4 Vej 23 <br />
              6000 Kolding <br />
              cvr: 36675802</strong></p>

        </div>
        <div class="modal-footer">
          <div>
            <button class="accept-modal-btn" @click.prevent="emit('accept-gdpr')">Godkend Privatlivspolitik</button>
          </div>

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
  width: 720px;
  height: 460px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  overflow: scroll;
  overflow-x: hidden;
}
.accept-modal-btn {
  background-color: var(--headerColor);
  color: var(--whiteColor);
  font-size: 15px;
  height: 53px;
  width: 126px;
  cursor: pointer;
}

.accept-modal-btn:hover {
  background-color: #7FA761;
}
</style>