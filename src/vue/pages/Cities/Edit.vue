<template>
  <div class="Edit">
    <prev-link />
    <content-box
      :heading="'自治体情報変更申請'">
      <div class="Edit__Form">
        <div class="Edit__FormBody">
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
          <input-corners
            :label="'自治体範囲'"
            :required="true"
            v-model="inputs.corners.value"
            @count="setCount" />
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
import InputCorners from '@/vue/components/Input/InputCorners';
import InputString  from '@/vue/components/Input/InputString';
import PrevLink     from '@/vue/components/Common/PrevLink';
import SubmitButton from '@/vue/components/Common/SubmitButton';

import axios        from 'axios';
import store        from '@/js/store.js';

export default {
  data() {
    return {
      button: {
        status: 'default'
      },
      inputs: {
        cityName: {
          error: '',
          original: '',
          value: ''
        },
        cityNameKana: {
          error: '',
          original: '',
          value: ''
        },
        cityNameEnglish: {
          error: '',
          value: ''
        },
        origin: {
          error: '',
          original: '',
          value: ''
        },
        summary: {
          error: '',
          original: '',
          value: ''
        },
        corners: {
          error: '',
          original: [],
          value: []
        },
        count: {
          error: '',
          value: 0
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
  beforeRouteEnter( to, from, next ) {
    axios.get(
      'https://api.jaoafa.com/cities/'+to.params.id,
      {
        params: {
          usertoken: store.getters.me.usertoken
        }
      }
    )
    .then( ( res ) => {
      let data        = res.data.data;
      let permission  = store.getters.me.permission;
      if( ( permission !== 'Admin' ) &&
          ( permission !== 'Moderator' ) &&
          ( store.getters.me.uuid !== data.uuid ) ) {
        store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: '編集しようとした自治体を編集する権限がありません。'
        });
        next({ name: 'cities' });
      }
      next( ( vm ) => {
        vm.inputs.corners.value.splice( 0 );
        data.corners.forEach( ( item ) => {
          item.x = item.x + '';
          item.z = item.z + '';
          vm.inputs.corners.value.push( item );
          vm.inputs.corners.original.push( item );
        });
        vm.inputs.cityName.value    = data.name ? data.name : '';
        vm.inputs.cityName.original = data.name ? data.name : '';
        vm.inputs.cityNameKana.value    = data.namekana ? data.namekana : '';
        vm.inputs.cityNameKana.original = data.namekana ? data.namekana : '';
        vm.inputs.cityNameEnglish.value = data.regionname ? data.regionname : '';
        vm.inputs.origin.value    = data.name_origin ? data.name_origin : '';
        vm.inputs.origin.original = data.name_origin ? data.name_origin : '';
        vm.inputs.summary.value     = data.summary ? data.summary : '';
        vm.inputs.summary.original  = data.summary ? data.summary : '';
      });
    })
    .catch( ( error ) => {
      if( error.response && error.response.status === 401 ) {
        store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: '自治体情報の取得に失敗しました。\n一度ログアウトし、再度ログインをしてからもう一度お試しください。'
        });
      }
      else {
        let message = '自治体情報の取得に失敗しました。\nもう一度お試しください。';
        if( error.response ) {
          let data = error.response.data;
          message = data.message_ja ? data.message_ja : data.message;
        }
        store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: message
        });
      }
      next({ name: 'cities' });
    })
  },
  beforeRouteUpdate( to, from, next ) {
    this.$axios.get(
      'https://api.jaoafa.com/cities/'+this.id,
      {
        params: {
          usertoken: this.usertoken
        }
      }
    )
    .then( ( res ) => {
      let data = res.data.data;
      if( ( this.permission !== 'Admin' ) &&
          ( this.permission !== 'Moderator' ) &&
          ( this.uuid !== data.uuid ) ) {
        this.$store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: '編集しようとした自治体を編集する権限がありません。'
        });
        next({ name: 'cities' });
      }
      this.inputs.corners.value.splice( 0 );
      data.corners.forEach( ( item ) => {
        item.x = item.x + '';
        item.z = item.z + '';
        this.inputs.corners.value.push( item );
        this.inputs.corners.original.push( item );
      });
      this.inputs.cityName.value    = data.name ? data.name : '';
      this.inputs.cityName.original = data.name ? data.name : '';
      this.inputs.cityNameKana.value    = data.namekana ? data.namekana : '';
      this.inputs.cityNameKana.original = data.namekana ? data.namekana : '';
      this.inputs.cityNameEnglish.value = data.regionname ? data.regionname : '';
      this.inputs.origin.value    = data.name_origin ? data.name_origin : '';
      this.inputs.origin.original = data.name_origin ? data.name_origin : '';
      this.inputs.summary.value     = data.summary ? data.summary : '';
      this.inputs.summary.original  = data.summary ? data.summary : '';
      next();
    })
    .catch( ( error ) => {
      if( error.response && error.response.status === 401 ) {
        this.$store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: '自治体情報の取得に失敗しました。\n一度ログアウトし、再度ログインをしてからもう一度お試しください。'
        });
      }
      else {
        let message = '自治体情報の取得に失敗しました。\nもう一度お試しください。';
        if( error.response ) {
          let data = error.response.data;
          message = data.message_ja ? data.message_ja : data.message;
        }
        this.$store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: message
        });
      }
      next({ name: 'cities' });
    })
  },
  props: {
    id: {
      // 自治体ID
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    me() {
      return this.$store.getters.me;
    },
    usertoken() {
      return this.me.usertoken;
    },
    uuid() {
      return this.me.uuid;
    },
    permission() {
      return this.me.permission;
    }
  },
  methods: {
    setCount( value ) {
      this.inputs.count.value = value;
    },
    postRequest() {
      if( this.validateInputs() && this.button.status === 'default' ) {
        this.button.status = 'loading';
        let send = {
          remarks: this.inputs.remarks.value
        };
        new Promise( ( resolve, reject ) => {
          let change = {
            corners: false,
            info: false
          };
          let points = this.inputs.corners.value.map( ( point, index ) => {
            if( ( ( !this.inputs.corners.original[index] ) ||
                  ( point.x !== this.inputs.corners.original[index].x ) ||
                  ( point.z !== this.inputs.corners.original[index].z ) ) &&
                ( change.corners === false ) ) {
              change.corners = true;
            }
            return {
              id: index + 1,
              x: point.x,
              z: point.z
            }
          });
          if( change.corners ) {
            send.corners  = points;
            send.count    = this.inputs.count.value;
          }
          if( this.inputs.cityName.value !== this.inputs.cityName.original ) {
            send.cityName = this.inputs.cityName.value;
            change.info = true;
          }
          if( this.inputs.cityNameKana.value !== this.inputs.cityNameKana.original ) {
            send.cityNameKana = this.inputs.cityNameKana.value;
            change.info = true;
          }
          if( this.inputs.origin.value !== this.inputs.origin.original ) {
            send.origin = this.inputs.origin.value;
            change.info = true;
          }
          if( this.inputs.summary.value !== this.inputs.summary.original ) {
            send.summary = this.inputs.summary.value;
            change.info = true;
          }
          if( change.corners && change.info ) {
            reject({
              response: {
                status: 418,
                data: {
                  message: '',
                  message_ja: '情報変更と範囲変更を同時に申請することはできません。'
                }
              }
            });
          }
          else if( !change.corners && !change.info ) {
            reject({
              response: {
                status: 418,
                data: {
                  message: '',
                  message_ja: '変更したい項目の内容を変更して申請してください。'
                }
              }
            });
          }
          else {
            resolve();
          }
        })
        .then( () => {
          return this.$recaptchaLoaded()
        })
        .then( () => {
          // reCAPTCHA取得
          return this.$recaptcha( 'login' );
        })
        .then( ( token ) => {
          // 申請送信
          send.usertoken = this.usertoken;
          send.recaptcha = token;
          return this.$axios.patch(
            'https://api.jaoafa.com/v1/cities/edit/'+this.id,
            JSON.stringify( send )
          );
        })
        .then( ( res ) => {
          this.button.status = 'success';
          this.$store.dispatch( 'addPopup', {
            type: 'success',
            title: '申請完了',
            text: '自治体情報変更の申請が完了しました。（リクエストID：'+res.data.request_id+'）\n運営にて審議いたしますので、しばらくお待ち下さい。'
          });
        })
        .catch( ( error ) => {
          this.button.status = 'default';
          if( error.response && error.response.status === 401 ) {
            this.$store.dispatch( 'addPopup', {
              type: 'error',
                title: '申請失敗',
                text: '自治体情報変更の申請に失敗しました。\n一度ログアウトし、再度ログインをしてからもう一度お試しください。'
            });
          }
          else {
            let message = '自治体情報変更の申請に失敗しました。\nもう一度お試しください。';
            if( error.response ) {
              let data = error.response.data;
              message = data.message_ja ? data.message_ja : data.message;
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
      return result;
    }
  },
  components: {
    ContentBox,
    InputCorners,
    InputString,
    PrevLink,
    SubmitButton
  }
}
</script>

<style lang="scss" scoped>
.Edit {
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