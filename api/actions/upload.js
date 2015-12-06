export default function upload(req, params) {
  console.log(req.body);
  console.log(req.files);
  return Promise.resolve();
}
