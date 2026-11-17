import { jest, test, expect } from "@jest/globals";

const mockGetAll = jest.fn();

jest.unstable_mockModule("../models/termekModel.js", () => ({
    default: {
        getAll: mockGetAll
    }
}));

const { default: TermekController } = await import("./termekController.js");

test("visszaadja a termékeket", async () => {
    const termekek = [
        { id: 1, nev: "Termék 1", ar: 1000, keszlet: 10 }
    ];

    mockGetAll.mockResolvedValue(termekek);

    const resultMock = {
        json: jest.fn()
    };

    await TermekController.getAll({ params: {} }, resultMock);

    expect(resultMock.json).toHaveBeenCalledWith(termekek);
});