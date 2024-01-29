import axios from "axios";

const Api = {
    apiUrl: "",

    apiGet: async (address, callbackSuccess, callbackFail, useToken = true) => {
        let header = {};
        // if (useToken) {
        //     header["Authorization"] = constants.getToken();
        // }

        axios.get(Api.apiUrl + address, {
            headers: header
        }).then((res) => {
            console.log(res);
            callbackSuccess(res);
        }).catch((err) => {
            console.error(err);
            callbackFail(err);
        });
    },

    apiPost: async (address, data, callbackSuccess, callbackFail, useToken = true, contentType = 'multipart/form-data') => {
        let header = {'content-type': contentType};
        // if (useToken) {
        //     header["Authorization"] = constants.getToken();
        // }

        axios.post(Api.apiUrl + address, data, {
            headers: header
        }).then((res) => {
            console.log(res)
            callbackSuccess(res)
        }).catch((err) => {
            console.error(err)
            callbackFail(err);
        });
    },
}

export default Api;