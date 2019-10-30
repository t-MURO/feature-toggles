<template>
  <v-sparkline
    :labels="labels"
    :value="value"
    :color="$vuetify.theme.dark ? 'white' : 'black'"
    line-width="2"
    padding="16"
  ></v-sparkline>
</template>

<script>
export default {
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240]
  })
};
</script>
