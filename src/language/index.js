import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    locale:localStorage.getItem("lang")||"ch",
    messages:{
        ch:require("@/language/ch.js"),
        en:require("@/language/en.js")
    }
})
export default i18n