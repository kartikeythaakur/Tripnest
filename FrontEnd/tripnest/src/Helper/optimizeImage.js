export const optimizeImage = (url , width = 600) =>{
  const newUrl =  url.replace('/upload',`/upload/f_auto,q_auto,w_${width}/`);
  // console.log("New URL: ", newUrl);
  return newUrl;
}