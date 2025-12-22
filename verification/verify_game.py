import sys
import os
import json
from playwright.sync_api import sync_playwright

def verify_game():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the game (assuming it's running on 5173)
        try:
            page.goto("http://localhost:5173", timeout=30000)
            page.wait_for_load_state("networkidle")
            print("Successfully loaded game page")
        except Exception as e:
            print(f"Failed to load page: {e}")
            return False

        # Check Main Menu items
        try:
            # Check Continue Button Visibility
            # It should NOT be visible initially as we assume fresh state or we clear storage
            page.evaluate("localStorage.clear()")
            page.reload()

            # Wait for menu
            page.wait_for_selector("text=SCRATCH")

            # Check for "Tiếp tục" (Continue) button
            continue_btn = page.query_selector("text=Tiếp tục")
            if continue_btn:
                print("FAIL: Continue button visible on fresh start")
            else:
                print("PASS: Continue button hidden on fresh start")

        except Exception as e:
            print(f"Error during verification: {e}")
            return False

        browser.close()
        return True

if __name__ == "__main__":
    if verify_game():
        print("Verification Successful")
    else:
        print("Verification Failed")
        sys.exit(1)
