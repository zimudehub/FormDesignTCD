import FormBuildTCD from "./build"
FormBuildTCD.install = function (Vue) {
    if (install.installed)return;
    install.installed = true;
    Vue.component(FormBuildTCD.name, FormBuildTCD)

};
export default FormBuildTCD
