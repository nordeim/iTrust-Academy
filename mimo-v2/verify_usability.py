from playwright.sync_api import sync_playwright
import os
import time

# Configuration
URL = "http://localhost:5174/"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/usability-verification"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

print("=" * 70)
print("🧪 UI/UX USABILITY VERIFICATION - iTrust Academy")
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
    
    console_warnings = []
    page.on("console", lambda msg: console_warnings.append(msg.text) if msg.type == "warning" else None)

    try:
        # 1. Page Load
        print("\n[Phase 1: Initial State & A11y]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        
        # Trigger Login Modal to check for A11y warnings
        page.click("button:has-text('Sign In')")
        page.wait_for_timeout(1000)
        
        # Trigger Coming Soon Modal
        page.keyboard.press("Escape")
        page.wait_for_timeout(500)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.click("button:has-text('Careers')")
        page.wait_for_timeout(1000)
        
        # Check console warnings for Dialog descriptions
        a11y_warn = any("DialogContent" in w and "Description" in w for w in console_warnings)
        log_check("A11y Warnings", "Check for missing Dialog descriptions", not a11y_warn, 
                  f"Warnings found: {len([w for w in console_warnings if 'Dialog' in w])}")
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-a11y-check.png")
        page.keyboard.press("Escape")

        # 2. Platform Card Click Behavior (Issue #2)
        print("\n[Phase 2: Platform Card Scroll]")
        page.evaluate("document.getElementById('solutions').scrollIntoView()")
        page.wait_for_timeout(500)
        
        # Reset scroll position to top to verify scroll-to-courses
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)
        
        # Click SolarWinds card
        page.click("button:has-text('SolarWinds')")
        page.wait_for_timeout(1500) # Wait for scroll
        
        current_scroll = page.evaluate("window.scrollY")
        # Courses section should be around 1700px+
        log_check("Platform Card Scroll", "SolarWinds card triggers scroll to courses", 
                  current_scroll > 1000, f"Current scroll: {current_scroll}px")
        page.screenshot(path=f"{SCREENSHOT_DIR}/02-platform-scroll.png")

        # 3. Success Feedback (Issue #3)
        print("\n[Phase 3: Form Submission Feedback]")
        # Click Schedule Consultation (in professional services section)
        page.evaluate("document.getElementById('schedule').scrollIntoView()")
        page.wait_for_timeout(500)
        # Find consultation button
        page.click("button:has-text('Schedule Consultation')")
        page.wait_for_timeout(1000)
        
        # Fill form
        page.fill("input[id='name']", "Test Verifier")
        page.fill("input[id='email']", "verifier@example.com")
        page.fill("input[id='company']", "QA Integrity Corp")
        page.fill("textarea[id='message']", "Meticulous verification of success feedback.")
        
        # Submit and watch for toast
        page.click("button[type='submit']")
        
        # Wait for toast element (Sonner usually uses data-sonner-toast)
        toast_selector = "[data-sonner-toast]"
        try:
            page.wait_for_selector(toast_selector, timeout=5000)
            toast_text = page.locator(toast_selector).first.inner_text()
            log_check("Form Feedback", "Success toast visible after submission", True, f"Toast: {toast_text}")
        except:
            log_check("Form Feedback", "Success toast visible after submission", False, "No toast detected")
            
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-form-submission.png")

        # 4. Regression Check
        print("\n[Phase 4: Regression Check]")
        # Check external social link
        linkedin = page.locator("a[aria-label='Visit our LinkedIn page']").first
        target = linkedin.get_attribute("target")
        rel = linkedin.get_attribute("rel")
        log_check("Social Security", "LinkedIn link has target='_blank' and rel", 
                  target == "_blank" and "noopener" in rel, f"target={target}, rel={rel}")

    except Exception as e:
        print(f"❌ Error during verification: {e}")
    finally:
        browser.close()

print("\n" + "=" * 70)
print("📊 VERIFICATION ASSESSMENT REPORT SUMMARY")
print("=" * 70)
for res in verification_results:
    print(f"{res['status']} | {res['item']} | {res['description']}")
print("=" * 70)
