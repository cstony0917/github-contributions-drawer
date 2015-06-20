"use strict";function getPixel(e,t,a){var n=4*(a*e.width+t);return{r:e.data[n],g:e.data[n+1],b:e.data[n+2],a:e.data[n+3]}}function download(e,t){var a=document.createElement("a");a.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),a.setAttribute("download",e),a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a)}var one_day=864e5,git_size={width:0,height:7},datesToDraw=[],downloadshell=function(){for(var e=document.getElementById("shell-template").innerText,t="dates=(",a=datesToDraw.length-1;a>=0;a--){var n=new Date(datesToDraw[a]),d=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate();t+=d+" "}t+=")",e=e.replace("dates=()",t),download("github-contridrawer.sh",e)},handleDragOver=function(e){e.stopPropagation(),e.preventDefault()},render_preview=function(){var e=document.getElementById("import-image"),t=e.naturalHeight/7;git_size.width=e.naturalWidth/t;var a=document.getElementById("myCanvas");a.width=git_size.width,a.height=git_size.height;var n=a.getContext("2d");n.drawImage(e,0,0,git_size.width,git_size.height);var d=n.getImageData(0,0,a.width,a.height);!function(){var e=document.getElementById("contribution");e.innerHTML="";for(var t=new Date("2014-08-03"),a=0,n=0;n<d.width;n++){var r=document.createElement("div");r.className="week week-"+n;for(var i=0;i<d.height;i++){var o=document.createElement("span"),l=new Date(t.getTime()+one_day*a),g=getPixel(d,n,i);0===g.r&&0===g.g&&0===g.b&&0===g.a?g=null:(o.className="dot",datesToDraw.push(moment(l))),r.appendChild(o),a++}e.appendChild(r)}}()},fileChangeHandler=function(e){e.stopPropagation(),e.preventDefault();var t;t="undefined"==typeof e.target.files?e.dataTransfer.files:e.target.files;for(var a,n=0;a=t[n];n++)if(a.type.match("image.*")){var d=new FileReader;d.onload=function(){return function(e){var t=e.target.result,a=document.getElementById("import-image");a.src=t,render_preview()}}(a),d.readAsDataURL(a)}};window.onload=function(){var e=document.getElementById("import-file");e.addEventListener("change",fileChangeHandler);var t=document.getElementById("import-form");t.addEventListener("dragover",handleDragOver,!1),t.addEventListener("drop",fileChangeHandler,!1),t.addEventListener("click",function(){e.click()}),render_preview();var a=document.getElementById("download-button");a.addEventListener("click",downloadshell)};