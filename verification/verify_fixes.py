from playwright.sync_api import sync_playwright, expect

def verify_fixes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Increase viewport size to see the game monitor properly
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        try:
            print("Navigating to game...")
            page.goto("http://localhost:5173", timeout=30000)
            page.wait_for_load_state("networkidle")

            # 1. Main Menu - Ensure NO Save Button in Settings (since we are not in game)
            print("Checking Settings in Main Menu...")
            page.get_by_role("button", name="Cài đặt").click()
            page.wait_for_selector("text=SETTINGS")

            if page.locator("text=SAVE GAME PROGRESS").is_visible():
                print("FAIL: Save Button visible in Main Menu (Should be hidden)")
            else:
                print("PASS: Save Button correctly hidden in Main Menu")

            page.keyboard.press("Escape")

            # 2. Start Game
            print("Starting new game...")
            # Using force click or waiting for overlay to disappear
            page.get_by_role("button", name="Bắt đầu mới").click(force=True)

            # Select Character
            page.wait_for_selector("text=Select Your Character", timeout=10000)
            page.get_by_role("img", name="Pink Monster").click()

            # Select Difficulty
            page.wait_for_selector("text=Select Difficulty")
            page.get_by_text("EASY").click()

            # Game Screen
            page.wait_for_selector("text=LEVEL 1", timeout=10000)
            print("Game started.")

            # 3. Open Settings in Game
            print("Opening Settings in Game...")
            # Try to find the settings button. It's likely in the top-left controls.
            # We can use the generic 'Settings' icon logic or blind click.
            # Assuming the controls: [Back, Settings, ...]
            # Let's try to click the button that opens settings.

            # Using a more robust selector if possible. The button calls 'setShowSettings'.
            # It's inside GameControls.
            # Let's try clicking the second button in the header.
            page.locator(".absolute.top-0.left-0 button").nth(1).click()

            page.wait_for_selector("text=SETTINGS")

            # 4. Verify Save Button Exists
            if page.locator("text=SAVE GAME PROGRESS").is_visible():
                print("PASS: Save Button visible in Game")

                # Click it
                page.get_by_text("SAVE GAME PROGRESS").click()

                # Check for "GAME SAVED!" feedback
                try:
                    page.wait_for_selector("text=GAME SAVED!", timeout=5000)
                    print("PASS: Save feedback received")
                except:
                    print("FAIL: Save feedback not seen")
            else:
                print("FAIL: Save Button NOT visible in Game")

        except Exception as e:
            print(f"Error: {e}")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_fixes()
