<template>
  <div class='page'>
    <h1>{{ pageName }}</h1>
    <ws-question v-for="question in questionsArray" :question='question'></ws-question>
  </div>
</template>

<script>
import wsQuestion from './wsQuestion'

export default {
    name: 'wsPage',
    props: {
        pageName: String,
        survey: Object,
    },
    components: {
      wsQuestion,
    },
    computed: {
        questionsArray: function() {
            return Object.values(this.questions);
        },
        questions: function() {
            return this.survey[this.pageName];
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
