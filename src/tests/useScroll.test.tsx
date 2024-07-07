import { fireEvent, renderHook } from "@testing-library/react";
import { useScroll } from "../hooks/useScroll";

describe("useScroll", () => {
  test("should return isAtTop value as true and isScrollTopBtnVisible as false when page is not scrolled", () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current.isAtTop).toBe(true);
    expect(result.current.isScrollTopBtnVisible).toBe(false);
  });

  test("should return isAtTop value as true when page is scrolled less than 100px", async () => {
    const { result } = renderHook(() => useScroll());
    await fireEvent.scroll(window, { target: { scrollY: 80 } });
    await expect(result.current.isAtTop).toBe(true);
  });

  test("should return isAtTop value as false when page is scrolled more than 100px", async () => {
    const { result } = renderHook(() => useScroll());
    await fireEvent.scroll(window, { target: { scrollY: 200 } });
    await expect(result.current.isAtTop).toBe(false);
  });

  test("should return isScrollTopBtnVisible value as false when page is scrolled less than 2000px", async () => {
    const { result } = renderHook(() => useScroll());
    await fireEvent.scroll(window, { target: { scrollY: 1800 } });
    await expect(result.current.isScrollTopBtnVisible).toBe(false);
  });

  test("should return isScrollTopBtnVisible value as true when page is scrolled more than 2000px", async () => {
    const { result } = renderHook(() => useScroll());
    await fireEvent.scroll(window, { target: { scrollY: 2500 } });
    await expect(result.current.isScrollTopBtnVisible).toBe(true);
  });
});
