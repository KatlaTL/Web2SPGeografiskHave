<template>
  <footer class="bg-footerBackgroundColor dark:bg-footerBackgroundColor">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-4">
      <div
        class="flex lg:justify-between lg:flex-row lg:items-start xsm:flex-col text-whiteColor"
      >
        <div class="mb-2 md:mb-0">
          <img
            src="@/assets/icons/gh_logo_vertikal_hvid.svg"
            alt="Geografisk have logo footer"
            class="h-80 w-80 xsm:hidden lg:flex"
          />
        </div>
        <div
          class="flex flex-col  lg:justify-start lg:items-start py-4 "
        >
          <h3 class="pb-4">Om os</h3>
          <a href="#">Bestyrelsen</a>
          <a href="#">Medarbejder</a>
          <a href="#">Udviklingsplan</a>
          <a href="#">Årsberetninger</a>
          <a href="#">Samarbejdspartner</a>
          <a href="#">Pressebilleder</a>
          <a href="#">Presseperspektiv</a>
        </div>
        <div
          class="flex flex-col xsm:justify-center xsm:items-start lg:justify-start lg:items-start py-4"
        >
          <h3 class="pb-4">Diverse</h3>
          <a href="#">Persondatapolitik</a>
          <a href="#">Cookiepolitik</a>
          <a href="#">Smiley kontrolrapport</a>
          <div class="py-4">
            <h3 class="xsm:py-2 lg:py-4">Sociale medier</h3>
            <div class="flex flex-row ">
              <img src="@/assets/icons/Instagram.svg" alt="Instagram logo" />
              <img src="@/assets/icons/Facebook.svg" alt="Facebook logo" />
            </div>
          </div>
        </div>
        <div
          class="flex flex-col xsm:justify-center xsm:items-start lg:justify-start lg:items-start py-4"
        >
          <h3 class="pb-4">Kontakt</h3>
          <a
            class="footer-address"
            href="https://www.google.com/maps/place/Geografisk+Have/@55.474385,9.4916467,17.25z/data=!4m6!3m5!1s0x464ca1e73acec135:0xaea30a1ba665f139!8m2!3d55.4749931!4d9.4926187!16s%2Fg%2F120_498v?entry=ttu"
            target="_blank"
          >
            <p>Geografisk Have</p>
            <p>Christian 4 vej 23</p>
            <p>6000 Kolding</p>
          </a>
          <div class="info_div">
            <p>79797000</p>
            <p>info@geografiskhave.dk</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bambus_footer">
      <img
        src="@/assets/icons/bambus_footer.png"
        alt=""
        class="xsm:hidden lg:flex"
      />
    </div>
  </footer>
</template>
