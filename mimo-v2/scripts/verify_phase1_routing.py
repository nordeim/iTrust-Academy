#!/usr/bin/env python3
"""
Phase 1 Verification Script: Multi-Page Routing
Tests all new routes and navigation functionality
"""

from playwright.sync_api import sync_playwright
import os
from datetime import datetime

BASE_URL = "http://localhost:5174"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/phase1-verification"


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def test_routes():
    ensure_dir(SCREENSHOT_DIR)
    results = []

    print("=" * 70)
    print("🧪 PHASE 1 VERIFICATION: Multi-Page Routing")
    print("=" * 70)
    print(f"Target URL: {BASE_URL}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Test 1: Home page loads
        print("\n📍 Test 1: Home page loads")
        print("-" * 50)
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        hero_visible = page.locator("text=Advance Your IT Career").is_visible()
        status = "✅" if hero_visible else "❌"
        print(f"  {status} Hero section visible: {hero_visible}")
        results.append(("Home page loads", hero_visible))
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-home.png")

        # Test 2: Navigate to About page
        print("\n📍 Test 2: Navigate to About page")
        print("-" * 50)
        about_link = page.locator('a[href="/about"]').first
        if about_link.is_visible():
            about_link.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            about_title = page.locator("text=About iTrust Academy").is_visible()
            status = "✅" if about_title else "❌"
            print(f"  {status} About page title visible: {about_title}")
            results.append(("About page loads", about_title))
            page.screenshot(path=f"{SCREENSHOT_DIR}/02-about.png")
        else:
            print("  ❌ About link not found")
            results.append(("About link exists", False))

        # Test 3: Navigate to FAQ page
        print("\n📍 Test 3: Navigate to FAQ page")
        print("-" * 50)
        page.goto(f"{BASE_URL}/faq")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

        faq_title = page.locator("text=Frequently Asked Questions").is_visible()
        status = "✅" if faq_title else "❌"
        print(f"  {status} FAQ page title visible: {faq_title}")
        results.append(("FAQ page loads", faq_title))
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-faq.png")

        # Test 4: Navigate to Privacy page
        print("\n📍 Test 4: Navigate to Privacy page")
        print("-" * 50)
        page.goto(f"{BASE_URL}/privacy")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

        privacy_title = page.get_by_role("heading", name="Privacy Policy").is_visible()
        status = "✅" if privacy_title else "❌"
        print(f"  {status} Privacy page title visible: {privacy_title}")
        results.append(("Privacy page loads", privacy_title))
        page.screenshot(path=f"{SCREENSHOT_DIR}/04-privacy.png")

        # Test 5: Navigate to Terms page
        print("\n📍 Test 5: Navigate to Terms page")
        print("-" * 50)
        page.goto(f"{BASE_URL}/terms")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

        terms_title = page.get_by_role("heading", name="Terms of Service").is_visible()
        status = "✅" if terms_title else "❌"
        print(f"  {status} Terms page title visible: {terms_title}")
        results.append(("Terms page loads", terms_title))
        page.screenshot(path=f"{SCREENSHOT_DIR}/05-terms.png")

        # Test 6: Course detail page
        print("\n📍 Test 6: Course detail page")
        print("-" * 50)
        page.goto(f"{BASE_URL}/courses/solarwinds-network-performance-monitor")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

        course_title = page.locator(
            "text=SolarWinds Network Performance Monitor"
        ).is_visible()
        enroll_btn = page.locator("text=Enroll Now").is_visible()
        status = "✅" if (course_title and enroll_btn) else "❌"
        print(f"  {status} Course title visible: {course_title}")
        print(f"  {status} Enroll button visible: {enroll_btn}")
        results.append(("Course detail page loads", course_title and enroll_btn))
        page.screenshot(path=f"{SCREENSHOT_DIR}/06-course-detail.png")

        # Test 7: Dashboard page (requires auth)
        print("\n📍 Test 7: Dashboard page")
        print("-" * 50)
        page.goto(f"{BASE_URL}/dashboard")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(500)

        # Dashboard should show login prompt for unauthenticated users
        login_prompt = page.locator("text=Please Sign In").is_visible()
        status = "✅" if login_prompt else "❌"
        print(f"  {status} Dashboard shows login prompt: {login_prompt}")
        results.append(("Dashboard page loads", login_prompt))
        page.screenshot(path=f"{SCREENSHOT_DIR}/07-dashboard.png")

        # Test 8: Course card navigation
        print("\n📍 Test 8: Course card navigation")
        print("-" * 50)
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        # Scroll to course catalog
        page.evaluate("() => document.getElementById('courses')?.scrollIntoView()")
        page.wait_for_timeout(1000)

        # Find course cards - they should be links to /courses/ pages
        course_links = page.locator('a[href*="/courses/"]')
        count = course_links.count()
        print(f"  Found {count} course links")

        if count > 0:
            # Click first course link
            course_links.first.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            # Check if we're on a course detail page
            is_course_page = "/courses/" in page.url
            status = "✅" if is_course_page else "❌"
            print(f"  {status} Navigated to course detail: {is_course_page}")
            print(f"  Current URL: {page.url}")
            results.append(("Course card navigation works", is_course_page))
            page.screenshot(path=f"{SCREENSHOT_DIR}/08-course-card-nav.png")
        else:
            print("  ❌ No course cards found")
            results.append(("Course card exists", False))

        # Test 9: Logo navigation back to home
        print("\n📍 Test 9: Logo navigation to home")
        print("-" * 50)
        logo = page.locator("header a").first
        if logo.is_visible():
            logo.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            is_home = page.url == BASE_URL + "/" or page.url == BASE_URL
            status = "✅" if is_home else "❌"
            print(f"  {status} Logo navigates to home: {is_home}")
            results.append(("Logo navigation works", is_home))
        else:
            print("  ❌ Logo not found")
            results.append(("Logo exists", False))

        browser.close()

    # Summary
    print("\n" + "=" * 70)
    print("📊 PHASE 1 VERIFICATION RESULTS")
    print("=" * 70)

    passed = sum(1 for _, status in results if status)
    total = len(results)

    print(f"\nPassed: {passed}/{total} ({passed / total * 100:.1f}%)")

    print("\nDetailed Results:")
    for test_name, status in results:
        icon = "✅" if status else "❌"
        print(f"  {icon} {test_name}")

    if passed == total:
        print("\n🎉 ALL PHASE 1 TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️ {total - passed} TEST(S) FAILED")
        return 1


if __name__ == "__main__":
    exit(test_routes())
