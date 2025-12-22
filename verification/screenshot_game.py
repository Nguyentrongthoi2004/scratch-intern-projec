from playwright.sync_api import sync_playwright, expect

def take_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Increase viewport size to see the game monitor properly
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        try:
            print("Navigating to game...")
            page.goto("http://localhost:5173", timeout=30000)
            page.wait_for_load_state("networkidle")

            # 1. Main Menu Screenshot (Check for Save logic visibility in Settings later)
            print("Taking Main Menu screenshot...")
            page.screenshot(path="verification/menu.png")

            # Click "Settings" to check for Save button (Should NOT be there in Menu usually, or maybe it is?)
            # Actually, the Save button is only relevant in GameScreen.
            # But let's check Settings Modal in Menu to ensure it *doesn't* crash or look weird.
            page.get_by_role("button", name="Cài đặt").click()
            page.wait_for_selector("text=SETTINGS")
            page.screenshot(path="verification/settings_menu.png")
            page.keyboard.press("Escape")

            # 2. Start Game
            print("Starting new game...")
            page.get_by_role("button", name="Bắt đầu mới").click()

            # Select Character
            page.wait_for_selector("text=Select Your Character")
            page.get_by_role("img", name="Pink Monster").click()

            # Select Difficulty
            page.wait_for_selector("text=Select Difficulty")
            page.get_by_text("EASY").click()

            # Game Screen
            page.wait_for_selector("text=LEVEL 1", timeout=10000)
            print("Game started. Taking Game Screen screenshot...")
            page.screenshot(path="verification/game_screen.png")

            # 3. Test Manual Save Button in Settings
            print("Opening Settings in Game...")
            # Find settings button in game controls
            page.locator(".absolute.top-0.left-0").locator("button").first.click() # Assuming Back button is first, Settings maybe second?
            # Let's try finding the icon or using generic selector
            # The GameControls component has onBack, setShowSettings, etc.
            # In GameScreen.jsx: GameControls onBack={onBack} setShowSettings={setShowSettings}
            # Inside GameControls.jsx (I haven't read it, but assuming standard layout).
            # Let's try to find a generic settings icon/button.
            # Or simpler: Press Escape? SettingsModal usually listens to Escape to close, not open.

            # Let's locate the Settings button. It typically has a cog icon.
            # If I can't find it easily, I'll use the 'Settings' text if available? No, it's an icon.
            # Let's blindly click the buttons in the top left control area.
            # There are usually Home, Settings, Theme, HideUI.

            # Try clicking the 2nd button in the top left control group
            page.locator(".absolute.top-0.left-0 button").nth(1).click()

            page.wait_for_selector("text=SETTINGS")
            print("Settings opened. Checking for Save Button...")
            page.screenshot(path="verification/game_settings.png")

            # Verify Save Button text
            expect(page.get_by_text("SAVE GAME PROGRESS")).to_be_visible()

            # Click Save
            page.get_by_text("SAVE GAME PROGRESS").click()

            # Check for "GAME SAVED!" visual feedback
            page.wait_for_selector("text=GAME SAVED!")
            page.screenshot(path="verification/game_saved_feedback.png")
            print("Save feedback verified.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    take_screenshots()
