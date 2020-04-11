<template>
  <div class="Cities">
    <h2 class="Cities__Heading">{{ this.$route.meta.label }}</h2>
    <div class="Cities__Form">

      <section class="Cities__Section">
        <h3 class="Cities__SectionHeading">申請者情報</h3>
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
      <section class="Cities__Section">
        <h3 class="Cities__SectionHeading">自治体情報</h3>
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
          :required="true" />
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
      <button
        class="Cities__Button"
        type="button"
        :class="{'_disabled': error}"
        :disabled="error">
        送信
      </button>
    </div>
  </div>
</template>

<script>
// Components
import InputRegion  from '@/vue/components/Common/InputRegion';
import InputText    from '@/vue/components/Common/InputText';

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
        reason: {
          error: false,
          value: ''
        },
        remarks: {
          error: false,
          value: ''
        }
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
        path: "/city",
        label: "自治体申請"
      },
      {
        path: "",
        label: "新規自治体申請"
      }
    ]);
  },
  title() {
    return this.pageTitle+' - jao Minecraft Server';
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
    }
  },
  components: {
    InputRegion,
    InputText
  }
}
</script>

<style lang="scss" scoped>
.Cities {
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
  &__Button {
    width: $size-base*12;
    padding: $size-base*1/2;
    background: $color-primary;
    border: solid 1px $color-primary;
    border-radius: $size-base*1;
    font-size: $font-size-s1;
    text-align: center;
    transition-duration: $transition-duration-base;

    &:hover {
      opacity: .8;
    }
    &._disabled {
      cursor: not-allowed;
      color: $color-gray-4;
      background: $color-gray-6;
      border-color: $color-gray-5;
    }
  }
}
</style>