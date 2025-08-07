document.addEventListener('DOMContentLoaded', () => {

    //get elements of intrest and put them in object to be passed around
    let docElements = {
        avatarInput: document.getElementById('avatar-drop-zone'),
        userAvatarContainer: document.querySelector('.avatar-actions-wrapper'),
        userAvatar: document.getElementById('user-avatar'),
        blankUpload: document.querySelector('.upload-avatar'),
        removeImageButton: document.getElementById('removeImage'),
        changeImageButton: document.getElementById('changeImage'),
        nameInput: document.getElementById('name'),
        nameInputContainer: document.querySelector('.name-wrapper'),
        emailInput: document.getElementById('email'),
        emailInputContainer: document.querySelector('.email-wrapper'),
        userName: document.getElementById('username'),
        userNameInputContainer: document.querySelector('.github-username-wrapper'),
        submitButton: document.getElementById('submit'),
        uploadInfo: document.querySelector('.info-text'),
    };

    const orignalAvatarSrc = docElements.userAvatar.src;

    //add event listeners
    docElements.avatarInput.addEventListener('change', (event) => handleFileInput(event, docElements));
    docElements.removeImageButton.addEventListener('click', () => removeAvatarImage(docElements));
    docElements.changeImageButton.addEventListener('click', () => changeAvatarImage(docElements));
    docElements.submitButton.addEventListener('click', (event)=>handleSubmit(event, docElements));
});


function handleFileInput(event, docElements) {
    const files = event.target.files;

    if (files.length === 0) {
        alert('No file Selected!');
        return;
    }

    const fileReader = new FileReader();

    // validate the file size and type
    const validFileTypes = ['image/png', 'image/jpeg'];
    const file = files[0];
    //size
    if (file.size > 500 * 1024) {
        docElements.uploadInfo.textContent = 'ⓘ File too large. Please upload a photo under 500KB.';
        docElements.uploadInfo.style = 'color: hsl(7, 88%, 67%)';
        return;
    }
    //type
    else if (!validFileTypes.includes(file.type)) {
        docElements.uploadInfo.textContent = 'ⓘ Wrong file type!. Please upload an image png/jpeg under 500KB.';
        docElements.uploadInfo.style = 'color: hsl(7, 88%, 67%)';
        return;
    }
    else {
        // reset upload info
        docElements.uploadInfo.textContent = 'ⓘ Upload your photo (JPG or PNG, max size: 500KB).';
        docElements.uploadInfo.style = 'color: hsl(252, 6%, 83%)';
        //update image src
        fileReader.onload = (e) => {
            docElements.userAvatar.src = e.target.result;
            sessionStorage.setItem('userAvatar', e.target.result);
            docElements.userAvatarContainer.classList.remove('hidden');
            docElements.blankUpload.classList.add('hidden');
        };
        fileReader.readAsDataURL(file);
    }
}

function removeAvatarImage(docElements) {
    docElements.userAvatarContainer.classList.add('hidden');
    docElements.blankUpload.classList.remove('hidden');
}

function changeAvatarImage(docElements){
    docElements.avatarInput.click();
}

function handleSubmit(event, docElements){
    event.preventDefault();

    //check if empty and initiate error state
    if(docElements.nameInput.value.length < 1 || docElements.nameInput.value[0] === ' '){
        docElements.nameInputContainer.classList.add('alert');
        return;
    }
    //else store the details
    else{
        docElements.nameInputContainer.classList.remove('alert');
        sessionStorage.setItem('name', docElements.nameInput.value);
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(docElements.emailInput.value)){
        docElements.emailInputContainer.classList.add('alert');
        return;
    }
    else{
        docElements.emailInputContainer.classList.remove('alert');
        sessionStorage.setItem('email', docElements.emailInput.value);
    }

    if(docElements.userName.value.length < 1 || docElements.userName.value[0] === ' '){
        docElements.userNameInputContainer.classList.add('alert');
        return;
    }
    else{
        docElements.userNameInputContainer.classList.remove('alert');
        sessionStorage.setItem('userName', docElements.userName.value);
    }
    //if everything is ok go to ticket page
    window.location = '/conference-ticket-generator-app/pages/ticket.html';
}

