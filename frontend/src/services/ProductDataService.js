import http from "../http-common";

class ProductDataService {
    getAll() {
        return http.get("/products");
    }

    getProduct(id) {
       return http.get(`/product/${ id }`);
    }

    create(data) {
        return http.post("/product", data);
    }

    update(id, data) {
        return http.put(`/product/${ id }`, data);
    }

    delete(id) {
        return http.delete(`/product/${ id }`);
    }

    findByCategory(id_cat) {
        return http.get(`/product/category/${id_cat}`);
    }
}

export default new ProductDataService();
