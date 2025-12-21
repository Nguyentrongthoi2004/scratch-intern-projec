from playwright.sync_api import sync_playwright
import time

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to App
        print("Navigating to app...")
        page.goto("http://localhost:5173")
        page.wait_for_timeout(3000) # Wait for load

        # Take screenshot of Main Menu
        print(" capturing Main Menu...")
        page.screenshot(path="verification_main_menu.png")

        # 2. Verify Leaderboard
        print("Clicking Leaderboard...")
        # Button text "Bảng xếp hạng"
        page.get_by_text("Bảng xếp hạng").click()
        page.wait_for_timeout(2000)
        print(" capturing Leaderboard...")
        page.screenshot(path="verification_leaderboard.png")

        # Go back (reload to be safe)
        page.goto("http://localhost:5173")
        page.wait_for_timeout(2000)

        # 3. Verify Settings
        print("Clicking Settings...")
        page.get_by_text("Cài đặt").click()
        page.wait_for_timeout(2000)
        print(" capturing Settings...")
        page.screenshot(path="verification_settings.png")

        browser.close()

if __name__ == "__main__":
    verify_ui()
