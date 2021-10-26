import axios from "axios";
import { notification } from "antd";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
});

function getRequest(url = "/", params) {
  new Promise((resolve, reject) => {
    instance
      .get(url, {
        params,
      })
      .then((res) => [resolve(res)])
      .catch((err) => {
        notification.open({
          message: "请求出错，请重试~",
        });
      });
  });
}

function postRequest(url = "/", params) {
  new Promise((resolve, reject) => {
    instance
      .post(url, {
        data: params,
      })
      .then((res) => [resolve(res)])
      .catch((err) => {
        notification.open({
          message: "请求出错，请重试~",
        });
      });
  });
}

function delRequest(url = "/", params) {
  new Promise((resolve, reject) => {
    instance
      .delete(url, {
        data: params,
      })
      .then((res) => [resolve(res)])
      .catch((err) => {
        notification.open({
          message: "请求出错，请重试~",
        });
      });
  });
}

function putRequest(url = "/", params) {
  new Promise((resolve, reject) => {
    instance
      .put(url, params)
      .then((res) => [resolve(res)])
      .catch((err) => {
        notification.open({
          message: "请求出错，请重试~",
        });
      });
  });
}

export { getRequest, postRequest, delRequest, putRequest };
