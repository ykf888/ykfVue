import {requestUrl,getList} from"@/api/common"
import { reactive } from "@vue/reactivity"
export function getTableData(){
    const tableData =reactive({
        item:[],
        total:0
    })
    const getData =(params)=>{
        let request ={
            url:requestUrl[params.cofige.taburl],
            method:params.cofige.method,
            data:params.data
        }
        getList(request).then(res=>{
            if (res.msg=="success") {
             tableData.item=res.content.data
             tableData.total=res.content.total
            }

        })
        
    }

    return {tableData , getData }
}