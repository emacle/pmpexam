<template>
  <div class="hello">
    <h4>HelloWorld1 生成 新ab格式</h4>
    <textarea v-model="jsonText" placeholder="copy json string"></textarea>
  </div>
</template>

<script>
import _ from 'lodash'
import aJson from './eHtml.json'

export default {
  name: 'HelloWorld1',
  props: {
    msg: String
  },
  data() {
    return {
      aJson,
      data: undefined,
      jsonText: undefined
    }
  },
  watch: {
    jsonText(val) {
      // console.log(!val, val)
      if (val) {
        this.data = JSON.parse(val)
        console.log(this.data)
      }
    }
  },
  created() {
    this.data = aJson.html.body.div
    console.log(aJson, this.data)

    let newArr = _.dropRight(_.drop(aJson.html.body.div, 2), 1) // 删除头两个及最后一个无用的数据

    console.log(newArr)
    let dataObj = { data: { total_score: undefined, name: undefined, result: [] } }
    dataObj.data.total_score = 200
    dataObj.data.total_question = 200
    dataObj.data.name = 'Json'
    dataObj.data.result = []


    let score = 0
    for (let i = 0; i < newArr.length; i++) {
      let tmpObj = { correct_answer: [], answer: [] }

      tmpObj.analysis = newArr[i].div[3].div[1]['#text'] // 答案解析
      tmpObj.question_id = newArr[i]['@class'].replace(' ', '-') // 问题id
      tmpObj.content = newArr[i].div[1]['#text'] // 题目

      // tmpObj.correct_answer[0] = newArr[i].div[3].div[0].div[1]['#text']

      tmpObj.option = []

      let optABCD = ['A', 'B', 'C', 'D']

      for (let j = 0; j < 4; j++) {
        let optObj = {}

        optObj.content = newArr[i].div[2].label[j].div[0].p['#text']
        optObj.id = newArr[i].div[2].label[j].div[1].input['@id']
        optObj.question_id = tmpObj.question_id

        tmpObj.option.push(optObj)

        if (newArr[i].div[3].div[0].div[1]['#text'].indexOf(optABCD[j]) > 0) {
          // console.log(tmpObj.question_id, optABCD[j], newArr[i].div[3].div[0].div[1]['#text'], optObj.id, newArr[i].div[3].div[0].div[1]['#text'].indexOf(optABCD[j]))
          tmpObj.correct_answer[0] = optObj.id
        }

        if (newArr[i].div[2].label[j].div[1].input['@checked'] !== undefined) {
          tmpObj.answer[0] = optObj.id
        }
      }
      if (tmpObj.correct_answer[0] == tmpObj.answer[0]) {
        score++;
      }

      dataObj.data.result.push(tmpObj)
    }
    dataObj.data.score = score

    console.log(newArr[5].div) // 6题
    console.log(newArr[5]['@class']) // question_id @class较好，@id 
    console.log(newArr[5].div[1]['#text']) // 题目

    console.log(newArr[5].div[2].label[0].div[1].input['@id']) // option_id

    console.log(newArr[5].div[2].label[0].div[0].p['#text']) // 选项label[0-3] A B C D
    console.log(newArr[5].div[2].label[0].div[1].input['@checked'] !== undefined) // 选项 

    console.log(newArr[5].div[2].label[1].div[0].p['#text']) // 选项label[0-3] A B C D
    console.log(newArr[5].div[2].label[1].div[1].input['@checked'] !== undefined) // 选项 

    console.log(newArr[5].div[2].label[2].div[0].p['#text']) // 选项label[0-3] A B C D
    console.log(newArr[5].div[2].label[2].div[1].input['@checked'] !== undefined) // 选项 

    console.log(newArr[5].div[2].label[3].div[0].p['#text']) // 选项label[0-3] A B C D
    console.log(newArr[5].div[2].label[3].div[1].input['@checked'] !== undefined) // 选项 

    console.log(newArr[5].div[3].div[0].div[1]['#text']) // 正确答案：C
    console.log(newArr[5].div[3].div[1]['#text']) // 答案描述


    console.log(dataObj)
    console.log(JSON.stringify(dataObj))
    // let newObj = _.pickBy(this.data, function (value) {
    //   // console.log(key, value)
    //   // return _.startsWith(value, "div");
    //   return _.has(value, '@data-key')
    // })
    // console.log(newObj)
  },

  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
