from playwright.sync_api import sync_playwright
import os
import time

# Configuration
URL = "http://localhost:5174/"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/final-verification-v3"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

print("=" * 70)
print("🧪 FINAL BROWSER UI/UX VERIFICATION V3 - iTrust Academy")
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
    
    # Capture console logs
    console_messages = []
    page.on("console", lambda msg: console_messages.append({"type": msg.type, "text": msg.text}))

    try:
        # 1. Routing Verification
        print("\n[Phase 1: Routing & Navigation]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        
        # Navigate to About Us
        page.click("a[href='/about']")
        page.wait_for_url("**/about")
        log_check("Route: /about", "Navigated to About Us page", page.url.endswith("/about"))
        
        # Navigate to FAQ
        page.click("a[href='/faq']")
        page.wait_for_url("**/faq")
        log_check("Route: /faq", "Navigated to FAQ page", page.url.endswith("/faq"))

        # 2. Course Detail Verification
        print("\n[Phase 2: Course Detail & Tabs]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        page.evaluate("document.getElementById('courses').scrollIntoView()")
        
        # Click first course card
        first_course_card = page.locator("a[href^='/courses/']").first
        course_slug = first_course_card.get_attribute("href")
        first_course_card.click()
        page.wait_for_url(f"**{course_slug}")
        log_check("Course Detail", f"Navigated to {course_slug}", True)
        
        # Verify Tabs
        page.click("button:has-text('Curriculum')")
        curriculum_visible = page.locator("h3:has-text('Course Curriculum')").is_visible()
        log_check("Detail Tabs", "Curriculum tab is functional", curriculum_visible)
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-curriculum-tab.png")

        # 3. Search Functionality
        print("\n[Phase 3: Search Discovery]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        page.evaluate("document.getElementById('courses').scrollIntoView()")
        
        search_input = page.locator("input[placeholder='Search courses...']")
        search_input.fill("SolarWinds")
        page.wait_for_timeout(2000) # Wait for debounce and re-render
        
        # Robust counting: wait for visibility
        results_grid = page.locator(".grid").filter(has=page.locator("a[href^='/courses/']"))
        cards = results_grid.locator("a[href^='/courses/']")
        count = cards.count()
        
        # Verify feedback text
        feedback = page.locator("p:has-text('Showing')").first
        feedback_text = feedback.inner_text() if feedback.is_visible() else "No feedback"
        
        log_check("Search Filter", f"Search results visible: {count}", count > 0, f"Feedback: {feedback_text}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/02-search-results.png")

        # 4. Feedback & Modals
        print("\n[Phase 4: Feedback & A11y]")
        page.evaluate("document.getElementById('contact').scrollIntoView()")
        page.click("button:has-text('Contact Sales')")
        page.wait_for_timeout(500)
        
        # Submit form to check feedback
        page.fill("#contact-name", "QA Verifier")
        page.fill("#contact-email", "qa@itrust.com")
        page.fill("#contact-company", "QA Excellence")
        page.fill("#contact-message", "Meticulous verification.")
        page.click("button[type='submit']")
        
        # Check for toast
        try:
            page.wait_for_selector("[data-sonner-toast]", timeout=5000)
            log_check("Form Feedback", "Success toast notification appeared", True)
        except:
            log_check("Form Feedback", "Success toast notification appeared", False)
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-toast-feedback.png")

        # 5. Dashboard
        print("\n[Phase 5: Dashboard Protected Route]")
        page.goto(URL + "dashboard")
        page.wait_for_load_state("networkidle")
        login_prompt = page.locator("h1:has-text('Please Sign In')")
        log_check("Protected Route", "Dashboard correctly prompts for login", login_prompt.is_visible())
        page.screenshot(path=f"{SCREENSHOT_DIR}/04-dashboard-guest.png")

        # 6. Final Audit
        print("\n[Phase 6: Technical Quality]")
        errors = [m for m in console_messages if m['type'] == 'error']
        log_check("Console Check", "Zero runtime errors", len(errors) == 0, f"Found {len(errors)} errors")

    except Exception as e:
        print(f"❌ Verification Failure: {e}")
    finally:
        browser.close()

print("\n" + "=" * 70)
print("📊 FINAL VERIFICATION ASSESSMENT REPORT SUMMARY")
print("=" * 70)
for res in verification_results:
    print(f"{res['status']} | {res['item']} | {res['description']}")
print("=" * 70)
print(f"📸 Visual evidence saved to: {SCREENSHOT_DIR}")
