<template>
  <div class="SignUp">
    <div class="SignUp__Container">
      <div class="SignUp__Visual"></div>
      <div class="SignUp__Form">
        <h1 class="SignUp__Title">新規登録</h1>
        <div class="SignUp__FormItemContainer">
          <div class="SignUp__FormItem">
            <label class="SignUp__Label">Verification Code</label>
            <input
              class="SignUp__Input"
              type="text"
              v-model="verificationCode" />
          </div>
          <div class="SignUp__FormItem">
            <label class="SignUp__Label">Password</label>
            <input
              class="SignUp__Input"
              type="password"
              v-model="password" />
          </div>
        </div>
        <submit-button
          class="SignUp__Button"
          :disabled="error"
          :label="'アカウントを作成'"
          :loading="button.loading"
          :success="button.success"
          @click="doLogin" />
      </div>
    </div>
  </div>
</template>

<script>
// Components
import SubmitButton from '@/vue/components/Common/SubmitButton';

export default {
  data() {
    return {
      verificationCode: '',
      password: '',
      button: {
        loading: false,
        success: false
      }
    }
  },
  title() {
    return this.pageTitle+' - jao Minecraft Server';
  },
  computed: {
    error() {
      if( ( this.verificationCode === '' ) || ( this.password === '' ) ) {
        return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {
    doLogin() {
      if( !this.error && !this.button.loading && !this.button.success ) {
        this.button.loading = true;
        this.$recaptchaLoaded().then( () => {
          this.$recaptcha( 'login' ).then( ( token ) => {
            this.$axios.post(
              'https://api.jaoafa.com/v1/club/register',
              JSON.stringify({
                verificationCode: this.verificationCode,
                password: this.password,
                recaptcha: token
              })
            ).then( res => {
              if( res.data.status ) {
                this.button.success = true;
                this.button.loading = false;
                this.$store.dispatch( 'doLogin', res.data.usertoken );
                this.$router.push({ name: 'home' });
              }
              else {
                this.button.loading = false;
              }
            }).catch( error => {
              console.log( error );
              this.button.loading = false;
            })
          })
        })
      }
    }
  },
  components: {
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
  &__Visual {
    background: linear-gradient(
      135deg,
      $color-primary 24%,
      $color-orange 120%
    );
  }
  &__Form {
    padding: $size-base*10 $size-base*6;
  }
  &__Title {
    font-size: $font-size-l3;
  }
  &__FormItemContainer {
    margin-top: $size-base*4;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*2;
  }
  &__FormItem {
    color: $color-gray-1;
    font-family: $font-family-en;
    font-weight: $font-weight-normal;
  }
  &__Label {
    display: block;
    font-size: $font-size-s2;
  }
  &__Input {
    width: 100%;
    padding: $size-base*1/2 $size-base*2;
    display: block;
    font-size: $font-size-s1;
    border: solid 1px $color-gray-4;
    border-radius: $size-border-radius-base;

    &:focus {
      border-color: $color-blue;
    }
  }
  &__Button {
    margin-top: $size-base*4;
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
}
</style>