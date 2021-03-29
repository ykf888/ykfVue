import service from "@/router/request.js";

const requestUrl ={
    getTableDate:"ceshiceshi"
}

// 获取验证码
export  function getList(prome){
    let data ={
        tableData: [
            {
              date: "2016-05-02",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
              switch: false
            },
            {
              date: "2016-05-04",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1517 弄",
              switch: true
            },
            {
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              switch: false
            },
            {
              date: "2016-05-03",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1516 弄",
              switch: false
            }
          ],
    }
    return Promise.resolve(data)
    // return service.request({
    //     method:prome.method || "post",
    //     url:process.env.VUE_APP_API_URL+prome.url,
    //     data:prome.data||{}
    // })
}
export{requestUrl}