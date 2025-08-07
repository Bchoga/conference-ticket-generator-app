document.addEventListener('DOMContentLoaded', () => {

    //get things from session storage
    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    const userName = sessionStorage.getItem('userName');
    const avatarImageSrc = sessionStorage.getItem('userAvatar');

    // get elements of intrest
    const heroName = document.querySelector(".user-name");
    const heroEmail = document.querySelector(".user-email");
    const ticketName = document.querySelector(".name");
    const ticketUserName = document.querySelector(".git_username");
    const userAvatar = document.getElementById("userImage");


    heroName.innerText = name;
    heroEmail.innerText = email;
    ticketName.innerText = name;
    ticketUserName.innerText = userName;

    if (avatarImageSrc) {
        userAvatar.src = avatarImageSrc;
    }

});