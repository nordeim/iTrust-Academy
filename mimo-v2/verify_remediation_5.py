from playwright.sync_api import sync_playwright
import os
import time

# Configuration
URL = "http://localhost:5174/"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/remediation-verification"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

print("=" * 70)
print("🧪 REMEDIATION VERIFICATION - iTrust Academy (Phase 5)")
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
        # 1. Load Page
        print("\n[Phase 1: A11y Warning Verification]")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        
        # Open Contact Modal
        page.evaluate("document.getElementById('contact').scrollIntoView()")
        page.wait_for_timeout(500)
        page.click("button:has-text('Request Corporate Demo')")
        page.wait_for_timeout(1000)
        
        # Open Coming Soon Modal
        page.keyboard.press("Escape")
        page.wait_for_timeout(500)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.click("button:has-text('Careers')")
        page.wait_for_timeout(1000)
        
        # Check console for "Missing Description" warnings
        a11y_warn = any("DialogContent" in w and "Description" in w for w in console_warnings)
        log_check("A11y Warnings", "No missing Description warnings in console", not a11y_warn, 
                  f"Found {len([w for w in console_warnings if 'Dialog' in w])} relevant warnings.")
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-a11y-verified.png")
        page.keyboard.press("Escape")

        # 2. Success Feedback Verification
        print("\n[Phase 2: Success Feedback Verification]")
        page.evaluate("document.getElementById('contact').scrollIntoView()")
        page.wait_for_timeout(500)
        page.click("button:has-text('Contact Sales')")
        page.wait_for_timeout(1000)
        
        # Fill and submit form using correct IDs from contact-modal.tsx
        page.fill("input[id='contact-name']", "Test Verifier")
        page.fill("input[id='contact-email']", "verifier@itrust.com")
        page.fill("input[id='contact-company']", "Verification Ltd")
        page.fill("textarea[id='contact-message']", "Meticulously verifying the success toast notification.")
        
        page.click("button[type='submit']")
        
        # Detect Toast
        toast_selector = "[data-sonner-toast]"
        try:
            page.wait_for_selector(toast_selector, timeout=5000)
            toast_text = page.locator(toast_selector).first.inner_text()
            log_check("Success Feedback", "Toast notification appeared on submit", True, f"Toast text: {toast_text}")
        except:
            log_check("Success Feedback", "Toast notification appeared on submit", False, "No toast detected after submission.")
            
        page.screenshot(path=f"{SCREENSHOT_DIR}/02-success-feedback.png")

        # 3. Platform Card Scroll Verification (Robustness check)
        print("\n[Phase 3: Platform Card Scroll Verification]")
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)
        page.evaluate("document.getElementById('solutions').scrollIntoView()")
        page.wait_for_timeout(500)
        
        # Reset scroll to ensure fresh movement
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(500)
        
        page.click("button:has-text('SolarWinds')")
        page.wait_for_timeout(2000) # Give it time to scroll
        
        final_scroll = page.evaluate("window.scrollY")
        log_check("Platform Scroll", "Card click triggers scroll to courses", 
                  final_scroll > 1000, f"Final scroll position: {final_scroll}px")
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-platform-scroll.png")

    except Exception as e:
        print(f"❌ Error encountered: {e}")
    finally:
        browser.close()

print("\n" + "=" * 70)
print("📊 FINAL VERIFICATION REPORT SUMMARY")
print("=" * 70)
for res in verification_results:
    print(f"{res['status']} | {res['item']} | {res['description']}")
print("=" * 70)
