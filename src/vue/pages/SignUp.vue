<template>
  <div class="SignUp">
    <div class="SignUp__Container">
      <div class="SignUp__Form">
        <div class="SignUp__FormHeader">
          <h1 class="SignUp__Title">新規登録</h1>
          <template v-if="error!==''">
            <p class="SignUp__Error">
              <i class="fas fa-exclamation-triangle"></i>
              <span>{{ error }}</span>
            </p>
          </template>
        </div>
        <div class="SignUp__FormBody">
          <input-string
            :label="'認証コード'"
            :required="true"
            :type="'text'"
            v-model="inputs.verificationCode" />
          <input-string
            :label="'パスワード'"
            :required="true"
            :type="'password'"
            v-model="inputs.password" />
        </div>
        <div class="SignUp__FormFooter">
          <submit-button
            class="SignUp__Button"
            :disabled="!validateInputs()"
            :label="'アカウントを作成'"
            :status="button.status"
            @click="doRegister" />
          <div class="SignUp__Link">
            <a
              class="SignUp__LinkText" 
              href="https://jaoafa.com/rule/clubjaoafa"
              target="_blank"
              rel="noopener">
              登録前にこちらの説明をお読みください。
            </a>
          </div>
        </div>
      </div>
      <div class="SignUp__Visual"></div>
    </div>
  </div>
</template>

<script>
// Components
import SubmitButton from '@/vue/components/Common/SubmitButton';
import InputString  from '@/vue/components/Input/InputString';

export default {
  data() {
    return {
      button: {
        status: 'default'
      },
      error: '',
      inputs: {
        verificationCode: '',
        password: ''
      }
    }
  },
  title() {
    return this.pageTitle;
  },
  methods: {
    doRegister() {
      if( this.validateInputs() && this.button.status==='default' ) {
        this.button.status = 'loading';
        let usertoken = '';
        this.$recaptchaLoaded()
          .then( () => {
            // reCAPTCHA取得
            console.log( 'reCAPTCHA取得開始' );
            return this.$recaptcha( 'login' );
          })
          .then( ( token ) => {
            // 登録処理
            console.log( '登録処理開始' );
            return this.$axios.post(
              'https://api.jaoafa.com/v1/club/register',
              JSON.stringify({
                verificationCode: this.inputs.verificationCode,
                password: this.inputs.password,
                recaptcha: token
              })
            );
          })
          .then( ( res ) => {
            // ユーザ情報取得
            console.log( 'ユーザ情報取得開始' );
            usertoken = res.data.usertoken;
            return this.$axios.get(
              'https://api.jaoafa.com/v1/club/@me',
              {
                params: {
                  usertoken: usertoken
                }
              }
            );
          })
          .then( ( res ) => {
            // UserToken, Minecraft ID, UUID, ニックネーム, 権限情報を保持
            this.button.status = 'success';
            let data = res.data.data;
            let nickname = data.mcid;
            if( data.nickname ) {
              nickname = data.nickname;
            }
            this.$store.dispatch( 'doLogin', {
              usertoken:  usertoken,
              mcid:       data.mcid,
              uuid:       data.uuid,
              nickname:   nickname,
              permission: data.permission
            })
            // homeに遷移
            this.$router.push({ name: 'home' });
          })
          .catch( ( error ) => {
            if( usertoken === '' ) {
              this.error = '登録に失敗しました。もう一度お試しください。';
              this.button.status = 'default';
            }
            else {
              // signinに遷移
              this.$router.push({ name: 'signin' });
            }
          }
        );
      }
    },
    validateInputs() {
      if( ( this.inputs.verificationCode === '' ) || ( this.inputs.password === '' ) ) {
        return false;
      }
      else {
        return true;
      }
    }
  },
  components: {
    InputString,
    SubmitButton
  }
}
</script>

<style lang="scss" scoped>
.SignUp {
  min-height: calc( 100vh - #{$size-base}*8 );
  margin-top: $size-base*8;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &__Container {
    width: 72%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    overflow: hidden;
    background: $color-white;
    border-radius: $size-border-radius-base;
    box-shadow: 0 0 $size-base*1 $color-shadow;
  }

  &__Form {
    padding: $size-base*10 $size-base*6;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*4;
  }

  &__FormHeader, &__FormBody, &__FormFooter {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
  }

  &__FormHeader {
    gap: $size-base*1;
  }

  &__FormBody {
    gap: $size-base*2;
  }

  &__FormFooter {
    gap: $size-base*1
  }

  &__Title {
    font-size: $font-size-l3;
  }

  &__Error {
    display: grid;
    grid-template-columns: $size-base*2 1fr;
    grid-template-rows: auto;
    gap: $size-base*1;
    align-items: baseline;
    color: $color-secondary;
    font-size: $font-size-s2;
  }

  &__Link {
    text-align: right;
  }

  &__LinkText {
    color: $color-gray-3;
    font-size: $font-size-s2;

    &:hover {
      text-decoration: none;
    }
  }

  &__Visual {
    background: linear-gradient(
      135deg,
      $color-primary 24%,
      $color-prmary-dark 120%
    );
  }
}
</style>