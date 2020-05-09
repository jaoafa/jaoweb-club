<template>
  <div class="Edit">
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
            v-model="inputs.region.value"
            @count="setCount" />
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
        // 初期値設定
        let data = res.data.data;
        this.inputs.region.value.splice( 0 );
        data.corners.forEach( ( item ) => {
          item.x = item.x + '';
          item.z = item.z + '';
          this.inputs.region.value.push( item );
        });
        this.inputs.cityName.value = data.name ? data.name : '';
        this.inputs.cityNameKana.value = data.namekana ? data.namekana : '';
        this.inputs.origin.value = data.name_origin ? data.name_origin : '';
        this.inputs.summary.value = data.summary ? data.summary : '';
        this.inputs.reason.value = data.reason ? data.reason : '';
        this.inputs.remarks.value = data.remarks ? data.remarks : '';
      }
    }).catch( error => {
      // エラー
      if( error.response.status === 401 ) {
        this.$store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: '自治体情報の取得に失敗しました。\n一度ログアウトし、再度ログインをしてからもう一度お試しください。'
        });
      }
      else {
        this.$store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: '自治体情報の取得に失敗しました。\nもう一度お試しください。'
        });
      }
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
  methods: {
    setCount( value ) {
      this.inputs.count.value = value;
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