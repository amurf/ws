<template>
    <select v-model="question.value">
      <option v-for="option in question.options" :value="option">
        {{ option }}
      </option>
    </select>
</template>

<script>
  export default {
    name: 'wsSelect',
    props: {
        question: Object,
    },
  }
</script>

<style lang="scss" scoped>

</style>
