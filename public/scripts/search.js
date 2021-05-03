window.onload = function(){
    document.getElementById("home_btn").addEventListener("click", home_click);
    document.getElementById("top_btn").addEventListener("click", top_click);
    document.getElementById("new_btn").addEventListener("click", new_click);
    /* entertainment, apps, movies, books onclick begins */
    document.getElementById("entertain_a").addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = "/";
        document.getElementById("entertain_item").style.backgroundColor = "#444";
        document.getElementById("entertain_name").style.color = "white";//those 2 lines changes clicked button style
        document.getElementById("entertain_name").addEventListener("mouseout", function(){
            document.getElementById("entertain_item").style.backgroundColor = "#444";
            document.getElementById("entertain_name").style.color = "white";
        });
        apps_notclicked();
        movies_notclicked();
        books_notclicked();
        hover_apps_afterclick();
        hover_movies_afterclick();
        hover_books_afterclick();
    });
    document.getElementById("apps_a").addEventListener("click", function(e){
        e.preventDefault();
        //location.replace("/apps");
        //var apps_link = document.getElementById("apps_a");
        //window.open(apps_link.href,"_blank");
        //apps_link.setAttribute('href', "/apps", "_top");
        window.location.href = "/apps";
        document.getElementById("apps_item").style.backgroundColor = "#689f38";
        document.getElementById("apps_name").style.color = "white";//those 2 lines changes clicked button style
        document.getElementById("apps_name").addEventListener("mouseout", function(){
            document.getElementById("apps_item").style.backgroundColor = "#689f38";
            document.getElementById("apps_name").style.color = "white";
        });
        entertain_notclicked();
        movies_notclicked();
        books_notclicked();
        hover_entertain_afterclick();
        hover_movies_afterclick();
        hover_books_afterclick();
    });
    document.getElementById("movies_a").addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = "/movies";
        document.getElementById("movies_item").style.backgroundColor = "#ed3b3b";
        document.getElementById("movies_name").style.color = "white";
        document.getElementById("movies_name").addEventListener("mouseout", function(){
            document.getElementById("movies_item").style.backgroundColor = "#ed3b3b";
            document.getElementById("movies_name").style.color = "white";
        });
        entertain_notclicked();
        apps_notclicked();
        books_notclicked();
        hover_entertain_afterclick();
        hover_apps_afterclick();
        hover_books_afterclick();
    });
    document.getElementById("books_a").addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = "/books";
        document.getElementById("books_item").style.backgroundColor = "#039be5";
        document.getElementById("books_name").style.color = "white";
        document.getElementById("books_name").addEventListener("mouseout", function(){
            document.getElementById("books_item").style.backgroundColor = "#039be5";
            document.getElementById("books_name").style.color = "white";
        });
        entertain_notclicked();
        movies_notclicked();
        apps_notclicked();
        hover_entertain_afterclick();
        hover_movies_afterclick();
        hover_apps_afterclick();
    });
    document.getElementById("profile_pic").addEventListener("click", function(){document.getElementById("prof_sign").style.display = "block";})
    /* entertainment, apps, movies, books onclick ends */
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

/* not clicked begins */
function apps_notclicked(){
    document.getElementById("apps_item").style.backgroundColor = "rgba(243, 243, 243, 0.945)";//from here on changes other categs styles
    document.getElementById("apps_name").style.color = "#737373";
}
function movies_notclicked(){
    document.getElementById("movies_item").style.backgroundColor = "rgba(243, 243, 243, 0.945)";
    document.getElementById("movies_name").style.color = "#737373";
}
function books_notclicked(){
    document.getElementById("books_item").style.backgroundColor = "rgba(243, 243, 243, 0.945)";
    document.getElementById("books_name").style.color = "#737373";
}
function entertain_notclicked(){
    document.getElementById("entertain_item").style.backgroundColor = "rgba(243, 243, 243, 0.945)";//from here on changes other categs styles
    document.getElementById("entertain_name").style.color = "#737373";
}
/* not clicked ends */

/* hover while a categ is clicked */
function hover_entertain_afterclick(){
    document.getElementById("entertain_name").addEventListener("mouseover", function(){
        document.getElementById("entertain_item").style.backgroundColor = "#444";
        document.getElementById("entertain_name").style.color = "white";
    });
    document.getElementById("entertain_name").addEventListener("mouseout", function(){
        document.getElementById("entertain_item").style.backgroundColor = "rgba(243, 243, 243, 0.945)";
        document.getElementById("entertain_name").style.color = "#737373";
    });
}

function hover_apps_afterclick(){
    document.getElementById("apps_name").addEventListener("mouseover", function(){
        document.getElementById("apps_item").style.backgroundColor = "#689f38";
        document.getElementById("apps_name").style.color = "white";
    });
    document.getElementById("apps_name").addEventListener("mouseout", function(){
        document.getElementById("apps_item").style.backgroundColor = "rgba(243, 243, 243, 0.945)";
        document.getElementById("apps_name").style.color = "#737373";
    });
}

function hover_movies_afterclick(){
    document.getElementById("movies_name").addEventListener("mouseover", function(){
        document.getElementById("movies_item").style.backgroundColor = "#ed3b3b";
        document.getElementById("movies_name").style.color = "white";
    });
    document.getElementById("movies_name").addEventListener("mouseout", function(){
        document.getElementById("movies_item").style.backgroundColor = "rgba(243, 243, 243, 0.945)";
        document.getElementById("movies_name").style.color = "#737373";
    });
}
function hover_books_afterclick(){
    document.getElementById("books_name").addEventListener("mouseover", function(){
        document.getElementById("books_item").style.backgroundColor = "#039be5";
        document.getElementById("books_name").style.color = "white";
    });
    document.getElementById("books_name").addEventListener("mouseout", function(){
        document.getElementById("books_item").style.backgroundColor = "rgba(243, 243, 243, 0.945)";
        document.getElementById("books_name").style.color = "#737373";
    });
}