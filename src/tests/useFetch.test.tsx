import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../hooks/useFetch";
import { API_URL } from "../constants";

describe("useFetch", () => {
  const url = `${API_URL}/posts`;
  const mockTimeout = 2000;

  test("should return initially loading as true, error as false and data as null", () => {
    const { result } = renderHook(() => useFetch(url));

    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(false);
    expect(result.current.data).toEqual(null);
  });

  test("should return the correct state based on the good response", async () => {
    const mockData = { foo: "bar" };

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
      ok: true,
    });

    const { result } = renderHook(() => useFetch(url));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
        expect(result.current.data).toEqual(mockData);
      },
      { timeout: mockTimeout }
    );
  });

  test("should handle fetch errors", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Fetch error"));
    const { result } = renderHook(() => useFetch(url));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(true);
        expect(result.current.data).toBe(null);
      },
      { timeout: mockTimeout }
    );
  });
});
