
const validateImage = async (url:string, errorFunc:() => any, successFunc:() => any) => {
    let img = new Image()
    img.onerror = () => errorFunc()
    img.onload = () => successFunc()
    img.src = url
}

export {validateImage}