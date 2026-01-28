export async function uploadToCloudinary(file) {
  if (!file) {
    throw new Error("No file provided to uploadToCloudinary");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
  );

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error("Cloudinary cloud name missing");
  }

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}
