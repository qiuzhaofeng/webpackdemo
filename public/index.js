import "./index.css"
// import "./css/bootstrap.min.css"
console.log(33345)

import $ from "jquery"
console.log($)

$(function() {
  $("#header").addClass('one')
})

let a = 10;
console.log(a);

if(module.hot) {
  module.hot.accept()
}
