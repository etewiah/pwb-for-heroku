<template>
  <div id="app">
    <p>{{ message }}</p>

        <v-card-title primary-title>
          <div>
            <h4 class="headline mb-0">hello 2</h4>
          </div>
        </v-card-title>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "Hello Vue!"
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
