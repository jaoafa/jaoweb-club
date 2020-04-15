<template>
  <div class="App">
    <header-container />
    <div class="App__Main">
      <template v-if="breadcrumbs.length>0">
        <breadcrumbs :items="breadcrumbs" />
      </template>
      <wrap class="App__Container">
        <navigation />
        <router-view
          @breadcrumbs="setBreadcrumbs"
          @addPopup="addPopup" />
      </wrap>
    </div>
    <popups
      class="App__Popups"
      :popups="popups"
      @removePopup="removePopup" />
  </div>
</template>

<script>
// Components
import Breadcrumbs      from '@/vue/components/Common/Breadcrumbs';
import HeaderContainer  from '@/vue/components/Common/HeaderContainer';
import Navigation       from '@/vue/components/Common/Navigation';
import Popups           from '@/vue/components/Common/Popups';
import Wrap             from '@/vue/components/Common/Wrap';

export default {
  data() {
    return {
      breadcrumbs: [],
      popups: [
      ]
    }
  },
  methods: {
    setBreadcrumbs( value ) {
      this.breadcrumbs = value;
    },
    addPopup( value ) {
      let max = this.popups.reduce( ( a, b ) => {
        return a.id > b.id ? a : b;
      }, { id: 0 });
      this.popups.unshift({
        id: ( max.id + 1 ),
        title: value.title,
        body: value.body,
        type: value.type
      });
    },
    removePopup( index ) {
      this.popups.splice( index, 1 );
    }
  },
  components: {
    Breadcrumbs,
    HeaderContainer,
    Navigation,
    Popups,
    Wrap
  }
}
</script>

<style lang="scss" scoped>
.App {
  position: relative;

  &__Main {
    margin-top: $size-base*10;
  }
  &__Container {
    padding-top: $size-base*4;
    padding-bottom: $size-base*8;
    display: grid;
    grid-template-columns: $size-base*40 1fr;
    grid-template-rows: auto;
    gap: $size-base*7;
    align-items: start;
  }
}
</style>