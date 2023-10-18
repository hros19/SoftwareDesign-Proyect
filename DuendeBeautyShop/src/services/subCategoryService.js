import axios from "axios";

class SubCategory {
    
    create(formData){
        const url = "http://localhost:8000/api/subCategory/create-sub-category";
        const config = {
            headers: {
                'content-type':'multipart/form-data',

            }
        };
        return axios.post(url, formData, config);
    }

    getSubCategories() {
        const url = "http://localhost:8000/api/subCategory/get-sub-categories";
        return axios.get(url);
    }

    deleteSubCategory(id) {
        const url = "http://localhost:8000/api/subCategory/delete-sub-category/"+id;
        return axios.get(url);
    }

    update(formData){
        const url = "http://localhost:8000/api/subCategory/update-sub-category";
        const config = {
            headers: {
                'content-type':'multipart/form-data',

            }
        };
        return axios.post(url, formData, config);
    }
}

export default new SubCategory();