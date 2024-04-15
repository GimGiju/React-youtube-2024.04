export async function uploadImage(file) {
    const data = new FormData();   // 이미지나 첨부파일때는 반드시 이렇게 쓸 것
    data.append('file', file);
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: 'Post',
        body: data,
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data.url;
        });
}