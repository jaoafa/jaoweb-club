<template>
  <div class="Settings">
    <content-box
      :heading="'ユーザ設定'">
      <div class="Settings__Form">
        <div class="Settings__FormBody">
          <input-string
            :error="inputs.nickname.error"
            :label="'ニックネーム'"
            :required="true"
            :type="'text'"
            v-model="inputs.nickname.value" />
        </div>
        <div class="Settings__FormFooter">
          <submit-button
            :disabled="!validateInputs()"
            :label="'設定を保存'"
            :status="button.status"
            @click="saveSettings" />
        </div>
      </div>
    </content-box>
  </div>
</template>

<script>
// Components
import ContentBox   from '@/vue/components/Common/ContentBox';
import InputString  from '@/vue/components/Common/InputString';
import SubmitButton from '@/vue/components/Common/SubmitButton';

export default {
  data() {
    return {
      button: {
        status: 'default'
      },
      inputs: {
        nickname: {
          error: '',
          value: ''
        }
      }
    }
  },
  title() {
    return this.pageTitle;
  },
  created() {
    this.inputs.nickname.value = this.nickname;
  },
  computed: {
    me() {
      return this.$store.getters.me;
    },
    usertoken() {
      return this.me.usertoken;
    },
    nickname() {
      return this.me.nickname;
    }
  },
  methods: {
    saveSettings() {
      if( this.validateInputs() && this.button.status==='default' ) {
        this.button.status = 'loading';
        // reCAPTCHA取得
        this.$recaptchaLoaded().then( () => {
          this.$recaptcha( 'login' ).then( ( token ) => {
            // ニックネーム変更
            this.$axios.post(
              'https://api.jaoafa.com/v1/club/nickname',
              JSON.stringify({
                nickname: this.inputs.nickname.value,
                usertoken: this.usertoken,
                recaptcha: token
              })
            ).then( res => {
              if( res.data.status ) {
                // 成功時
                this.button.status = 'success';
                this.$store.dispatch( 'changeNickname', {
                  nickname: this.inputs.nickname.value
                });
              }
              else {
                // 失敗時
                this.button.status = 'default';
              }
            }).catch( error => {
              // エラー
              this.button.status = 'default';
            });
          });
        });
      }
    },
    validateInputs() {
      if( ( this.inputs.nickname.value === '' ) ) {
        this.inputs.nickname.error = 'ニックネームが入力されていません。';
        return false;
      }
      else {
        this.inputs.nickname.error = '';
        return true;
      }
    }
  },
  components: {
    ContentBox,
    InputString,
    SubmitButton
  }
}
</script>

<style lang="scss" scoped>
.Settings {
  padding: $size-base*4 $size-base*5;

  &__Form {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*3;
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