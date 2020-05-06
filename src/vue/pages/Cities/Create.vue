<template>
  <div class="Create">
    <h2 class="Create__Heading">{{ this.$route.meta.label }}</h2>
    <div class="Create__Form">

      <section class="Create__Section">
        <h3 class="Create__SectionHeading">申請者情報</h3>
        <input-text
          :errorMessage="'半角英字10桁の認証コードを入力してください。'"
          :label="'認証コード'"
          :name="'verificationCode'"
          :pattern="/^[a-zA-Z]{10}$/g"
          :placeholder="'XXXXXXXXXX'"
          :required="true"
          :value="input.verificationCode.value"
          @change="changeValue" />
      </section>
      <section class="Create__Section">
        <h3 class="Create__SectionHeading">自治体情報</h3>
        <input-text
          :label="'名称'"
          :name="'cityName'"
          :placeholder="'爆新地'"
          :required="true"
          :value="input.cityName.value"
          @change="changeValue" />
        <input-text
          :label="'名称（かな）'"
          :name="'cityNameKana'"
          :placeholder="'ばくしんち'"
          :required="true"
          :value="input.cityNameKana.value"
          @change="changeValue" />
        <input-text
          :label="'名称の由来'"
          :name="'origin'"
          :placeholder="'爆発の始まり。爆発の根源。中心地。つまり爆心地。新しいので爆新地。'"
          :required="true"
          :textarea="true"
          :value="input.origin.value"
          @change="changeValue" />
        <input-text
          :label="'概要'"
          :name="'summary'"
          :placeholder="'Jao_Afaワールドの中心に位置する運営が管理する自治体'"
          :required="true"
          :textarea="true"
          :value="input.summary.value"
          @change="changeValue" />
        <input-region
          :label="'範囲'"
          :name="'region'"
          :required="true"
          :value="input.region.value"
          @change="changeValue" />
        <input-text
          :label="'規定ブロックを超える理由'"
          :name="'reason'"
          :required="false"
          :textarea="true"
          :value="input.reason.value"
          @change="changeValue" />
        <input-text
          :label="'備考'"
          :name="'remarks'"
          :required="false"
          :textarea="true"
          :value="input.remarks.value"
          @change="changeValue" />
      </section>
      <submit-button
        :disabled="error"
        :failure="button.failure"
        :label="'送信'"
        :loading="button.loading"
        :success="button.success"
        @click="postData" />
    </div>
  </div>
</template>

<script>
// Components
import InputRegion  from '@/vue/components/Common/InputRegion';
import InputText    from '@/vue/components/Common/InputText';
import SubmitButton from '@/vue/components/Common/SubmitButton';

export default {
  data() {
    return {
      input: {
        verificationCode: {
          error: true,
          value: ''
        },
        cityName: {
          error: true,
          value: ''
        },
        cityNameKana: {
          error: true,
          value: ''
        },
        origin: {
          error: true,
          value: ''
        },
        summary: {
          error: true,
          value: ''
        },
        region: {
          error: true,
          value: [],
          count: 0
        },
        reason: {
          error: false,
          value: ''
        },
        remarks: {
          error: false,
          value: ''
        }
      },
      button: {
        loading: false,
        success: false
      }
    }
  },
  created() {
    this.$emit( 'breadcrumbs', [
      {
        path: "/",
        label: "Home"
      },
      {
        path: "/cities",
        label: "自治体"
      },
      {
        path: "",
        label: "新規自治体申請"
      }
    ]);
  },
  title() {
    return this.pageTitle;
  },
  computed: {
    error() {
      let error = false;
      Object.keys( this.input ).forEach( ( key ) => {
        if( this.input[key].error ) {
          error = true;
        }
      });
      return error;
    }
  },
  methods: {
    changeValue( res ) {
      this.input[res.name].value = res.value;
      this.input[res.name].error = res.error;
      if( 'count' in this.input[res.name] ) {
        this.input[res.name].count = res.count;
      }
    },
    postData() {
      if( !this.button.loading && !this.error && !this.button.success ) {
        this.button.loading = true;
        let data = {
          verificationCode: this.input.verificationCode.value,
          cityName: this.input.cityName.value,
          cityNameKana: this.input.cityNameKana.value,
          origin: this.input.origin.value,
          summary: this.input.summary.value,
          region: this.input.region.value,
          count: this.input.region.count,
          reason: this.input.reason.value,
          remarks: this.input.remarks.value
        };
        window.grecaptcha.ready(() => {
          grecaptcha.execute(
            '6Ld--owUAAAAAAWRqAy6hCfEDmV4TRh__KD20npl',
            { action: 'login' }
          ).then( ( token ) => {
            data.token = token;
            this.$axios.post(
              'https://api.jaoafa.com/v1/cities/create',
              JSON.stringify( data )
            ).then( res => {
              console.log( JSON.stringify( res.data ) );
              this.button.loading = false;
              this.button.success = true;
              this.addPopup(
                '送信成功',
                '送信に成功しました。',
                'success'
              );
            }).catch( error => {
              console.log( error );
              this.button.loading = false;
              this.addPopup(
                '送信失敗',
                '送信に失敗しました。',
                'error'
              );
            });
          });
        });
      }
    },
    addPopup( title, body, type ) {
      this.$emit( 'addPopup', {
        title: title,
        body: body,
        type: type
      });
    }
  },
  components: {
    InputRegion,
    InputText,
    SubmitButton
  }
}
</script>

<style lang="scss" scoped>
.Create {
  &__Heading {
    padding-bottom: $size-base*1;
    font-size: $font-size-l4;
    border-bottom: solid 1px $color-gray-4;
    line-height: 1.5;
  }
  &__SectionHeading {
    font-size: $font-size-l2;
  }
  &__Form {
    margin-top: $size-base*3;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    gap: $size-base*5;
  }
  &__Section {
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    gap: $size-base*3;
  }
}
</style>