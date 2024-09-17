export async function uploadImage(image) {
  const formData = new FormData();
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  formData.append('tags', 'browser_upload');
  formData.append('file', image);

  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data.url);
}