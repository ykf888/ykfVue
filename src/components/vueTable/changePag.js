import { reactive } from "@vue/reactivity";

export function changePage(){
    const pagCofige =reactive({
        sizes:[2,4, 6, 8],
        size:2,
        pageNumber:0
    })
    const handleSizeChange=(val)=>{
        pagCofige.size=val
    }
    const handleCurrentChange=(val)=>{
        pagCofige.pageNumber=val
      }

    return {pagCofige,handleSizeChange,handleCurrentChange}
}