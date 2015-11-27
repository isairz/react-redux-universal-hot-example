export default function login(req, params) {
  const user = {
    name: "김성준",
    cash: "9950",
    tel: "010-1111-11111",
    email: "123123@adsf.com",
    requested: [
      {
        printId: "518",
        userId: "123",
        state: "ready"
      },
      {
        printId: "518",
        userId: "123",
        state: "ready"
      }
    ]
  };
  return Promise.resolve(user);
}
