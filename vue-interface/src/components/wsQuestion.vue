<template>
    <div class="question">
    <h2>The Question</h2>
    <ws-select v-if="question.type === 'select'" :question="question"></ws-select>
    <ws-text v-else-if="question.type === 'text'" :question="question"></ws-text>
    <p class='invalid-question' v-else>
        Question type not recognised: <em>{{question}}</em>
    </p>
  </div>
</template>

<script>
  import wsSelect from './wsSelect'
  import wsText from './wsText'

  export default {
    name: 'wsQuestion',
    components: {
      wsSelect,
      wsText,
    },
    props: {
      question: Object,
    },
  }
</script>

<style lang="scss" scoped>
  .invalid-question {
    color: red;
  }
  h2 {
      color: indigo;
      font-size: 1em;
  }
</style>
