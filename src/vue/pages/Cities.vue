<template>
  <div class="Cities">
    <content-box
      :heading="'所有自治体'">
      <div class="Cities__List">
        <template v-for="( item ) in list">
          <router-link
            class="Cities__Item Cities__Item--Edit"
            :to="{ name: 'cities_edit', params: { id: item.id } }"
            :key="'cities_'+item.id">
            <h3 class="Cities__ItemHeader">
              <span>{{ item.name }}</span>
              <i class="fas fa-edit"></i>
            </h3>
            <p class="Cities__ItemBody">{{ item.summary }}</p>
          </router-link>
        </template>
        <router-link
          class="Cities__Item Cities__Item--Create"
          :to="{ name: 'cities_create' }">
          <h3>新しい自治体を申請</h3>
          <i class="fas fa-plus"></i>
        </router-link>
      </div>
    </content-box>
  </div>
</template>

<script>
// Components
import ContentBox from '@/vue/components/Common/ContentBox';

export default {
  data() {
    return {
      list: []
    }
  },
  title() {
    return this.pageTitle;
  },
  created() {
    // 所有自治体一覧取得
    this.$axios.get(
      'https://api.jaoafa.com/cities/'+this.uuid,
      {
        params: {
          usertoken: this.usertoken
        }
      }
    )
    .then( ( res ) => {
      if( res.data.status ) {
        res.data.data.forEach( item => {
          this.list.push( item );
        });
      }
    })
    .catch( ( error ) => {
      if( error.response.status === 401 ) {
        this.$store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: '所有自治体情報の取得に失敗しました。\n一度ログアウトし、再度ログインをしてからもう一度お試しください。'
        });
      }
      else {
        this.$store.dispatch( 'addPopup', {
          type: 'error',
          title: '取得失敗',
          text: '所有自治体情報の取得に失敗しました。\nもう一度お試しください。'
        });
      }
    });
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
    }
  },
  components: {
    ContentBox
  }
}
</script>

<style lang="scss" scoped>
.Cities {
  &__List {
    margin: $size-base*(-3) 0 0 $size-base*(-3);
    display: flex;
    flex-wrap: wrap;
  }

  &__Item {
    width: $size-base*29;
    height: $size-base*29;
    margin: $size-base*3 0 0 $size-base*3;
    padding: $size-base*2 $size-base*3;
    color: inherit;
    text-decoration: none;
    border: solid 1px $color-gray-4;
    border-radius: $size-border-radius-base;
    transition-duration: $transition-duration-base;

    &:hover {
      border-color: $color-primary;
    }

    &--Edit {
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: auto 1fr;
      gap: $size-base*1;
      background: $color-white;
    }

    &--Create {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: $color-gray-6;
      text-align: center;

      h3 {
        color: $color-gray-2;
        font-size: $font-size-base;
        font-weight: $font-weight-normal;
      }
      i {
        margin-top: $size-base*1;
        color: $color-gray-4;
        font-size: $font-size-l6;
      }
    }
  }

  &__ItemHeader {
    display: grid;
    grid-template-columns: 1fr $size-base*2;
    grid-template-rows: auto;
    gap: $size-base*1;
    align-items: baseline;

    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: $font-size-l1;
    }
    i {
      font-size: $font-size-s2;
    }
  }

  &__ItemBody {
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: $color-gray-2;
    font-size: $font-size-s2;
  }
}
</style>