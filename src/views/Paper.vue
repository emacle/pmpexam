<template>
  <div>
    <van-sticky>
      <van-nav-bar :title="data.name" right-text="菜单" @click-right="show = true" />
    </van-sticky>

    <van-popup v-model="show" position="right" :style="{ width:'30%',height: '100%'}">
      <!-- :style="{ height: '100%', width:'20%' }" -->

      <span v-for="(v,k) in data.result" :key="k">
        <van-tag
          :plain="showAnswer?false:true"
          :type="showAnswer?'success':'primary'"
          size="medium"
          v-if="v.correct_answer[0]==v.answer[0] && showAnswer"
          style="margin-left:2px;margin-bottom:2px"
          @click="goAnchor(v.question_id)"
        >{{k+1}}</van-tag>
        <van-tag
          :plain="showAnswer?false:true"
          :type="showAnswer?'danger':'primary'"
          size="medium"
          v-else-if="v.correct_answer[0]!==v.answer[0] && showAnswer"
          style="margin-left:2px;margin-bottom:2px"
          @click="goAnchor(v.question_id)"
        >{{k+1}}</van-tag>
        <van-tag
          :plain="showAnswer?false:true"
          type="primary"
          size="medium"
          style="margin-left:2px;margin-bottom:2px"
          v-else
          @click="goAnchor(v.question_id)"
        >{{k+1}}</van-tag>
        <!-- <br v-if="(k+1)%30==0" /> -->
      </span>
      <br />

      <van-button
        type="primary"
        size="small"
        @click="showAnswer=!showAnswer"
      >解析答案{{data.score}} / {{200-data.score}}</van-button>

      <van-button type="primary" size="small" style="margin-left:2px" @click="submit()">submit</van-button>
    </van-popup>
    <div class="container is-fluid">
      <div class="notification">
        <textarea
          class="textarea"
          rows="1"
          cols="10"
          v-model="jsonText"
          placeholder="copy json string"
        ></textarea>
      </div>
    </div>

    <!-- <van-button type="primary">主要按钮</van-button> -->

    <div
      class="container notification"
      :id="v.question_id"
      align="left"
      v-for="(v,k) in data.result"
      :key="k"
    >
      {{k+1}}. {{v.content | replaceHtmlTag}}
      <!-- {{ v.correct_answer[0] }} {{ v.answer[0] }} -->

      <p class="control" v-for="(vo,ko) in v.option" :key="ko">
        <p-radio
          class="radio p-default p-curve"
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
            class="radio"
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
          <label
            class="radio"
            slot="hover-label"
            v-else
          >{{arr[ko]}}. {{vo.content | replaceHtmlTag }}</label>
        </p-radio>
      </p>

      <div v-if="showAnswer">解析：{{ v.analysis }}</div>
    </div>
  </div>
</template>

<script>
import PrettyRadio from 'pretty-checkbox-vue/radio';
import 'pretty-checkbox/src/pretty-checkbox.scss';

export default {
  name: 'Paper',
  components: {
    'p-radio': PrettyRadio
  },
  filters: {
    replaceHtmlTag(str) {
      if (typeof str != "string") {
        console.log(str)
        return '';
      } else {
        return str.replace(/<[^>]+>/ig, '')
      }
    }
  },
  data() {
    return {
      arr: ['A', 'B', 'C', 'D'],
      showAnswer: false,
      show: false,
      jsonText: undefined,
      data: { name: '' },
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        console.log(route.params.id, route)
        this.$http.get(route.params.id + ".json").then(res => {
          if (!res.code) {
            console.log(res.data)
            this.data = res.data
          }
        }).catch(e => {
          console.log(e)
        })
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

  },
  mounted: function () {
    this.$http.get(this.$route.params.id + ".json").then(res => {
      if (!res.code) {
        console.log(res.data)
        this.data = res.data
      }
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    // 跳到注册
    goAnchor(anchor) {
      // 注册表单盒子的类名为 form-wrap-app
      this.$el.querySelector('#' + anchor).scrollIntoView(true)
      window.scrollBy(0, -50); // 偏移顶部offset
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
.sidebar {
  background-color: SteelBlue;
}
</style>
