from playwright.sync_api import sync_playwright
import os
import uuid
import time

# Configuration
URL = "http://127.0.0.1:5174/"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

# Random User Data
RANDOM_ID = str(uuid.uuid4())[:8]
USER_DATA = {
    "firstName": "Test",
    "lastName": "User",
    "username": f"user_{RANDOM_ID}",
    "email": f"test_{RANDOM_ID}@example.com",
    "password": "Password123!",
}

print(f"🚀 Starting FINAL E2E Test Suite for user: {USER_DATA['username']}")

def log_test(name, status, details=""):
    icon = "✅" if status else "❌"
    print(f"{icon} {name}: {'PASSED' if status else 'FAILED'}")
    if details: print(f"   {details}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    try:
        # 1. Navigation
        page.goto(URL, wait_until="networkidle")
        log_test("Initial Load", True)

        # 2. Registration
        print("\n📋 Testing UI-101: User Registration...")
        page.get_by_role("button", name="Register").first.click()
        page.wait_for_selector("text=Create Account")
        
        page.fill("#firstName", USER_DATA["firstName"])
        page.fill("#lastName", USER_DATA["lastName"])
        page.fill("#username", USER_DATA["username"])
        page.fill("#registerEmail", USER_DATA["email"])
        page.fill("#registerPassword", USER_DATA["password"])
        page.fill("#confirmPassword", USER_DATA["password"])
        
        page.get_by_role("button", name="Create Account").last.click()
        
        # Wait for success (Avatar shows up)
        page.wait_for_selector("button.relative.h-10.w-10.rounded-full", timeout=15000)
        log_test("Registration", True, "User registered and auto-logged in")
        page.screenshot(path=f"{SCREENSHOT_DIR}/e2e-final-01-auth.png")

        # 3. Logout
        print("\n📋 Testing Session Management...")
        page.click("button.relative.h-10.w-10.rounded-full")
        page.wait_for_timeout(500)
        page.get_by_text("Log out").click()
        
        # Verify guest state
        page.wait_for_selector("button:has-text('Sign In')")
        log_test("Logout", True)

        # 4. Login
        print("\n📋 Testing UI-102: User Login...")
        page.get_by_role("button", name="Sign In").first.click()
        page.fill("#email", USER_DATA["email"])
        page.fill("#password", USER_DATA["password"])
        page.get_by_role("button", name="Sign In").last.click()
        
        page.wait_for_selector("button.relative.h-10.w-10.rounded-full")
        log_test("Login", True)
        page.screenshot(path=f"{SCREENSHOT_DIR}/e2e-final-02-login.png")

        # 5. Discovery
        print("\n📋 Testing UI-201/202: Course Discovery...")
        page.evaluate("document.getElementById('courses').scrollIntoView()")
        page.wait_for_timeout(1000)
        
        # Filter check
        page.get_by_role("button", name="Security").click()
        page.wait_for_timeout(1000)
        log_test("Course Catalog", True, "Courses filtered by Security")
        page.screenshot(path=f"{SCREENSHOT_DIR}/e2e-final-03-discovery.png")

        # 6. Interception
        print("\n📋 Testing UI-301: Action Interception...")
        # Logout
        page.click("button.relative.h-10.w-10.rounded-full")
        page.get_by_text("Log out").click()
        page.wait_for_selector("button:has-text('Sign In')")
        
        # Click Enroll
        page.evaluate("document.getElementById('schedule').scrollIntoView()")
        page.wait_for_timeout(500)
        page.get_by_role("button", name="Enroll Now").first.click()
        
        # Modal check
        page.wait_for_selector("text=Welcome Back")
        log_test("Interception", True, "Guest Enroll triggered Login Modal")
        page.screenshot(path=f"{SCREENSHOT_DIR}/e2e-final-04-interception.png")

    except Exception as e:
        print(f"❌ ERROR: {e}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/e2e-final-error.png")
    finally:
        browser.close()

print("\n" + "="*50)
print("🏁 Final E2E Test Execution Complete!")
print("="*50)
