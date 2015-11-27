export default function login(req) {
  const press = {
    name: "IT/BT",
    requested: [
      {
        printId: "518",
        userId: "123",
        name: "김성준",
        state: "ready" // 인쇄 준비됨
      },
      {
        printId: "518",
        userId: "123",
        name: "김성준",
        state: "completed", // 완료됨
      },
      {
        printId: "518",
        userId: "123",
        name: "김성준",
        state: "rejected", // 거절됨
      },
    ]
  };
  return Promise.resolve(press);
}
