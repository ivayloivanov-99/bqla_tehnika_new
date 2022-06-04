<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by category id"
               v-model="id_category"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
                  @click="this.searchCategory()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Products List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index === currentIndex }"
            v-for="(product, index) in products"
            :key="index"
            @click="setActiveProduct(product, index)"
        >
          {{ product.name }}
        </li>
      </ul>

    </div>
    <div class="col-md-4">
      <div v-if="currentProduct">
        <h4>Product</h4>
        <div>
          <label><strong>ID Category:</strong></label> {{ currentProduct.id_category}}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentProduct.name }}
        </div>
        <div>
          <label><strong>Price:</strong></label> {{ currentProduct.price }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentProduct.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/product/'+currentProduct.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Product...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "products",
  data() {
    return {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      id_category: null
    };
  },
  methods: {
    retrieveProducts() {
      ProductDataService.getAll()
          .then(response => {
            this.products = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },

    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = product ? index : -1;
    },


    searchCategory() {
      ProductDataService.findByCategory(this.id_category)
          .then(response => {
            this.products = response.data;
            this.setActiveProduct(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveProducts();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
