import axios from "../api/axios";

export const uploadedTempImages = new Set();

export function MyUploadAdapter(loader) {
  return {
    async upload() {
      const file = await loader.file;

      const data = new FormData();
      data.append('tempFile', file);

      const response = await axios.post("/post/uploadTempImg", data);
      const result = response.data;

      if (result.fileUrl) {
        uploadedTempImages.add(result.fileUrl);
        return { default: result.fileUrl };
      } else {
        console.error("Image upload failed or invalid response:", result);
        throw new Error("Image upload failed");
      }
    }
  };
}

export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export function extractTempImages(html) {
  const regex = /<img[^>]+src="([^">]+temp-images[^">]+)"/g;
  const urls = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

export function extractImages(html) {
  const regex = /<img[^>]+src="([^">]+images[^">]+)"/g;
  const urls = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

export async function deleteTempImages(){
  if (uploadedTempImages.size > 0) {
    const response = await axios.post("/post/deleteTempImg", { file: Array.from(uploadedTempImages) })
    return response.data;
  }
  return {code: "200", status: "success"}
}