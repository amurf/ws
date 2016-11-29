angular
    .module('ws.ui.page')
    .controller('PageController', PageController);

function PageController() {
    let vm  = this;
    vm.form = vm.pageName + "Form";
}
