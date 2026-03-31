from playwright.sync_api import sync_playwright
import os
import time

# Configuration
URL = "http://localhost:5174/"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/final-audit-verification"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

print("=" * 70)
print("🧪 FINAL COMPREHENSIVE AUDIT VERIFICATION - iTrust Academy")
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
    
    # Capture console messages
    console_msgs = []
    page.on("console", lambda msg: console_msgs.append({"type": msg.type, "text": msg.text}))

    try:
        # 1. Multi-Page Routing
        print("\n[Phase 1: Routing Architecture]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        log_check("Home", "Homepage loaded", True)
        
        # Test navigation to About
        page.click("a[href='/about']")
        page.wait_for_url("**/about")
        log_check("About Route", "Navigated to /about", page.url.endswith("/about"))
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-about-page.png")

        # 2. Course Discovery & Search
        print("\n[Phase 2: Course Discovery & Search]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        page.evaluate("document.getElementById('courses').scrollIntoView()")
        
        # Test Search
        search_input = page.locator("input[placeholder='Search courses...']")
        search_input.fill("Database")
        page.wait_for_timeout(1000) # Debounce
        
        results_text = page.locator("p:has-text('Showing')").first.inner_text()
        log_check("Search Feedback", f"Search 'Database' feedback: {results_text}", "Showing" in results_text)
        page.screenshot(path=f"{SCREENSHOT_DIR}/02-search-results.png")

        # 3. Accessibility & Modals
        print("\n[Phase 3: A11y & Modals]")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.click("button:has-text('Careers')")
        page.wait_for_timeout(500)
        
        # Check for DialogDescription in DOM (Refined unique locator)
        description = page.get_by_text("This feature is coming soon").first
        log_check("Dialog A11y", "Coming Soon modal has description", description.is_visible())
        
        # Check console for Radix warnings
        a11y_warns = [m for m in console_msgs if "DialogContent" in m['text'] and "Description" in m['text']]
        log_check("Console A11y", "Zero Dialog a11y warnings", len(a11y_warns) == 0)
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-modal-a11y.png")
        page.keyboard.press("Escape")

        # 4. Success Feedback (Sonner)
        print("\n[Phase 4: Notification Feedback]")
        page.evaluate("document.getElementById('contact').scrollIntoView()")
        # Use a more specific selector for the consultation button
        page.click("button:has-text('Schedule Consultation')")
        page.wait_for_timeout(500)
        
        page.fill("#contact-name", "Audit Verifier")
        page.fill("#contact-email", "audit@itrust.com")
        page.fill("#contact-company", "QA Integrity")
        page.fill("#contact-message", "Meticulous verification of feedback system.")
        page.click("button[type='submit']")
        
        try:
            page.wait_for_selector("[data-sonner-toast]", timeout=5000)
            log_check("Sonner Feedback", "Success toast notification appeared", True)
        except:
            log_check("Sonner Feedback", "Success toast notification appeared", False)
        page.screenshot(path=f"{SCREENSHOT_DIR}/04-toast-success.png")

        # 5. Technical Integrity
        print("\n[Phase 5: Final Audit]")
        errors = [m for m in console_msgs if m['type'] == 'error']
        log_check("JS Errors", "Zero runtime console errors", len(errors) == 0, f"Found {len(errors)} errors")

    except Exception as e:
        print(f"❌ Verification Failure: {e}")
    finally:
        browser.close()

print("\n" + "=" * 70)
print("📊 FINAL AUDIT VERIFICATION SUMMARY")
print("=" * 70)
for res in verification_results:
    print(f"{res['status']} | {res['item']} | {res['description']}")
print("=" * 70)
print(f"📸 Visual evidence saved to: {SCREENSHOT_DIR}")
