<template>
  <div class="row">
    <div v-if="currentProduct" class="col">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Product</h4>
          <form>
            <div class="form-group">
              <label for="category">Category</label>
              <input type="text" class="form-control" id="category"
                    v-model="currentProduct.id_category"
              />
            </div>
            <div class="form-group">
              <label for="description">Name</label>
              <input type="text" class="form-control" id="name"
                    v-model="currentProduct.name"
              />
            </div>
            <div class="form-group">
              <label for="description">Price</label>
              <input type="text" class="form-control" id="price"
                    v-model="currentProduct.price"
              />
            </div>
            <div class="form-group">
              <label><strong>Status:</strong></label>
              {{ currentProduct.published_at ? "Published" : "Pending" }}
            </div>
          </form>

          <button class="btn badge badge-primary mr-2"
                  v-if="currentProduct.published_at"
                  @click="this.updatePublished(false)"
          >
            UnPublish
          </button>
          <button v-else class="btn badge badge-primary mr-2"
                  @click="this.updatePublished(true)"
          >
            Publish
          </button>

          <button class="btn badge badge-danger mr-2" @click="this.deleteProduct()">Delete</button>

          <button type="submit" class="badge badge-success"
                  @click="this.updateProduct()"
          >
            Update
          </button>
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
    <div v-else class="col">
      <div class="card">
        <div class="card-body"><p>Please click on a Product...</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      message: ''
    };
  },
  methods: {
    getProduct(id) {
      ProductDataService.getProduct(id)
          .then(response => {
            this.currentProduct = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updatePublished(status) {
      let data = {
        id: this.currentProduct.id,
        id_category: this.currentProduct.id_category,
        name: this.currentProduct.name,
        price: this.currentProduct.price,
        published: status
      };

      ProductDataService.update(this.currentProduct.id, data)
          .then(response => {
            console.log(response.data);
            this.currentProduct.published = status;
            this.message = 'The status was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateProduct() {
      ProductDataService.update(this.currentProduct.id, this.currentProduct)
          .then(response => {
            console.log(response.data);
            this.message = 'The product was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteProduct() {
      ProductDataService.delete(this.currentProduct.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "products" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getProduct(this.$route.params.id);
  }
};
</script>