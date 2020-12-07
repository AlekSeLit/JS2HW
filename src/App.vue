<template>
  <div :class="[$style.background]">
    <div :class="[$style.container]">
      <header :class="[$style.header]">
        <a :href="`#`" :class="[$style.header_logo]">
          AlekSeLit
        </a>
        <Cart />
      </header>
      <div :class="[$style.main]">
        <h1>Featured products:</h1>
        <div :class="[$style.main__list]">
          <Item v-for="id in getItemsOnPage" :key="id" :id="id" />
        </div>
        <Button @mySuperEvent="fetchMore">Подгрузить еще товары</Button>
      </div>
      <div :class="[$style.main]">
        <Form />
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "./components/Cart.vue";
import Item from "./components/Item.vue";
import Button from "./components/Button.vue";
import Form from "./components/Form.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Cart,
    Item,
    Button,
    Form,
  },
  data() {
    return {
      items: [],
      page: 1,
    };
  },
  methods: {
    ...mapActions("goods", ["requestData"]),
    fetchMore() {
      this.requestData(this.page).then(() => {
        this.page++;
      });
    },
  },
  computed: {
    ...mapGetters("goods", ["getItemsOnPage"]),
  },
  mounted() {
    this.fetchMore();
  },
};
</script>

<style module lang="scss">
:global(*) {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #ffffff;
  font-weight: 400;
}
.background {
  background-color: #3cc3b5;
}
.container {
  max-width: 980px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 150px;
  &_logo {
    font-size: 49px;
    font-family: "Lobster 1.4";
    line-height: 19px;
    color: white;
    text-decoration: none;
    margin-top: 7px;
  }
  &_btn {
    border: 0;
    color: #fff;
  }
}

.main {
  max-width: 80%;
  margin: auto;
  &__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
