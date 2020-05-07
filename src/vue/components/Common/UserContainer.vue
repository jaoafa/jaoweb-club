<template>
  <div class="UserContainer">
    <button
      class="UserContainer__ToggleButton"
      type="button"
      @click="toggleMenu">
      <img
        class="UserContainer__Image"
        :src="'https://crafatar.com/avatars/'+uuid+'?size=40&overlay'" />
    </button>
    <transition>
      <div
        class="UserContainer__MenuContainer"
        v-show="toggle">
        <div class="UserContainer__UserInfo">
          <div class="UserContainer__UserIcon">
            <img
            class="UserContainer__Image"
            :src="'https://crafatar.com/avatars/'+uuid+'?size=64&overlay'" />
          </div>
          <div class="UserContainer__UserName">
            <span class="UserContainer__UserNameText">{{ nickname }}</span>
            <span class="UserContainer__UserPermission">{{ permission }}</span>
          </div>
          <div class="UserContainer__UserId">
            Minecraft ID: {{ mcid }}
          </div>
        </div>
        <ul class="UserContainer__Menu">
          <li class="UserContainer__MenuItem" @click="doLogout">
            <i class="fas fa-sign-out-alt"></i>
            ログアウト
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false
    }
  },
  computed: {
    me() {
      return this.$store.getters.me;
    },
    usertoken() {
      return this.me.usertoken;
    },
    mcid() {
      return this.me.mcid;
    },
    uuid() {
      return this.me.uuid;
    },
    nickname() {
      return this.me.nickname;
    },
    permission() {
      return this.me.permission;
    }
  },
  methods: {
    toggleMenu() {
      this.toggle = !this.toggle;
    },
    doLogout() {
      this.$store.dispatch( 'doLogout' );
      this.$router.push({ name: 'signin' });
    }
  }
}
</script>

<style lang="scss" scoped>
.UserContainer {
  height: 100%;
  position: relative;

  &__ToggleButton {
    width: $size-base*5;
    height: 100%;
    overflow: hidden;
    border-radius: $size-border-radius-base;
    cursor: pointer;
    transition-duration: $transition-duration-base;

    &:hover {
      filter: brightness( .8 );
    }
  }

  &__Image {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__MenuContainer {
    width: $size-base*50;
    position: absolute;
    top: $size-base*6;
    right: 0;
    z-index: 120;
    overflow: hidden;
    border-radius: $size-border-radius-base;
    box-shadow: 0 0 $size-base*1 $color-shadow;

    &.v-enter-active, &.v-leave-active {
      opacity: 1;
      transition-duration: $transition-duration-base;
    }
    &.v-enter, &.v-leave-to {
      opacity: 0;
    }
  }

  &__UserInfo {
    padding: $size-base*3 $size-base*4;
    display: grid;
    grid-template-columns: $size-base*8 1fr;
    grid-template-rows: repeat( 2, auto );
    gap: 0 $size-base*3;
    color: $color-white;
    background: linear-gradient(
      135deg,
      $color-primary 24%,
      $color-prmary-dark 120%
    );
  }

  &__UserIcon {
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    overflow: hidden;
    border-radius: $size-border-radius-base;
    box-shadow: 0 0 $size-base*1 $color-shadow;
  }

  &__UserName {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    padding-top: $size-base*1/2;
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-rows: auto;
    gap: $size-base*1;
    align-items: center;
    font-size: $font-size-l2;
    font-weight: $font-weight-bold;
    line-height: 1.0;
  }

  &__UserNameText {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__UserPermission {
    margin-top: $size-base*1/2;
    padding: $size-base*1/2 $size-base*1;
    display: inline-block;
    background: $color-secondary;
    font-family: $font-family-en;
    font-size: $font-size-s3;
    font-weight: $font-weight-normal;
    text-align: center;
    border-radius: $size-border-radius-base;
  }

  &__UserId {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    align-self: center;
    font-family: $font-family-en;
    font-size: $font-size-s2;
  }

  &__Menu {
    padding: $size-base*2 $size-base*4;
    list-style: none;
    background: $color-white;
  }

  &__MenuItem {
    padding: $size-base*1 0;
    display: grid;
    grid-template-columns: $size-base*8 1fr;
    grid-template-rows: auto;
    gap: 0 $size-base*3;
    align-items: baseline;
    border: solid 2px transparent;
    cursor: pointer;
    transition-duration: $transition-duration-base;

    &:hover {
      border-color: $color-primary;
    }

    i {
      text-align: center;
    }
  }
}
</style>