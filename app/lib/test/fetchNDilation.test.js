import fetchNDilation from "../fetchNDilation";

describe("fetchNDilation", () => {
    const fetch = jest.fn(() => Promise.resolve("whatever"));
    const value = [1, 2, 3, 4];
    const degree = 2;

    it("should call fetch with correct url", () => {
        fetchNDilation(fetch, value, degree);

        expect(fetch.mock.calls.length).toBe(1);
        expect(fetch.mock.calls[0][0]).toEqual(
            "http://localhost:8080/dilation"
        );
    });

    it("should call fetch with correct body (value from params and fixed degree of 2)", () => {
        fetchNDilation(fetch, value, degree);

        expect(fetch.mock.calls.length).toBe(1);
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
            value: [1, 2, 3, 4],
            degree: 2,
        });
    });

    it("should return whatever fetch returns", async () => {
        const result = await fetchNDilation(fetch, value, degree);

        expect(result).toEqual("whatever");
    });
});
