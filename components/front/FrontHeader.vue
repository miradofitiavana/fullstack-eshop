<template>
  <header class="header" :class="fixed ? 'header__fixed' : ''">
    <!-- Header Top -->
    <div class="header__top">
      <div class="container">
        <div class="topbar flex items-center">
          <div class="topbar__left">
            <NuxtLink to="/" class="topbar__link">
              Bienvenue sur Electro Store
            </NuxtLink>
          </div>
          <div class="topbar__right ml-auto">
            <client-only>
              <ul class="topmenu">
                <li class="topmenu__item">
                  <fa icon="truck" />
                  <NuxtLink to="/track-orders" class="topmenu__link">
                    Suivre mes commandes
                  </NuxtLink>
                </li>
                <li v-if="!isLoggedIn" class="topmenu__item">
                  <fa icon="user" />
                  <NuxtLink to="/signup" class="topmenu__link">
                    S'inscrire
                  </NuxtLink>
                  <span>ou</span>
                  <NuxtLink to="/login" class="topmenu__link">
                    Se connecter
                  </NuxtLink>
                </li>
                <template v-else>
                  <li class="topmenu__item">
                    <fa icon="user" />
                    <NuxtLink to="/account" class="topmenu__link">
                      Mon compte
                    </NuxtLink>
                  </li>
                  <li class="topmenu__item">
                    <fa icon="sign-out-alt" />
                    <a href="#" @click.prevent="logout" class="topmenu__link">
                      Se déconnecter
                    </a>
                  </li>
                </template>
              </ul>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <!--/ Header Top -->
    <!-- Header Middle -->
    <div class="header__middle lg:pt-6 lg:pb-6" :class="isOpen ? 'open' : ''">
      <div class="container">
        <div class="flex-wrap items-center justify-between md:flex sm:block">
          <div class="middle__logo">
            <NuxtLink to="/">
              <Logo />
            </NuxtLink>
            <fa icon="times" @click="toggleSidebar" />
          </div>
          <div class="middle__nav">
            <nav>
              <div class="nav">
                <ul>
                  <li class="nav__item">
                    <NuxtLink class="nav__link" to="/">Home</NuxtLink>
                  </li>
                  <li class="nav__item">
                    <NuxtLink class="nav__link" to="/eshop">EShop</NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="middle__support">
            <div class="flex">
              <fa class="support__icon" icon="headset" />
              <div class="ml-4">
                <div class="phone">
                  <strong>SAV&nbsp;:&nbsp;</strong>
                  <a href="tel:+33179755010">
                    (+33)&nbsp;1&nbsp;79&nbsp;75&nbsp;50&nbsp;10
                  </a>
                </div>
                <div class="email">
                  Email&nbsp;:&nbsp;
                  <a href="mailto:info@electro.fr?subject=Help Need">
                    info@electro.fr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/ Header Middle -->
    <!-- Header Bottom -->
    <div class="header__bottom">
      <div class="container">
        <div
          class="flex justify-between flex-wrap items-center bottom__container relative"
        >
          <div class="bottom__toggle">
            <fa icon="bars" @click="toggleSidebar" />
          </div>
          <div class="bottom__categories">
            <div>
              <!-- <div class="shop">Voir par Catégorie</div> -->
              <HeaderDropdown title="Voir par Catégorie" :items="categories">
                <template v-slot:itemValue="slotProps">
                  {{ slotProps.item.title }}
                </template>
              </HeaderDropdown>
            </div>
            <ul class="bottom__nav">
              <li class="bottom__item">
                <a href="" class="bottom__link">
                  <fa icon="search" />
                </a>
              </li>
            </ul>
          </div>
          <div class="bottom__search">
            <FrontFormUnique
              placeholder="Rechercher un article"
              icon="search"
            />
          </div>
          <div class="bottom__logo">
            <Logo />
          </div>
          <div class="bottom__right">
            <div class="flex">
              <ul class="bottom__nav">
                <li class="bottom__item bottom__user">
                  <a href="" class="bottom__link">
                    <fa icon="user" />
                  </a>
                </li>
                <li class="bottom__item">
                  <NuxtLink to="/wishlist" class="bottom__link">
                    <fa icon="heart" />
                  </NuxtLink>
                </li>
                <li class="bottom__item">
                  <NuxtLink to="/cart" class="bottom__link">
                    <fa icon="shopping-basket" />
                    <span class="total"
                      >({{ cartCount }} article{{
                        cartCount > 1 ? "s" : ""
                      }})</span
                    >
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/ Header Bottom -->
    <div
      class="overlay"
      :class="isOpen ? 'open' : ''"
      @click="toggleSidebar"
    ></div>
  </header>
</template>

<script>
import GET_CATEGORIES from "~/apollo/queries/category/getCategories.gql";

export default {
  data: function () {
    return {
      fixed: false,
      categories: [],
      loading: 0,
    };
  },

  methods: {
    toggleSidebar() {
      const el = document.body;
      if (this.isOpen) {
        el.classList.remove("overflow-hidden");
        this.$store.commit("sidebar/closeFrontSidebar");
      } else {
        el.classList.add("overflow-hidden");
        this.$store.commit("sidebar/openFrontSidebar");
      }
    },

    handleScroll() {
      this.fixed = window.scrollY > 20;
    },
  },

  apollo: {
    $loadingKey: "loading",
    categories: {
      query: GET_CATEGORIES,
      update(data) {
        return data.categories;
      },
    },
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isAuth;
    },

    isOpen() {
      return this.$store.state.sidebar.openFrontSidebar;
    },

    cartCount() {
      return this.$store.state.cart.cartCount;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  flex: 0 0 auto;

  &__bottom {
    background-color: var(--primary-color);

    .bottom {
      &__container {
        min-height: 3.125rem;
      }

      &__toggle {
        display: none;
        @media (max-width: 767.9px) {
          display: block;
          font-size: 20px;
        }
      }

      &__categories {
        flex: auto 0;
        padding-right: 15px;
        padding-left: 15px;

        .shop {
          font-weight: 600;
        }

        .bottom__nav {
          display: none;
        }

        @media (max-width: 767.9px) {
          padding: 0;
          order: 3;
          text-align: center;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .bottom__nav {
            display: initial;
          }
        }
      }

      &__logo {
        display: none;
        @media (max-width: 767.9px) {
          order: 1;
          display: initial;
          svg {
            &.NuxtLogo {
              width: 130px;
            }
          }
        }
      }

      &__search {
        flex: auto;
        padding-right: 15px;
        padding-left: 15px;

        @media (max-width: 767.9px) {
          display: none;
        }
      }

      &__right {
        flex: auto 0;

        @media (max-width: 767.9px) {
          order: 2;
        }
      }

      &__nav {
      }

      &__item {
        display: inline-block;
        padding-right: 15px;
        padding-left: 15px;

        @media (max-width: 767.9px) {
          padding-right: 5px;
          padding-left: 5px;
        }

        &.bottom__user {
          display: none;

          @media (max-width: 767.9px) {
            display: initial;
          }
        }
      }

      &__link {
        svg {
          font-size: 20px;
        }

        span {
          &.badge {
          }
          &.total {
            padding-left: 10px;
            font-weight: 700;

            @media (max-width: 767.9px) {
              display: none;
            }
          }
        }
      }
    }

    @media (max-width: 767.9px) {
      box-shadow: 0 1px 10px rgb(151 164 175 / 10%);
      height: 120px;
      position: relative;
      transition: all 0.3s;

      > .container {
        height: inherit;
        > div {
          height: inherit;
          /* max-height: 80px; */
        }
      }
    }
  }

  &__middle {
    background-color: var(--white);

    .middle {
      &__logo {
        flex: 0;

        svg {
          &.NuxtLogo {
            @media (min-width: 768px) {
              transition: all 0.3s;
            }
          }

          &[data-icon="times"] {
            display: none;
            @media (max-width: 767.9px) {
              display: block;
            }
          }
        }
      }

      &__support {
        flex: auto 0;
      }

      &__nav {
        flex: auto;
        padding-right: 15px;
        padding-left: 15px;
      }

      &__logo {
        @media (max-width: 767.9px) {
          display: flex;
          padding-top: 20px;
          padding-bottom: 20px;
          justify-content: space-between;
          padding-right: 15px;
          padding-left: 15px;
          width: 100%;

          svg {
            &.NuxtLogo {
              margin: 0;
              width: 130px;
            }

            &[data-icon="times"] {
              font-size: 20px;
            }
          }
        }
      }

      &__nav {
        .nav {
          text-align: center;

          &__item {
            display: inline-block;
            padding-top: 0.781rem;
            padding-bottom: 0.781rem;
            padding-right: 0.99rem;
            padding-left: 0.99rem;

            &:hover {
              .nav__link {
                color: #000;
              }
            }

            @media (max-width: 767.9px) {
              display: block;
              text-align: left;
            }
          }

          &__link {
            font-weight: 700;
            color: #333e48;
            transition: all 0.3s;

            @media (max-width: 767.9px) {
              font-size: 18px;
            }
          }
        }

        @media (max-width: 767.9px) {
          padding: 0;
          width: 100%;
        }
      }

      &__support {
        .phone,
        .email {
          font-size: 0.875rem;
        }
        .support__icon {
          height: 40px !important;
          width: 40px !important;
          path {
            fill: var(--primary-color);
          }
        }

        @media (max-width: 767.9px) {
          display: none;
        }
      }
    }

    @media (max-width: 767.9px) {
      position: absolute;
      background: var(--white);
      top: 0;
      bottom: 0;
      left: 0;
      width: 280px;
      transform: translateX(-280px);
      transition: transform 0.3s;
      z-index: 999;

      &.open {
        box-shadow: 13px 0 20px rgb(119 131 143 / 8%);
        transform: translateX(0px);
      }

      > .container {
        height: 100%;
        padding: 0;
        > div {
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          justify-content: flex-start;
          align-items: auto;
          align-content: stretch;
        }
      }
    }
  }

  &__top {
    border-bottom: 1px solid #e8e8e8;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    .topbar {
      &__left {
        a {
          font-size: 0.81288rem;
          color: #7c7c7c;
        }
        @media (max-width: 767.9px) {
          display: none;
        }
      }

      &__right {
        .topmenu {
          list-style: none;

          &__item {
            display: inline-block;

            &:not(:first-child) {
              &:before {
                color: #cad5d5;
                content: "|";
                margin: 0 0.875rem;
                -webkit-font-smoothing: antialiased;
              }
            }

            span {
              color: #7c7c7c;
            }
          }

          &__link {
            font-size: 0.813rem;
            color: #334141;
          }
        }
      }
    }

    @media (max-width: 767.9px) {
      display: none;
    }
  }

  /** fixed */
  &__fixed {
    @media (min-width: 768px) {
    }

    @media (max-width: 767.9px) {
      padding-bottom: 95px;
      .header__bottom {
        position: fixed;
        z-index: 998;
        height: 80px;
      }
    }
  }
}

.overlay {
  display: none;
  background: #00000082;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.3s;
  z-index: 998;

  &.open {
    display: block;
  }
}
</style>