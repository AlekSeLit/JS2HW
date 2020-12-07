<template>
  <div :class="[$style.featuredproducts_list]">
    <img :src="currentItem.img" :alt="currentItem.name" />
    <h3 :class="[$style.featuredproducts_list_title]">
      {{ currentItem.name }}
    </h3>
    <p :class="[$style.featuredproducts_list_price]">
      {{ currentItem.price }}
    </p>
    <Button @mySuperEvent="onBuyClick">Buy now</Button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    id: String,
  },
  computed: {
    ...mapGetters("goods", ["getData"]),
    currentItem() {
      return this.getData[this.id] || {};
    },
  },
  methods: {
    ...mapActions("goods", ["addInCart"]),
    onBuyClick() {
      this.addInCart(this.id);
    },
  },
};
</script>

<style module lang="scss">
.featuredproducts_list {
  display: flex;
  flex-basis: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #f3f3f3;
  border-bottom-width: 5px;
  border-bottom-color: #3cc395;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  padding: 25px 0 35px;
  margin-bottom: 45px;
  background-color: #fff;
}
.featuredproducts_list_title {
  margin-top: 13px;
  margin-bottom: 12px;
}
.featuredproducts_list_price {
  margin-bottom: 10px;
}
.featuredproducts_list_price,
.featuredproducts_list_title {
  color: #afafaf;
  font-family: "BebasNeue";
  font-size: 27px;
  line-height: 25px;
}
</style>
