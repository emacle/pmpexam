<template>
  <div class="main">
    <div class="sidebar">
      <h4 id="title">{{data.name}}</h4>
      <span align="left" v-for="(v,k) in data.result" :key="k">
        <button
          v-if="v.correct_answer[0]==v.answer[0]"
          style="background-color:green;margin-left:2px"
          @click="goAnchor(v.question_id)"
        >{{k+1}}</button>

        <button v-else style="background-color:red" @click="goAnchor(v.question_id)">{{k+1}}</button>
      </span>
      <br />
      <br />
      {{data.score}} / {{200-data.score}}
      <button @click="submit()">submit</button>
    </div>
    <div class="content">
      <!-- <p-radio class="p-default p-curve" name="color" color="primary-o" v-model="">Primary</p-radio>
      <p-radio class="p-default p-curve" name="color" color="danger-o">Danger</p-radio>-->

      <div :id="v.question_id" align="left" v-for="(v,k) in data.result" :key="k">
        {{k+1}}. {{v.content | replaceHtmlTag}}
        <!-- {{ v.correct_answer[0] }} {{ v.answer[0] }} -->
        <p style="margin-left:20px" v-for="(vo,ko) in v.option" :key="ko">
          <input
            v-if="vo.id == v.answer[0]"
            type="radio"
            :id="vo.id"
            :name="vo.question_id"
            :value="vo.id"
            v-model="v.answer[0]"
            checked
          />
          <input
            v-else
            type="radio"
            :id="vo.id"
            :name="vo.question_id"
            :value="vo.id"
            v-model="v.answer[0]"
          />
          <span
            v-if="vo.id == v.correct_answer[0]"
            style="color:#0075ff"
          >{{arr[ko]}}. {{vo.content | replaceHtmlTag }}</span>
          <span
            v-else-if="vo.id == v.answer[0] && v.correct_answer[0] !== v.answer[0]"
            style="color:red"
          >{{arr[ko]}}. {{vo.content | replaceHtmlTag }}</span>
          <span v-else>{{arr[ko]}}. {{vo.content | replaceHtmlTag }}</span>
        </p>

        <div style="margin-left:16px">解析：{{ v.analysis }}</div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import aJson from './a.json';
import bJson from './b.json';

// import PrettyRadio from 'pretty-checkbox-vue/radio';
// import 'pretty-checkbox/src/pretty-checkbox.scss';

export default {
  name: 'Paper',
  components: {
    // 'p-radio': PrettyRadio
  },
  filters: {
    replaceHtmlTag(str) {
      return str.replace(/<[^>]+>/ig, '')
    }
  },
  data() {
    return {
      arr: ['A', 'B', 'C', 'D'],
      data: undefined,
      aJson,
      bJson
    }
  },
  created() {
    // console.log(this.$route);
    // console.log(this.$route.params.id);
    if (this.$route.params.id === 'a') {
      this.data = aJson.data
      console.log(this.data)
    } else if (this.$route.params.id === 'b') {
      this.data = bJson.data
      console.log(this.data)
    }
  },
  mounted: function () {
  },
  methods: {
    // 跳到注册
    goAnchor(anchor) {
      // 注册表单盒子的类名为 form-wrap-app
      this.$el.querySelector('#' + anchor).scrollIntoView();
    },
    submit() {
      console.log('newsubmit...', this.data.result[0].answer)
      alert(this.data.result[0].answer)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
body {
  margin: 0;
  height: 100%;
}
.header {
  top: 0;
  width: 100%;
  height: 54px;
  position: fixed;
  border-bottom: 1px solid #e4e6e9;
  background: #ccc;
}
.main {
  margin-top: 54px;
  height: calc(100% - 54px);
}
.sidebar {
  position: fixed;
  top: 54px;
  bottom: 0;
  left: 0;
  width: 300px;
  border-right: 1px solid #e4e6e9;
  background: grey;
  background-color: #fff;
}
.content {
  padding-left: 301px;
  overflow-y: auto;
  background-color: #fff;
}
</style>
