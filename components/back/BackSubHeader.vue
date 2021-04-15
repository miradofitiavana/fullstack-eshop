<template>
  <div class="subheader">
    <div class="subheader__container">
      <div class="subheader__left">
        <div class="subheader__back" v-if="showBack">
          <Button :btnFunc="backFunc" btnClass="subheader__button">
            <fa icon="arrow-left" />
          </Button>
        </div>
        <div class="subheader__titles" :class="showBack ? 'pl-4' : 'pl-0'">
          <ul class="breadcrumb" v-if="breadcrumbs">
            <li
              class="breadcrumb__item"
              v-for="breadcrumb in breadcrumbs"
              :key="breadcrumb.link"
            >
              <NuxtLink v-if="breadcrumb.link != '#'" :to="breadcrumb.link">
                <fa v-if="breadcrumb.icon" :icon="breadcrumb.icon" />
                <span>{{ breadcrumb.anchor }}</span>
              </NuxtLink>
              <template v-else>
                <fa v-if="breadcrumb.icon" :icon="breadcrumb.icon" />
                <span>{{ breadcrumb.anchor }}</span>
              </template>
            </li>
          </ul>
          <Title
            v-if="titleValue"
            class="text-3xl lg:text-4xl"
            :class="breadcrumbs ? 'mt-1 md:mt-3' : ''"
          >
            {{ titleValue }}
          </Title>
          <Subtitle
            v-if="subTitleValue"
            class="uppercase text-lg text-gray-700"
            >{{ subTitleValue }}</Subtitle
          >
        </div>
      </div>
      <div class="subheader__right mt-3 md:mt-0">
        <Button
          v-if="rightBtn != ''"
          :btnFunc="rightBtnFunc"
          :disableButton="disableButton"
          btnClass="button-shadow button-width"
        >
          {{ rightBtn }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
    },
    titleValue: {
      type: String,
    },
    subTitleValue: {
      type: String,
    },
    /** button back */
    showBack: {
      type: Boolean,
      default: false,
    },
    backFunc: Function,
    /** button right */
    rightBtn: String,
    rightBtnFunc: Function,
    disableButton: Boolean,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.subheader {
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  place-content: center space-between;
  align-items: center;
  background-color: #fdd835 !important;
  height: 160px !important;
  min-height: 160px !important;
  max-height: 160px !important;
  padding: 24px !important;

  &__container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: auto;
    align-content: stretch;
    width: 100%;
  }

  /** left subheader */
  &__left {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
  }

  &__titles {
  }

  &__button {
    background: none !important;
    color: #333e48 !important;
    font-size: 24px !important;
    padding: 0 !important;
    line-height: normal !important;
  }

  /** right subheader */
  &__right {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    align-content: flex-end;
  }
}

.breadcrumb {
  &__item {
    display: inline-block;
    font-weight: 400;
    font-size: 14px;

    &:not(:first-child) {
      padding-left: 10px;

      &:before {
        content: ">";
      }
    }
  }
}
</style>