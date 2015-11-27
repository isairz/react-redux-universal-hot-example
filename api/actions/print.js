export default function login(req, params) {
  const print = {
    printId: "518",
    userId: "123",
    name: "김성준",
    memo: "1부 인쇄 해 주세요",
    file: "http://...",
    state: "ready",
  };
  return Promise.resolve(print);
}
