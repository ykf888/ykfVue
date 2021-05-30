
import { ElMessageBox } from 'element-plus';
export function global(){
    const delFunction=(params)=>{
        ElMessageBox.confirm(params.meeage, params.title, {
          confirmButtonText: params.confirmButtonText || "确定",
          cancelButtonText:params.cancelButtonText ||  "取消",
          type: params.type || "warning"
        }).then(() => {
            params.function && params.function(params.data || "")
            params.proxy.$message({
                type: 'success',
                message: '删除成功!'
              });
        }).catch(() => {
            params.proxy.$message({
                type: 'info',
                message: '已取消删除!'
              });
        });
    }
    return {
        delFunction
    }
} 