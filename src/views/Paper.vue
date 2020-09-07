<template>
  <div>
    <header>
      <span align="left" v-for="(v,k) in data.result" :key="k">
        <button
          v-if="v.correct_answer[0]==v.answer[0]"
          style="background-color:green;margin-left:2px"
          @click="goAnchor(v.question_id)"
        >{{k+1}}</button>

        <button v-else style="background-color:red" @click="goAnchor(v.question_id)">{{k+1}}</button>

        <br v-if="(k+1)%40==0" />
      </span>
      正确: {{data.score }} 错误: {{ 200-data.score }}
    </header>
    <section>
      <h4 id="title">{{data.name}}</h4>

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
            checked
          />
          <input v-else type="radio" :id="vo.id" :name="vo.question_id" :value="vo.id" />
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
      <button @click="goAnchor('title')">gotop</button>
    </section>
  </div>
</template>

<script>
import aJson from './a.json';
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
      aJson
    }
  },
  created() {
    console.log('a.json...', aJson)
    console.log(this.$route);
    console.log(this.$route.params.id);
    if (this.$route.params.id === 'a') {
      this.data = aJson.data
      console.log(this.data)
    }
    // else { }
  },
  mounted: function () {
  },
  methods: {
    // 跳到注册
    goAnchor(anchor) {
      // 注册表单盒子的类名为 form-wrap-app
      this.$el.querySelector('#' + anchor).scrollIntoView();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
html,
body {
  height: 100%;
}
body,
ul {
  margin: 0;
}
header,
footer {
  position: absolute;
  line-height: 20px;
  left: 0;
  right: 30px;
  z-index: 1;
  color: aquamarine;
  text-align: left;
  background: #333;
}
header {
  top: 0;
}
footer {
  bottom: 0;
}
section {
  padding: 30px;
  position: absolute;
  top: 80px;
  right: 0;
  bottom: 48px;
  left: 0;
  overflow: auto;
}
li {
  padding: 10px 0;
}
</style>
