export function imageUrl(path) {
  try {
    if(!path) return '';
    let header = path.slice(0, +process.env.CMS_IMAGE_PATH.length);
    if (header === process.env.CMS_IMAGE_PATH) {
      return `${process.env.CMS_IMAGE_URL}/${path}`;
    } else {
      return path;
    }
  } catch (err) {
    console.error(err);
  }
}