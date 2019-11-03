<template>
  <div class="t-layout">
    <h2 class="display-1">Playground</h2>

    <v-card class="mt-4" color="#385F73" dark max-width="500" height="500">
      <span>TL</span><v-spacer></v-spacer>
      <span>TR</span>
      <div>BL</div>
      <div>BR</div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Playground"
};
</script>

<style lang="scss" scoped>
.t-layout {
  margin: 1em 0;
  .v-card {
    padding: 1em 1em 0 1em;
  }
}
</style>
