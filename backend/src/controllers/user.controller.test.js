import { UserController } from "./user.controller";
var userController = new UserController();

describe("userController--->getMaxNumber", () => {
  it("case 1", () => {
    const test = {
      data: [
        { name: "Cao Quang Khải", number: 1 },
        { name: "Lê Thị Trang", number: 3 },
        { name: "Mai Ngọc", number: 2 },
      ],
      result: { name: "Lê Thị Trang", number: 3 },
    };
    expect(userController.getMaxNumber(test.data)).toEqual(test.result);
  });
  it("case 2", () => {
    const test = {
      data: [],
      result: null,
    };
    expect(userController.getMaxNumber(test.data)).toEqual(test.result);
  });
  it("case 3", () => {
    const test = {
      data: null,
      result: { name: "Lê Thị Trang", number: 3 },
    };
    expect(userController.getMaxNumber(test.data)).toEqual(test.result);
  });
});

describe("userController--->getSum", () => {
  it("sum case 1", () => {
    expect(userController.sum(1, 2)).toBe(3);
  });
});
