<template>
  <div class="Edit">
    <content-box
      :heading="'自治体情報変更'">
      <div class="Edit__Form">
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
        <input-string
          :error="inputs.reason.error"
          :label="'規定ブロック数を超える理由'"
          :required="true"
          :type="'textarea'"
          v-model="inputs.reason.value" />
        <input-string
          :error="inputs.remarks.error"
          :label="'備考'"
          :required="true"
          :type="'textarea'"
          v-model="inputs.remarks.value" />
      </div>
    </content-box>
  </div>
</template>

<script>
// Components
import ContentBox   from '@/vue/components/Common/ContentBox';
import InputString  from '@/vue/components/Common/InputString';

export default {
  data() {
    return {
      inputs: {
        cityName: {
          error: '',
          value: ''
        },
        cityNameKana: {
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
        region: {
          error: '',
          value: []
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
  created() {
    // 自治体情報取得
    this.$axios.get(
      'https://api.jaoafa.com/cities/'+this.id,
      {
        params: {
          usertoken: this.usertoken
        }
      }
    ).then( res => {
      if( res.data.status ) {
        let data = res.data.data;
        this.inputs.cityName.value = data.name ? data.name : '';
        this.inputs.cityNameKana.value = data.namekana ? data.namekana : '';
        this.inputs.origin.value = data.name_origin ? data.name_origin : '';
        this.inputs.summary.value = data.summary ? data.summary : '';
        // this.inputs.region.value = data.region ? data.region : [];
        // this.inputs.reason.value = data.reason ? data.reason : '';
        this.inputs.remarks.value = data.remarks ? data.remarks : '';
      }
      else {}
    }).catch( error => {
      console.log( error );
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
    }
  },
  components: {
    ContentBox,
    InputString
  }
}
</script>

<style lang="scss" scoped>
.Edit {
  padding: $size-base*4 $size-base*5;

  &__Form {
    display: grid;
    grid-template-columns: minmax( $size-base*1, auto );
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*2;
  }
}
</style>