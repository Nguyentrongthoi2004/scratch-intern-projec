from playwright.sync_api import sync_playwright

def verify_shop_and_inventory():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to home page...")
            page.goto("http://localhost:5173")

            # Wait for and click Shop Button
            shop_btn = page.wait_for_selector('button:has-text("Cửa Hàng")', timeout=10000)
            shop_btn.click()

            # Wait for Shop Screen
            page.wait_for_selector('text=Cửa Hàng Kỹ Năng', timeout=5000)

            # Take screenshot of Shop
            page.screenshot(path="verification/shop_screen.png")
            print("Shop screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_shop_and_inventory()
