/* global FormData */
class Form {
  fileForm(name, file, fileName) {
    let formData = new FormData();
    formData.append(name, file, fileName);
    return formData;
  }
}

export const form = new Form();
