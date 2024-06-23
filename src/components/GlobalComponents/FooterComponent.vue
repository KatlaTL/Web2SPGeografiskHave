<template>
  <footer class="bg-footerBackgroundColor dark:bg-footerBackgroundColor">
    <div class="w-full max-w-screen-xl py-1 px-14 pt-8">
      <div
        class="flex mdsm:justify-between mdsm:flex-row mdsm:items-start xsm:flex-col text-whiteColor"
      >
        <div class="mb-2 md:mb-0">
          <img
            src="@/assets/icons/gh_logo_vertikal_hvid.svg"
            alt="Geografisk have logo footer"
            class="mdsm:h-40 mdsm:w-40 lg:h-80 lg:w-80 xsm:hidden mdsm:flex"
          />
        </div>
        <div
        class="flex flex-col md:justify-start md:items-start xsm:py-2 mdsm:py-4
        xsm:text-[14px] mdsm:text-[16px] md:text-[20px] font-medium leading-[35px] font-headersFont"
        >
          <h3 class="xsm:pb-2 mdsm:pb-4 xsm:text-[24px] mdsm:text-[30px]">Om os</h3>
          <a href="#">Bestyrelsen</a>
          <a href="#">Medarbejder</a>
          <a href="#">Udviklingsplan</a>
          <a href="#">Årsberetninger</a>
          <a href="#">Samarbejdspartner</a>
          <a href="#">Pressebilleder</a>
          <a href="#">Presseperspektiv</a>
        </div>
        <div
        class="flex flex-col xsm:justify-center xsm:items-start lg:justify-start lg:items-start xsm:py-2 mdsm:py-4
        xsm:text-[14px] mdsm:text-[16px] md:text-[20px] font-medium leading-[35px] font-headersFont"
        >
          <h3 class="xsm:pb-2 mdsm:pb-4 xsm:text-[24px] mdsm:text-[30px]">Diverse</h3>
          <a href="#">Persondatapolitik</a>
          <a href="#">Cookiepolitik</a>
          <a href="#">Smiley kontrolrapport</a>
          <div class="py-4">
            <h3 class="xsm:pb-2 mdsm:pb-4 xsm:text-[24px] mdsm:text-[30px]">Sociale medier</h3>
            <div class="flex flex-row ">
              <img src="@/assets/icons/Instagram.svg" alt="Instagram logo" class="mr-3" />
              <img src="@/assets/icons/Facebook.svg" alt="Facebook logo" />
            </div>
          </div>
        </div>
        <div
        class="flex flex-col xsm:justify-center xsm:items-start lg:justify-start lg:items-start xsm:py-2 mdsm:py-4 
        xsm:text-[14px] mdsm:text-[16px] md:text-[20px] font-medium leading-[35px] font-headersFont"
        >
          <h3 class="xsm:pb-2 mdsm:pb-4 xsm:text-[24px] mdsm:text-[30px]">Kontakt</h3>
          <a
            class="footer-address"
            href="https://www.google.com/maps/place/Geografisk+Have/@55.474385,9.4916467,17.25z/data=!4m6!3m5!1s0x464ca1e73acec135:0xaea30a1ba665f139!8m2!3d55.4749931!4d9.4926187!16s%2Fg%2F120_498v?entry=ttu"
            target="_blank"
          >
            <p>Geografisk Have</p>
            <p>Christian 4 vej 23</p>
            <p>6000 Kolding</p>
          </a>
          <div class="info_div pt-4">
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
        
      />
    </div>
  </footer>
</template>
