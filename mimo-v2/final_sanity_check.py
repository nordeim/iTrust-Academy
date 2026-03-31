from playwright.sync_api import sync_playwright
import os
import time

# Configuration
URL = "http://localhost:5174/"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/final-sanity-check"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

print("=" * 70)
print("🧪 FINAL PRODUCTION SANITY CHECK - iTrust Academy")
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
    console_messages = []
    page.on("console", lambda msg: console_messages.append({"type": msg.type, "text": msg.text}))

    try:
        # 1. Landing Page & Routing
        print("\n[Phase 1: Foundations & Routing]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        log_check("Homepage", "Primary landing page loaded", True)
        
        # Test navigation to About
        page.click("a[href='/about']")
        page.wait_for_url("**/about")
        log_check("About Route", "Navigated to About Us page", page.url.endswith("/about"))
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-about-page.png")
        
        # Test navigation to Dashboard (Protected)
        page.goto(URL + "dashboard")
        page.wait_for_load_state("networkidle")
        login_prompt = page.locator("h1:has-text('Please Sign In')")
        log_check("Protected Route", "Dashboard correctly redirects guest", login_prompt.is_visible())
        page.screenshot(path=f"{SCREENSHOT_DIR}/02-dashboard-protected.png")

        # 2. Course Discovery Engine
        print("\n[Phase 2: Discovery Engine]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        page.evaluate("document.getElementById('courses').scrollIntoView()")
        
        # Search check
        search_input = page.locator("input[placeholder='Search courses...']")
        search_input.fill("SolarWinds")
        page.wait_for_timeout(1500)
        feedback = page.locator("p:has-text('Showing')").first
        log_check("Search UI", "Search provides immediate feedback", feedback.is_visible(), f"Text: {feedback.inner_text() if feedback.is_visible() else 'N/A'}")
        
        # Click course card
        page.click("a[href='/courses/solarwinds-network-performance-monitor']")
        page.wait_for_url("**/courses/solarwinds-network-performance-monitor")
        log_check("Detail Routing", "Course card links to detail page", True)
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-course-detail.png")

        # 3. Content Integrity (Tabs)
        print("\n[Phase 3: Content & Interaction]")
        page.click("button:has-text('Curriculum')")
        curriculum_title = page.locator("h3:has-text('Course Curriculum')")
        log_check("Detail Tabs", "Curriculum tab content is active", curriculum_title.is_visible())
        
        # Action Interception (Guest)
        enroll_btn = page.locator("button:has-text('Enroll Now')").first
        enroll_btn.click()
        page.wait_for_timeout(500)
        modal_title = page.get_by_text("Welcome Back")
        log_check("Action Intercept", "Enrollment triggers login modal for guest", modal_title.is_visible())
        page.screenshot(path=f"{SCREENSHOT_DIR}/04-action-intercept.png")
        page.keyboard.press("Escape")

        # 4. Feedback & Forms
        print("\n[Phase 4: Feedback Loops]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        page.evaluate("document.getElementById('contact').scrollIntoView()")
        page.click("button:has-text('Contact Sales')")
        page.wait_for_timeout(500)
        
        page.fill("#contact-name", "Audit User")
        page.fill("#contact-email", "audit@itrust.com")
        page.fill("#contact-company", "Sanity Check Corp")
        page.fill("#contact-message", "Final verification before launch.")
        page.click("button[type='submit']")
        
        try:
            page.wait_for_selector("[data-sonner-toast]", timeout=5000)
            log_check("Toast Feedback", "Success toast notification appeared", True)
        except:
            log_check("Toast Feedback", "Success toast notification appeared", False)
        page.screenshot(path=f"{SCREENSHOT_DIR}/05-toast-success.png")

        # 5. Technical Quality Audit
        print("\n[Phase 5: Quality Audit]")
        errors = [m for m in console_messages if m['type'] == 'error']
        a11y_warns = [m for m in console_messages if 'DialogContent' in m['text']]
        log_check("JS Integrity", "Zero runtime console errors", len(errors) == 0, f"Errors found: {len(errors)}")
        log_check("A11y Audit", "Zero Radix Dialog a11y warnings", len(a11y_warns) == 0, f"Warnings: {len(a11y_warns)}")

        # 6. Responsive Check
        print("\n[Phase 6: Mobile Responsiveness]")
        page.set_viewport_size({"width": 390, "height": 844})
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        hamburger = page.locator("button[aria-label='Toggle menu']").or_(page.locator("button:has(svg.lucide-menu)"))
        log_check("Mobile UI", "Hamburger menu is visible", hamburger.first.is_visible())
        page.screenshot(path=f"{SCREENSHOT_DIR}/06-mobile-view.png")

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
