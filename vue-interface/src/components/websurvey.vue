<template>
  <div class='page'>
    <h1>This is the survey</h1>
    <ws-page v-for="page in surveyPages"
             :page-name="page"
             :survey="survey">
    </ws-page>
    <pre>// survey obj: <br />{{ dumpSurvey }}</pre>
    <pre>// survey validations: <br />{{ $v }}</pre>
  </div>
</template>

<script>

import wsPage from './wsPage';
import { required, minLength, between } from 'vuelidate/lib/validators'

import sameAsQuestion  from '../validators/sameAsQuestion'
import compareQuestion from '../validators/compareQuestion'

export default {
    name: 'websurvey',
    components: {
        wsPage,
    },
    data: function() {
      return {
        survey: {
          pageOne: {
            questionOne: {
              type: 'select',
               label: 'Question Label',
               options: ['one', 'two', 'three'],
               value: undefined,
            },
            questionEight: {
              type: 'txt',
              label: 'Question Label',
              value: undefined,
            },
            something: {
              type: 'text',
              label: 'I need to be the same',
              value: undefined,
            },
          },
          pageTwo: {
            questionTwo: {
              type: 'select',
              label: 'Question Label',
              options: ['one', 'two', 'three'],
              value: undefined,
            },
            questionSix: {
              type: 'text',
              label: 'As this one',
              value: undefined,
            },
          },
        },
      };
    },
    computed: {
        surveyPages: function() {
            return Object.keys(this.survey);
        },
        dumpSurvey: function() {
            return JSON.stringify(this.survey, null, 4);
        },
    },
    validations: {
      survey: {
        pageTwo: {
          questionSix: {
            value: {
              required,
              compareQuestion: compareQuestion('pageOne.something', (a, b) => a > b),
              sameAsQuestion:  sameAsQuestion('pageOne.something'),
            }
          }
        }
      },
    },
}
</script>

<style lang="scss" scoped>
    pre, p {
        text-align: left;
    }
</style>
