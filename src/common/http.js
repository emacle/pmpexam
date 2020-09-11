/**
 * Created by Administrator on 2018/8/1.
 */

import axios from 'axios';
// import stores from "../store"

axios.defaults.timeout = 5000
axios.defaults.headers = {
    //   'X-API-KEY': 'oocwo8cs88g4c8w8c08ow00ss844cc4osko0s0ks'
}

if (process.env.NODE_ENV == "development") {
    axios.defaults.baseURL = "http://172.93.43.131/pmpjson/"
} else if (process.env.NODE_ENV == "production") {
    axios.defaults.baseURL = 'http://172.93.43.131/pmpjson/';
}

// let ContentType = "application/json"
//var instance = axios.create({
//  headers:{
//    //'Content-type': ContentType
//  },
//});

//http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
        //stores.dispatch('hideLoading')
    },
    error => {
        return Promise.reject(error)
    }
)

//export {axios}

/**
 * 封装get post方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export const $http = {
    _paramFormat: function (c) {
        return {
            contentType: c && c.ContentType ? c.ContentType : "application/json",
            loading: c && c.loading ? c.loading : "",
            showLoading: c ? (c.showLoading ? c.showLoading : false) : true,
        }
    },
    get: function (url, params = {}, config) {
        const orm = this._paramFormat(config)

        return new Promise((resolve, reject) => {
            axios.get(url, { params: params }, { headers: { "Content-Type": orm.contentType } })
                .then(response => {
                    resolve(response.data, response);
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    post: function (url, data = {}, config) {
        const orm = this._paramFormat(config)

        return new Promise((resolve, reject) => {
            axios.post(url, data, { headers: { "Content-Type": orm.contentType } })
                //axios.post(url, data)
                .then(response => {
                    setTimeout(function () {
                        resolve(response);
                    }, 300)
                }, error => {
                    reject(error)
                })
        })
    },

}




export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
