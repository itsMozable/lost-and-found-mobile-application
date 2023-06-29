import React from 'react';

function uploadFileCloudinary() {
  return (
    <div>
      <input type="file" name="image" />
    </div>
  );
}
export default uploadFileCloudinary;

cloudinary.v2.uploader.upload(
  'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
  { public_id: 'olympic_flag' },
  function (error, result) {
    console.log(result);
  },
);
