<template>
  <div class="App">
    <header-container />
    <div class="App__Main">
      <template v-if="breadcrumbs.length>0">
        <breadcrumbs :items="breadcrumbs" />
      </template>
      <wrap class="App__Container">
        <navigation />
        <router-view @breadcrumbs="setBreadcrumbs" />
      </wrap>
    </div>
  </div>
</template>

<script>
// Components
import Breadcrumbs      from '@/vue/components/Common/Breadcrumbs';
import HeaderContainer  from '@/vue/components/Common/HeaderContainer';
import Navigation       from '@/vue/components/Common/Navigation';
import Wrap             from '@/vue/components/Common/Wrap';

export default {
  data() {
    return {
      breadcrumbs: []
    }
  },
  methods: {
    setBreadcrumbs( value ) {
      this.breadcrumbs = value;
    }
  },
  components: {
    Breadcrumbs,
    HeaderContainer,
    Navigation,
    Wrap
  }
}
</script>

<style lang="scss" scoped>
.App {
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