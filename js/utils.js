function checkLogin() {
    Parse.initialize("V6NcQkeFHBu6SOcSYJptWFgKzgOiuc2ywEXnmL31", "Xw3yYjXIFL6tVLwN3vhmPJMYLmd4AiJI3mRUjl1l");
    if(window.location.pathname.split("/").pop() != 'login.html') {
        if (Parse.User.current() == null) {
            window.location.href = "./login.html";
        }
    } else {
         if (Parse.User.current() != null) {
            window.location.href = "./list.html";
        }
    }
}
