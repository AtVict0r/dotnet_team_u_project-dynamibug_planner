export const download = () => {
  const canvas = document.getElementById("canvas");

  const canvasContents = canvas.toDataURL();
  const string = JSON.stringify(canvasContents);
  console.log(string);
  
  // const context = canvas.getContext("2d");
  // const string2 = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
  // console.log(string2);

  // fetch(url).then((response) => {
  //   response.blob().then((blob) => {
  //     let url = window.URL.createObjectURL(blob);
  //     let a = document.createElement("a");
  //     a.href = url;
  //     a.download = "image.png";
  //     a.click();
  //   });
  // });
};