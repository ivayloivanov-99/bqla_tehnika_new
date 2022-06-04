<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Add Product</h4>
          <div class="submit-form">
            <div v-if="!submitted">

              <div class="form-group">
                <label for="category">Category</label>
                <input
                    type="text"
                    class="form-control"
                    id="id_category"
                    required
                    v-model="product.id_category"
                    name="category"
                />
              </div>

              <div class="form-group">
                <label for="description">Name</label>
                <input
                    class="form-control"
                    id="name"
                    required
                    v-model="product.name"
                    name="description"
                />
              </div>

              <div class="form-group">
                <label for="price">Price</label>
                <input
                    type="text"
                    class="form-control"
                    id="price"
                    required
                    v-model="product.price"
                    name="price"
                />
              </div>

              <button @click="saveProduct()" class="btn btn-primary">Submit</button>
            </div>

            <div v-else>
              <h4>You submitted successfully!</h4>
              <button class="btn btn-success" @click="newProduct">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductDataService from "../services/ProductDataService";

export default {
  name: "addproduct",
  data() {
    return {
      product: {
        id_category: null,
        name: "",
        price: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveProduct() {
      let data = {
        id_category: this.product.id_category,
        name: this.product.name,
        price: this.product.price
      };

      ProductDataService.create(data)
          .then(response => {
            this.product.id= response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    newProduct() {
      this.submitted = false;
      this.product = {};
    }
  }
};
</script>
