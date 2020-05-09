<template>
  <div class="Create">
    <content-box
      :heading="'新規自治体申請'">
      <div class="Create__Form">
        <div class="Create__FormBody">
          <input-string
            :error="inputs.cityName.error"
            :label="'自治体名称'"
            :placeholder="'（例）爆新地'"
            :required="true"
            :type="'text'"
            v-model="inputs.cityName.value" />
          <input-string
            :error="inputs.cityNameKana.error"
            :label="'自治体名称（かな）'"
            :placeholder="'（例）ばくしんち'"
            :required="true"
            :type="'text'"
            v-model="inputs.cityNameKana.value" />
          <input-string
            :error="inputs.cityNameEnglish.error"
            :label="'自治体名称（英語）'"
            :placeholder="'（例）bakushinchi'"
            :required="true"
            :text="'※ WorldGuardの保護名として使用されます。\n※ 半角小文字英字のみで入力してください。'"
            :type="'text'"
            v-model="inputs.cityNameEnglish.value" />
          <input-string
            :error="inputs.origin.error"
            :label="'自治体名称の由来'"
            :placeholder="'（例）爆発の始まり。爆発の根源。中心地。つまり爆心地。新しいので爆新地。'"
            :required="true"
            :type="'textarea'"
            v-model="inputs.origin.value" />
          <input-string
            :error="inputs.summary.error"
            :label="'自治体概要'"
            :placeholder="'（例）Jao_Afaワールドの中心に位置する運営が管理する自治体。'"
            :required="true"
            :type="'textarea'"
            v-model="inputs.summary.value" />
          <input-region
            :label="'自治体範囲'"
            :required="true"
            v-model="inputs.corners.value"
            @count="setCount" />
          <input-string
            :error="inputs.reason.error"
            :label="'規定ブロック数を超える理由'"
            :required="true"
            :type="'textarea'"
            v-show="inputs.count.value > 250000"
            v-model="inputs.reason.value" />
          <input-string
            :error="inputs.remarks.error"
            :label="'備考'"
            :required="false"
            :type="'textarea'"
            v-model="inputs.remarks.value" />
        </div>
        <div class="Create__FormFooter">
          <submit-button
            :disabled="!validateInputs()"
            :label="'申請する'"
            :status="button.status"
            @click="postRequest" />
          </div>
      </div>
    </content-box>
  </div>
</template>

<script>
// Components
import ContentBox   from '@/vue/components/Common/ContentBox';
import InputRegion  from '@/vue/components/Common/InputRegion';
import InputString  from '@/vue/components/Common/InputString';
import SubmitButton from '@/vue/components/Common/SubmitButton';

export default {
  data() {
    return {
      button: {
        status: 'default'
      },
      inputs: {
        cityName: {
          error: '',
          value: ''
        },
        cityNameKana: {
          error: '',
          value: ''
        },
        cityNameEnglish: {
          error: '',
          value: ''
        },
        origin: {
          error: '',
          value: ''
        },
        summary: {
          error: '',
          value: ''
        },
        corners: {
          error: '',
          value: []
        },
        count: {
          error: '',
          value: 0
        },
        reason: {
          error: '',
          value: ''
        },
        remarks: {
          error: '',
          value: ''
        },
      }
    }
  },
  title() {
    return this.pageTitle;
  },
  computed: {
    me() {
      return this.$store.getters.me;
    },
    usertoken() {
      return this.me.usertoken;
    }
  },
  methods: {
    setCount( value ) {
      this.inputs.count.value = value;
    },
    postRequest() {
      if( this.validateInputs() && this.button.status === 'default' ) {
        this.button.status = 'loading';
        // reCAPTCHA取得
        this.$recaptchaLoaded()
          .then( () => {
            // token取得
            return this.$recaptcha( 'login' );
          })
          .then( ( token ) => {
            // 申請送信
            return this.$axios.post(
              'https://api.jaoafa.com/v1/cities/create',
              JSON.stringify({
                usertoken: this.usertoken,
                cityName: this.inputs.cityName.value,
                cityNameKana: this.inputs.cityNameKana.value,
                regionName: this.inputs.cityNameEnglish.value,
                summary: this.inputs.summary.value,
                origin: this.inputs.origin.value,
                corners: this.inputs.corners.value,
                count: this.inputs.count.value,
                reason: this.inputs.reason.value,
                remarks: this.inputs.remarks.value,
                recaptcha: token
              })
            );
          })
          .then( ( res ) => {
            // 成功時
            this.button.status = 'success';
            this.$store.dispatch( 'addPopup', {
              type: 'success',
              title: '申請完了',
              text: '新規自治体の申請が完了しました。\n運営にて審議いたしますので、しばらくお待ち下さい。'
            });
          })
          .catch( ( error ) => {
            // 失敗時
            this.button.status = 'default';
            if( error.response.status === 401 ) {
              this.$store.dispatch( 'addPopup', {
                type: 'error',
                  title: '申請失敗',
                  text: '新規自治体の申請に失敗しました。\n一度ログアウトし、再度ログインをしてからもう一度お試しください。'
              });
            }
            else {
              let message = error.response.data.message;
              if( error.response.data.message_ja ) {
                message = error.response.data.message_ja;
              }
              this.$store.dispatch( 'addPopup', {
                type: 'error',
                title: '申請失敗',
                text: message
              });
            }
          });
      }
    },
    validateInputs() {
      let result = true;
      // 自治体名称
      if( this.inputs.cityName.value === '' ) {
        this.inputs.cityName.error = '自治体名称が入力されていません。';
        result = false;
      }
      else {
        this.inputs.cityName.error = '';
      }
      // 自治体名称（かな）
      if( this.inputs.cityNameKana.value === '' ) {
        this.inputs.cityNameKana.error = '自治体名称（かな）が入力されていません。';
        result = false;
      }
      else {
        this.inputs.cityNameKana.error = '';
      }
      // 自治体名称（英語）
      if( this.inputs.cityNameEnglish.value === '' ) {
        this.inputs.cityNameEnglish.error = '自治体名称（英語）が入力されていません。';
        result = false;
      }
      else if( this.inputs.cityNameEnglish.value.search(/^[A-Za-z]+$/)) {
        this.inputs.cityNameEnglish.error = '英字以外の文字が入力されています。';
        result = false;
      }
      else if( this.inputs.cityNameEnglish.value.search(/^[a-z]+$/)) {
        this.inputs.cityNameEnglish.error = '小文字英字のみで入力してください。';
        result = false;
      }
      else {
        this.inputs.cityNameEnglish.error = '';
      }
      // 自治体名称の由来
      if( this.inputs.origin.value === '' ) {
        this.inputs.origin.error = '自治体名称の由来が入力されていません。';
        result = false;
      }
      else {
        this.inputs.origin.error = '';
      }
      // 自治体概要
      if( this.inputs.summary.value === '' ) {
        this.inputs.summary.error = '自治体概要が入力されていません。';
        result = false;
      }
      else {
        this.inputs.summary.error = '';
      }
      // 自治体範囲
      if( this.inputs.count.value === 0 ) {
        result = false;
      }
      // 規定ブロック数を超える理由
      if( ( this.inputs.count.value > 250000 ) &&
          ( this.inputs.reason.value === '' ) ) {
        this.inputs.reason.error = '規定ブロック数を超える理由が入力されていません。';
        result = false;
      }
      else {
        this.inputs.reason.error = '';
      }
      return result;
    }
  },
  components: {
    ContentBox,
    InputRegion,
    InputString,
    SubmitButton
  }
}
</script>

<style lang="scss" scoped>
.Create {
  &__Form {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*4;
  }

  &__FormBody {
    display: grid;
    grid-template-columns: minmax( $size-base*1, auto );
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*2;
  }
}
</style>