from playwright.sync_api import sync_playwright
import os
import time

# Configuration
URL = "http://127.0.0.1:5174/"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/final-sanity-check-v2"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

print("=" * 70)
print("🧪 FINAL PRODUCTION SANITY CHECK V2 - iTrust Academy")
print("=" * 70)

verification_results = []

def log_check(item, description, status, details=""):
    verification_results.append({
        "item": item,
        "description": description,
        "status": "✅ PASS" if status else "❌ FAIL",
        "details": details
    })
    icon = "✅" if status else "❌"
    print(f"{icon} {item}: {description}")
    if details:
        print(f"   Details: {details}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_page(viewport={"width": 1440, "height": 900})
    page = context
    
    try:
        # 1. Routing
        print("\n[Phase 1: Foundations]")
        page.goto(URL, wait_until="networkidle")
        log_check("Homepage", "Primary landing page loaded", True)
        
        # 2. Search Discovery
        print("\n[Phase 2: Search UI]")
        page.evaluate("document.getElementById('courses').scrollIntoView()")
        search_input = page.locator("input[placeholder='Search courses...']")
        search_input.fill("SolarWinds")
        
        # Wait for debounce and animation
        page.wait_for_timeout(3000)
        feedback = page.locator("p:has-text('Showing')").first
        
        if feedback.is_visible():
            text = feedback.inner_text()
            log_check("Search UI", "Search provides results feedback", True, f"Text: {text}")
        else:
            log_check("Search UI", "Search provides results feedback", False, "Feedback text not visible")
        
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-search-verified.png")

        # 3. Action Interception
        print("\n[Phase 3: Security & Intercept]")
        page.evaluate("document.getElementById('schedule').scrollIntoView()")
        page.wait_for_timeout(1000)
        
        # Robust click on Enroll Now
        enroll_btn = page.locator("button:has-text('Enroll Now')").first
        enroll_btn.click()
        
        # Wait for modal with retry/longer timeout
        page.wait_for_timeout(2000)
        modal_title = page.locator("h2:has-text('Welcome Back')")
        
        if modal_title.is_visible():
            log_check("Action Intercept", "Guest Enroll triggers Login Modal", True)
        else:
            log_check("Action Intercept", "Guest Enroll triggers Login Modal", False, "Modal title not found")
            
        page.screenshot(path=f"{SCREENSHOT_DIR}/02-intercept-verified.png")
        page.keyboard.press("Escape")

        # 4. Multi-Page Routes
        print("\n[Phase 4: Site Depth]")
        page.click("a[href='/faq']")
        page.wait_for_url("**/faq")
        log_check("FAQ Route", "Navigated to FAQ page", True)
        
        page.click("a[href='/privacy']")
        page.wait_for_url("**/privacy")
        log_check("Privacy Route", "Navigated to Privacy Policy", True)
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-privacy-verified.png")

    except Exception as e:
        print(f"❌ Sanity Check Failure: {e}")
    finally:
        browser.close()

print("\n" + "=" * 70)
print("📊 FINAL SANITY CHECK ASSESSMENT REPORT")
print("=" * 70)
for res in verification_results:
    print(f"{res['status']} | {res['item']} | {res['description']}")
print("=" * 70)
print(f"📸 Visual evidence saved to: {SCREENSHOT_DIR}")
