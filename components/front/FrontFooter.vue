<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container">
        <div class="grid">
          <div
            class="col-start-1 lg:col-start-1 top__left mb-5 lg:mb-0 self-center"
          >
            <div class="text-center grid left__container">
              <div
                class="text-center col-start-1 lg:col-start-1 title block lg:flex"
              >
                <fa :icon="['fab', 'telegram-plane']" />
                <h2 class="self-center">S'inscrire à la Newsletter</h2>
              </div>
              <div class="col-start-1 lg:col-start-2 content">
                <h5 class="pr-0 lg:pr-5">
                  <!-- ...and receive <strong>$20 coupon for first shopping.</strong> -->
                </h5>
              </div>
            </div>
          </div>
          <div
            class="col-start-1 lg:col-start-2 top__right self-center w-10/12 ml-auto"
          >
            <NewsletterForm />
            <!-- <FormSearchSubscribe /> -->
          </div>
        </div>
      </div>
    </div>
    <div class="footer__middle">
      <div class="container"></div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <div class="grid">
          <div class="col-start-1 lg:col-start-1 bottom__left">
            <p class="lg:text-left text-center">
              &copy;&nbsp;<a href="#"><strong>Electro</strong></a
              >&nbsp;-&nbsp;Tous droits r&eacute;serv&eacute;s
            </p>
          </div>
          <div
            class="bottom__right col-start-1 lg:col-start-2 lg:ml-auto lg:mr-px lg:mt-0 m-auto mt-2"
          >
            <ul class="paiement__list">
              <li class="paiement__item">
                <a href=""><span class="paiement__image visa"></span></a>
              </li>
              <li class="paiement__item">
                <a href=""><span class="paiement__image discover"></span></a>
              </li>
              <li class="paiement__item">
                <a href=""><span class="paiement__image master-card"></span></a>
              </li>
              <li class="paiement__item">
                <a href=""><span class="paiement__image paypal"></span></a>
              </li>
              <li class="paiement__item">
                <a href=""><span class="paiement__image skrill"></span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  &__top {
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: var(--primary-color);

    .top {
      &__left {
        .left__container {
          align-items: center;

          .title {
            svg {
              font-size: 36px;
            }

            h2 {
              font-size: 1.25038rem;
              padding-left: 16px;
            }
          }
        }
      }

      &__right {
      }
    }
  }

  &__bottom {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    background-color: var(--gris-5);

    .bottom {
      &__right {
        display: flex;
        text-align: right;
        align-self: center;
        margin-left: auto;

        .paiement {
          &__list {
            display: flex;
            align-self: center;
          }

          &__item {
            display: inline-block;
            padding-left: 5px;
            padding-right: 5px;
          }

          &__image {
            display: block;
            width: 35px;
            height: 22px;
            background-repeat: no-repeat;
            background-size: contain;

            &.visa {
              background-image: url("~@/assets/img/visa.jpg");
            }
            &.discover {
              background-image: url("~@/assets/img/discover.jpg");
            }
            &.master-card {
              background-image: url("~@/assets/img/master-card.jpg");
            }
            &.paypal {
              background-image: url("~@/assets/img/paypal.jpg");
            }
            &.skrill {
              background-image: url("~@/assets/img/skrill.jpg");
            }
          }
        }
      }
    }
  }
}
</style>