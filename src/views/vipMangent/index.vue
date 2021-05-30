<template>
    <TEditor ref="editor" v-model="value" />
</template>
<script>
import { ref } from '@vue/reactivity'
export default {
    name:"vipMangent",
    setup(props){
        const value =ref("")
        return{
            value
        }
    }
}
</script>
<style scoped lang="scss">

</style>