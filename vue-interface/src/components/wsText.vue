<template>
    <input type="text" v-model="question.value" />
</template>

<script>
  export default {
    name: 'wsText',
    props: {
        question: Object,
    },
  }
</script>

<style lang="scss" scoped>

</style>
