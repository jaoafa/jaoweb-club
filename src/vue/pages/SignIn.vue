<template>
  <div class="SignIn">
    <div class="SignIn__Container">
      <div class="SignIn__Form">
        <div class="SignIn__FormHeader">
          <h1 class="SignIn__Title">ログイン</h1>
          <template v-if="error!==''">
            <p class="SignIn__Error">
              <i class="fas fa-exclamation-triangle"></i>
              <span>{{ error }}</span>
            </p>
          </template>
        </div>
        <div class="SignIn__FormBody">
          <input-string
            :label="'Minecraft ID'"
            :required="true"
            :type="'text'"
            v-model="inputs.username" />
          <input-string
            :label="'パスワード'"
            :required="true"
            :type="'password'"
            v-model="inputs.password" />
        </div>
        <div class="SignIn__FormFooter">
          <submit-button
            class="SignIn__Button"
            :disabled="!validateInputs()"
            :label="'ログイン'"
            :status="button.status"
            @click="doLogin" />
          <div class="SignIn__Link">
            <router-link
              class="SignIn__LinkText"
              to="/signup">
              アカウントを作成する
            </router-link>
          </div>
        </div>
      </div>
      <div class="SignIn__Visual"></div>
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
        username: '',
        password: '',
      }
    }
  },
  title() {
    return this.pageTitle;
  },
  methods: {
    doLogin() {
      if( this.validateInputs() && this.button.status==='default' ) {
        this.button.status = 'loading';
        let usertoken = '';
        this.$recaptchaLoaded()
          .then( () => {
            // reCAPTCHA取得
            return this.$recaptcha( 'login' );
          })
          .then( ( token ) => {
            // UserToken取得
            return this.$axios.get(
              'https://api.jaoafa.com/v1/club/token',
              {
                params: {
                  username: this.inputs.username,
                  password: this.inputs.password,
                  recaptcha: token
                }
              }
            );
          })
          .then( ( res ) => {
            // ユーザ情報取得
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
            });
            // homeに遷移
            this.$router.push({ name: 'home' });
          })
          .catch( ( error ) => {
            this.error = 'Minecraft ID もしくは Password が間違っています。';
            this.button.status = 'default';
          }
        );
      }
    },
    validateInputs() {
      if( ( this.inputs.username === '' ) || ( this.inputs.password === '' ) ) {
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
.SignIn {
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