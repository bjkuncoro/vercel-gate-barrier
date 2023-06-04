"use client"
import Axios from "axios";

let urls = {
    test: `http://localhost:3334`,
    development: process.env.NEXT_PUBLIC_SERVICE_API,
    production: 'https://your-production-url.com/'
}
let token;
if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
}

const ReqApi = Axios.create({
    baseURL: urls['development'],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

export default ReqApi;