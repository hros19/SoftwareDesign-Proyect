import axios from "axios";

class Category {
    
    create(formData){
        const url = "http://localhost:8000/api/category/create-category";
        const config = {
            headers: {
                'content-type':'multipart/form-data',

            }
        };
        return axios.post(url, formData, config);
    }

    getCategories() {
        const url = "http://localhost:8000/api/category/get-categories";
        return axios.get(url);
    }

    deleteCategory(id) {
        const url = "http://localhost:8000/api/category/delete-category/"+id;
        return axios.get(url);
    }

    update(formData){
        const url = "http://localhost:8000/api/category/update-category";
        const config = {
            headers: {
                'content-type':'multipart/form-data',

            }
        };
        return axios.post(url, formData, config);
    }
}

export default new Category();