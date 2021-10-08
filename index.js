// Import stylesheets
import './style.css';
import axios from 'axios';

// Write Javascript code!
const appDiv = document.getElementById('app');
const click_button = document.getElementById('click_button');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const ajax = {
  post(option) {
    return new Promise((resolve, reject) => {
      let xmlhttp = null;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      }
      if (!xmlhttp) {
        return reject(Error('XMLHttpRequest is not supported on this broswer'));
      }
      xmlhttp.open('POST', option.url, true);
      if (!option.header)
        option.header = { 'content-Type': 'application/x-www-form-urlencoded' };
      for (const key in option.header) {
        if (option.header[key]) {
          xmlhttp.setRequestHeader(key, option.header[key]);
        }
      }
      xmlhttp.timeout = option.timeout || 6000;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          if (+xmlhttp.status === 200) {
            let res = xmlhttp.responseText;
            try {
              res = JSON.parse(res);
            } catch (e) {}
            if (res) {
              resolve(res);
            } else {
              reject('123');
            }
          } else {
            reject(new Error(xmlhttp?.status.toString()));
          }
          xmlhttp = null;
        }
      };
      xmlhttp.onerror = (err) => {
        reject(err);
      };
      xmlhttp.send(option.data);
    });
  },
};

const opt = {
  url: 'https://d.baike.qq.com/report/action',
  data: JSON.stringify({
    product: 'eyao_hxxa', //业务产品
    platform: 'h5', // 前端平台
    value: { asd: '1234567890000' }, // 自定义参数（业务参数）
    time: new Date().valueOf(),
    act_type: 'tip_click', // 事件名称
    page_id: 'pages_mp_home_index',
  }),
  dataType: 'json',
  method: 'post',
  header: {
    'content-Type': 'application/x-www-form-urlencoded',
  },
};

click_button.onclick = () => {
  console.log('你点击了数据上报');
  ajax
    .post(opt)
    .then((res) => {
      console.lgo(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
