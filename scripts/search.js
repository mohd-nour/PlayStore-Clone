window.onload = function(){
    document.getElementById("home_btn").addEventListener("click", home_click);
    document.getElementById("top_btn").addEventListener("click", top_click);
    document.getElementById("new_btn").addEventListener("click", new_click);
    /* entertainment, apps, movies, books onclick begins */
    //document.getElementById("apps_a").addEventListener("click", apps_categ);
};
/* home, top charts, new releases UI onclick begins*/
function home_click(){
    remove_new_click();
    remove_top_click();
    document.getElementById("home_span").style.color = "black";
    document.getElementById("home_span").style.fontWeight = "530";
    document.getElementById("categ_home_write").style.borderBottom = "3px solid #689f38";
};
function remove_home_click(){
    document.getElementById("home_span").style.color = "#737373";
    document.getElementById("home_span").style.fontWeight = "lighter";
    document.getElementById("categ_home_write").style.borderBottom = "none";
}
function top_click(){
    remove_home_click();
    remove_new_click();
    document.getElementById("top_span").style.color = "black";
    document.getElementById("top_span").style.fontWeight = "530";
    document.getElementById("categ_top_write").style.borderBottom = "3px solid #689f38";
};
function remove_top_click(){
    document.getElementById("top_span").style.color = "#737373";
    document.getElementById("top_span").style.fontWeight = "lighter";
    document.getElementById("categ_top_write").style.borderBottom = "none";
};
function new_click(){
    remove_home_click();
    remove_top_click();
    document.getElementById("new_span").style.color = "black";
    document.getElementById("new_span").style.fontWeight = "530";
    document.getElementById("categ_new_write").style.borderBottom = "3px solid #689f38";
};
function remove_new_click(){
    document.getElementById("new_span").style.color = "#737373";
    document.getElementById("new_span").style.fontWeight = "lighter";
    document.getElementById("categ_new_write").style.borderBottom = "none";
};
/* home, top charts, new releases UI onclick ends*/

/* entertainment, apps, movies, books onclick begins */

//function apps_categ(){
 //   document.getElementById("apps_item").style.backgroundColor = "#689f38";
 //   document.getElementById("apps_name").style.color = "white";
 //   document.getElementById("entertain_item").style.backgroundColor = "white";//#444
 //   document.getElementById("entertain_name").style.color = "black";
//}

/* entertainment, apps, movies, books onclick ends */