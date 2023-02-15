const uploadBox = document.querySelector(".upload-box"),
    previewImg = uploadBox.querySelector("img"),
    fileInput = uploadBox.querySelector("input"),
    widthInput = document.querySelector(".width input"),
    heightInput = document.querySelector(".height input"),
    ratio = document.querySelector(".ratio input"),
    download = document.querySelector(".download"),
    quality = document.querySelector(".quality input");

let oriImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0]; // getting user selected file
    if (!file) return; // return if user hasn't selelcted any file
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => {
        // once image loaded
        document.querySelector(".wrapper").classList.add("active");
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        oriImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    });

    widthInput.addEventListener("keyup", () => {
        // getting height to according to the ratio checkbox status
        const height = ratio.checked ? widthInput.value / oriImageRatio : heightInput.value;
        heightInput.value = Math.floor(height);
    });
    heightInput.addEventListener("keyup", () => {
        // getting width to according to the ratio checkbox status
        const width = ratio.checked ? heightInput.value * oriImageRatio : widthInput.value;
        widthInput.value = Math.floor(width);
    });
};

const resizeAndDonwload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // if quality checkbox is checked, pass 0.7 to imgQuality else pass 1.0
    const imgQuality = quality.checked ? 0.7 : 1.0;

    // setting canvas width & height according to the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // drawing user selected image into the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime(); //passing current time as download value
    a.click(); //clicking <a> element so the file download
};

download.addEventListener("click", resizeAndDonwload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
