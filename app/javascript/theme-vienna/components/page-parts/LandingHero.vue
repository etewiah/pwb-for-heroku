<template>
  <section v-if="blockContents">
    <v-parallax :src="blockContents.blocks.landing_img.content" height="600">
      <v-layout column class="white--text">
        <div class="landing-ribbon dark pa-4" style="">
          <span class="ma-0 prop-info-btn">
            <h1 class="white--text mb-2 display-3 text-xs-center">{{blockContents.blocks.landing_title_a.content }}</h1>
            <h2>
            <div class="pl-2 headline" v-html="blockContents.blocks.landing_content_a.content">
          </div>
          </h2>
          </span>
        </div>
      </v-layout>
    </v-parallax>
  </section>
</template>
<script>
export default {
  props: ["blockContents"],
}

</script>
<style>
.list-carousel>li {
  list-style-type: none;
}
li {
  list-style-type: none;
  padding: 3px;
}
.landing-ribbon {
  position: absolute;
  top: 20px;
  left: -5px;
  padding: 5px 10px;
}
.landing-ribbon.base {
  background: #3498db;
  color: #fff;
  border-right: 5px solid #8bc4ea;
}

.landing-ribbon.dark {
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, .3);
  /*background: #464646;*/
  color: #fff;
}

.landing-ribbon span {
  display: block;
  font-size: 16px;
  font-weight: 600;
}

</style>
