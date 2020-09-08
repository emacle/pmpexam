<template>
  <div class="main">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="sidebar">
      <label class="drop" for="_1">
        <h4>{{data.name}}</h4>
      </label>

      <input id="_1" type="checkbox" />
      <div>
        <span align="left" v-for="(v,k) in data.result" :key="k">
          <button
            v-if="v.correct_answer[0]==v.answer[0] && showAnswer"
            style="background-color:cyan;margin-left:2px"
            @click="goAnchor(v.question_id)"
          >{{k+1}}</button>

          <button
            v-else-if="v.correct_answer[0]!==v.answer[0] && showAnswer"
            style="background-color:red;margin-left:2px"
            @click="goAnchor(v.question_id)"
          >{{k+1}}</button>
          <van-tag
            size="medium"
            v-else
            style="margin-left:2px"
            @click="goAnchor(v.question_id)"
          >{{k+1}}</van-tag>
          <!-- <button v-else style="margin-left:2px" @click="goAnchor(v.question_id)">{{k+1}}</button> -->
        </span>
        <br />

        <button @click="showAnswer=!showAnswer">解析答案{{data.score}} / {{200-data.score}}</button>

        <button style="margin-left:2px" @click="submit()">submit</button>
      </div>
    </div>
    <div class="content">
      <textarea v-model="jsonText" cols="80" rows="3" placeholder="copy json string"></textarea>
      <!-- <van-button type="primary">主要按钮</van-button> -->
      <button></button>
      <div :id="v.question_id" align="left" v-for="(v,k) in data.result" :key="k">
        {{k+1}}. {{v.content | replaceHtmlTag}}
        <!-- {{ v.correct_answer[0] }} {{ v.answer[0] }} -->
        <p style="margin-left:20px" v-for="(vo,ko) in v.option" :key="ko">
          <p-radio
            class="p-default p-curve"
            :name="vo.question_id"
            color="primary-o"
            :checked="vo.id === v.answer[0]?true:false"
            hover-color="primary-o"
            :value="vo.id"
            v-model="v.answer[0]"
            hover="true"
          >
            {{arr[ko]}}. {{vo.content | replaceHtmlTag }}
            <label
              slot="hover-label"
              v-if="showAnswer"
            >
              <span
                v-if="vo.id === v.correct_answer[0]"
                style="color:blue"
              >{{arr[ko]}}.{{vo.content | replaceHtmlTag }} -正确答案</span>
              <!-- {{vo.id}} -->
              <span v-else style="color:red">{{arr[ko]}}.{{vo.content | replaceHtmlTag }} - 错误答案</span>
            </label>
            <label slot="hover-label" v-else>{{arr[ko]}}. {{vo.content | replaceHtmlTag }}</label>
          </p-radio>
        </p>

        <div style="margin-left:16px" v-if="showAnswer">解析：{{ v.analysis }}</div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import aJson from './a.json';
import bJson from './b.json';

import PrettyRadio from 'pretty-checkbox-vue/radio';
import 'pretty-checkbox/src/pretty-checkbox.scss';
import { Toast } from 'vant';

export default {
  name: 'Paper',
  components: {
    'p-radio': PrettyRadio
  },
  filters: {
    replaceHtmlTag(str) {
      return str.replace(/<[^>]+>/ig, '')
    }
  },
  data() {
    return {
      arr: ['A', 'B', 'C', 'D'],
      showAnswer: false,
      jsonText: undefined,
      data: undefined,
      aJson,
      bJson
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        console.log(route.params.id)
        if (route.params.id === 'a') {
          this.data = aJson.data
          console.log(this.data)
        } else if (route.params.id === 'b') {
          this.data = bJson.data
          console.log(this.data)
        }
      },
      immediate: true
    },
    jsonText(val) {
      console.log(!val, val)
      if (val) {
        this.data = JSON.parse(val).data
        console.log(this.data)
      }
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
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
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
.drop {
  cursor: pointer;
  display: block;
  background: #090;
}

.drop + input {
  display: none; /* hide the checkboxes */
}

.drop + input + div {
  display: none;
}

.drop + input:checked + div {
  display: block;
}
h4 {
  font-size: 18px;
  margin: 5px 0px 5px 0px;
}
.menuItem p {
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;
}
.menuItem p:target {
  height: 120px;
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
  margin-top: 10px;
  height: calc(100% - 54px);
}
.sidebar {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  width: 300px;
  border-right: 1px solid #e4e6e9;
  background: grey;
  background-color: SteelBlue;
}
.content {
  padding-left: 301px;
  overflow-y: auto;
  background-color: #fff;
}
</style>
