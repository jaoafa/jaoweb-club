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
            :label="'Password'"
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
        </div>
      </div>
      <div class="SignUp__Visual"></div>
    </div>
  </div>
</template>

<script>
// Components
import InputString  from '@/vue/components/Common/InputString';
import SubmitButton from '@/vue/components/Common/SubmitButton';

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
        // reCAPTCHA取得
        this.$recaptchaLoaded().then( () => {
          this.$recaptcha( 'login' ).then( ( token ) => {
            // 登録処理
            this.$axios.post(
              'https://api.jaoafa.com/v1/club/register',
              JSON.stringify({
                verificationCode: this.verificationCode,
                password: this.password,
                recaptcha: token
              })
            ).then( res => {
              if( res.data.status ) {
                // 成功時
                let usertoken = res.data.usertoken;
                // ユーザ情報取得
                this.$axios.get(
                  'https://api.jaoafa.com/v1/club/@me',
                  {
                    params: {
                      usertoken: usertoken
                    }
                  }
                ).then( res => {
                  if( res.data.status ) {
                    // 成功時
                    this.button.status = 'success';
                    // UserToken, Minecraft ID, UUID, ニックネーム, 権限グループ情報を保持
                    let nickname = res.data.data.mcid;
                    if( res.data.data.nickname ) {
                      nickname = res.data.data.nickname;
                    }
                    this.$store.dispatch( 'doLogin', {
                      usertoken:  usertoken,
                      mcid:       res.data.data.mcid,
                      uuid:       res.data.data.uuid,
                      nickname:   nickname,
                      permission: res.data.data.permission
                    })
                    // homeに遷移
                    this.$router.push({ name: 'home' });
                  }
                  else {
                    // signinに遷移
                    this.$router.push({ name: 'signin' });
                  }
                }).catch( error => {
                  // signinに遷移
                  this.$router.push({ name: 'signin' });
                });
              }
              else {
                // 失敗時
                this.error = '登録に失敗しました。もう一度お試しください。';
                this.button.status = 'default';
              }
            }).catch( error => {
              // エラー
              this.error = '登録に失敗しました。もう一度お試しください。';
              this.button.status = 'default';
            })
          });
        });
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
      $color-orange 120%
    );
  }
}
</style>