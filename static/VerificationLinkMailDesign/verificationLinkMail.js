function imageToBase64() {
    const imagePath = '/Assets/Logo.svg'; // Path to the image file

    fetch(imagePath)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                console.log(base64Data);
                document.body.querySelector('img').setAttribute('src', 'data:image/svg+xml;base64,' + base64Data);
                document.body.querySelector('img').style.height="3.4vh";
            };
            reader.readAsDataURL(blob);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


imageToBase64();