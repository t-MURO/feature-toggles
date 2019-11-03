<template>
  <p v-html="insertLineBreaks"></p>
</template>

<script>
export default {
  props: ["text"],
  computed: {
    insertLineBreaks() {
      return this.text.replace(/(?:\r\n|\r|\n)/g, "<br>");
    }
  }
};
</script>
