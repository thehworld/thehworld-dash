import axios from "axios"

const API = "https://thehworld-v1.onrender.com/api/web";
const API_TEST = "https://thehworld-v1.onrender.com";
const API_STAGING = "https://thehworld.loca.lt/api/web";
const API_DEV = "http://localhost:8080/api/web"

const API_USE = API;

export const apiCheck = () => {
    axios.get(`${API_TEST}/`)
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((err) => {
            return err
        })
}


// ************************ Admin Panel Manage Section *************************


// * 1.  Manage Order
// ?          1.1 Get All Orders - DONE
// ?          1.2 Get A Orders - 
// * 2.  Manage Shipment
// * 3.  Manage Products / Categories
// * 4.  Manage Users
// * 5.  Manage Issues
// * 6.  Dashboard Status


export const getAllUsersOrders = () => {
    return axios.get(`${API_USE}/get/all/orders`).then((res) => {
        return res
    }).catch((error) => {
        console.log("Error - ", error)
    });
}


export const getAOrderDetails = (orderID) => {
    return axios.get(`${API_USE}/get/a/order/${orderID}`).then((res) => {
        return res;
    }).catch((err) => {
        console.log("Error - ", err);
    });
}


export const getAUsersOrders = (userID) => {
    return axios.get(`${API_USE}/get/a/user/${userID}/orders`).then((res) => {
        return res
    }).catch((err) => {
        console.log("Error - ", err);
    });
}

export const changrOrderStatus = (status) => {
    return axios.post(`${API_USE}/change/order/status`, {
        status: status
    }).then((res) => {
        return res
    }).catch((error) => {
        console.log("Error - ", error);
    });
}


// ?? Users

export const getAllUsers = () => {
    return axios.get(`${API_USE}/users/get/all`).then((res) => {
        return res
    }).catch((err) => {
        console.log("Error - ", err);
    });
}





export const getAllCategory = () => {
    return axios.get(`${API_USE}/get/all/categories`)
        .then((res) => {
            console.log(res)
            return res.data.category
        })
        .catch((err) => {
            return err
        })
}

export const createCategory = (cate) => {
    return axios.post(`${API_USE}/create/category`, cate)
        .then((res) => {
            return res.data.category
        })
        .catch((err) => {
            return err
        })
}

export const updateCategory = (cate) => {
    return axios.put(`${API_USE}/edit/category`, cate)
        .then((res) => {
            return res.data.category
        })
        .catch((err) => {
            return err
        })
}

export const createProduct = (prod) => {
    return axios.post(`${API_USE}/create/product`, prod)
        .then((res) => {
            console.log("product", res.data)
            return res.data.product
        })
        .catch((err) => {
            return err
        })
}


export const getAllProducts = (prod) => {
    return axios.get(`${API_USE}/get/all/products`, prod)
        .then((res) => {
            return res.data.product
        })
        .catch((err) => {
            return err
        })
}

//blogs api

export const getAllBlogs = (blog) => {
    return axios.get(`${API_USE}/get/all/blogs`, blog)
        .then((res) => {
            return res.data.blogs
        })
        .catch((err) => {
            return err
        })
}

export const createBlog = (blog) => {
    return axios.post(`${API_USE}/create/blogs`, blog)
        .then((res) => {
            return res.data.blogs
        })
        .catch((err) => {
            return err
        })
}