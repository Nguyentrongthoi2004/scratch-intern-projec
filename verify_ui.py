from playwright.sync_api import sync_playwright

def verify_ui():
    print("Navigating to app...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to app
        page.goto("http://localhost:5173/scratch-intern-projec/")
        page.wait_for_timeout(3000)

        # Click "BẮT ĐẦU MỚI"
        try:
            print("Clicking BẮT ĐẦU MỚI...")
            page.get_by_text("BẮT ĐẦU MỚI").click()
            page.wait_for_timeout(2000)

            # Character Select Screen - Click PINKY
            print("Clicking PINKY...")
            page.get_by_text("PINKY").click()
            page.wait_for_timeout(2000)

            # Now Difficulty Select?
            print("Dumping text after Char Select:", page.inner_text("body"))
            page.screenshot(path="verification_difficulty.png")

            # Try Clicking EASY
            if page.get_by_text("EASY").count() > 0:
                page.get_by_text("EASY").click()
                page.wait_for_timeout(2000)

                # Now Level Select
                print("Clicking Level 1...")
                page.get_by_text("1", exact=True).first.click()
                page.wait_for_timeout(3000)

                print("Taking final screenshot...")
                page.screenshot(path="verification_game_final.png")

        except Exception as e:
            print(f"Error: {e}")

        browser.close()

if __name__ == "__main__":
    verify_ui()
