import axios from "axios";

class MakeUp {
    
    create(formData){
        const url = "http://localhost:8000/api/makeUp/create-make-up";
        const config = {
            headers: {
                'content-type':'multipart/form-data',

            }
        };
        return axios.post(url, formData, config);
    }

    getMakeUps() {
        const url = "http://localhost:8000/api/makeUp/get-make-ups";
        return axios.get(url);
    }

    deleteCategory(id) {
        const url = "http://localhost:8000/api/makeUp/delete-make-up/"+id;
        return axios.get(url);
    }

    update(formData){
        const url = "http://localhost:8000/api/makeUp/update-make-up";
        const config = {
            headers: {
                'content-type':'multipart/form-data',

            }
        };
        return axios.post(url, formData, config);
    }
}

export default new MakeUp();