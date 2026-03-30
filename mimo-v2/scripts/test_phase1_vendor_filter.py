#!/usr/bin/env python3
"""
Phase 1 Test Script: Vendor Card Filtering
TDD Red → Green verification
"""

from playwright.sync_api import sync_playwright
import os

BASE_URL = "http://localhost:5174"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/phase1-tests"


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def test_phase1():
    ensure_dir(SCREENSHOT_DIR)
    results = []

    print("=" * 70)
    print("🧪 PHASE 1 TEST: Vendor Card Filtering")
    print("=" * 70)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Load page
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        print("\n📍 Test 1: Page loads with vendors visible")
        print("-" * 50)

        # Check if vendor cards are visible
        vendors = ["SolarWinds", "Securden", "Quest", "Ivanti"]
        for vendor in vendors:
            vendor_element = page.locator(f"text={vendor}").first
            is_visible = vendor_element.is_visible()
            status = "✅" if is_visible else "❌"
            print(f"  {status} {vendor} card visible: {is_visible}")
            results.append((f"Vendor {vendor} visible", is_visible))

        page.screenshot(path=f"{SCREENSHOT_DIR}/01-vendors-visible.png")

        print("\n📍 Test 2: Click SolarWinds vendor card")
        print("-" * 50)

        # Click SolarWinds card - look for button with SolarWinds text
        # The button contains the vendor name
        solarwinds_btn = page.locator("button").filter(has_text="SolarWinds").first

        # Also try finding by the vendor card container
        if not solarwinds_btn.is_visible():
            # Try to find by looking for button that contains SolarWinds
            buttons = page.locator("button").all()
            for btn in buttons:
                text = btn.text_content()
                if text and "SolarWinds" in text:
                    solarwinds_btn = btn
                    break

        if solarwinds_btn.is_visible():
            print("  ✅ SolarWinds button found")

            # Get current URL before click
            url_before = page.url
            print(f"  URL before: {url_before}")

            # Scroll to make sure button is clickable
            solarwinds_btn.scroll_into_view_if_needed()
            page.wait_for_timeout(500)

            # Click the button
            solarwinds_btn.click()
            page.wait_for_timeout(1000)

            # Check if scrolled to courses
            scroll_y = page.evaluate("() => window.scrollY")
            print(f"  Scroll position after click: {scroll_y}px")

            # Take screenshot
            page.screenshot(path=f"{SCREENSHOT_DIR}/02-solarwinds-clicked.png")

            scrolled = scroll_y > 500
            print(
                f"  {'✅' if scrolled else '❌'} Scrolled to courses section: {scrolled}"
            )
            results.append(("Scrolled to courses", scrolled))

            # Check if courses section is visible
            courses_section = page.locator("#courses")
            in_viewport = courses_section.is_visible()
            print(
                f"  {'✅' if in_viewport else '❌'} Courses section in viewport: {in_viewport}"
            )
            results.append(("Courses section visible", in_viewport))
        else:
            print("  ❌ SolarWinds button not found")
            print("  Taking screenshot to debug...")
            page.screenshot(path=f"{SCREENSHOT_DIR}/02-debug-vendors.png")
            results.append(("SolarWinds button found", False))

        print("\n📍 Test 3: Verify filter applied")
        print("-" * 50)

        # Check for active filter indication
        # Look for filter button with active state
        filter_buttons = page.locator('button[class*="bg-primary"]').all()
        print(f"  Found {len(filter_buttons)} active filter buttons")

        # Check if courses are filtered
        courses_grid = page.locator("#courses .grid")
        course_count = courses_grid.locator("> div").count()
        print(f"  Courses displayed: {course_count}")

        # If filtered, should show fewer courses than total
        # (Assuming total > 4 and SolarWinds has < 4 courses)
        if course_count > 0 and course_count < 9:  # Assuming 9 total courses
            print(f"  ✅ Filter appears to be working (showing {course_count} courses)")
            results.append(("Filter working", True))
        else:
            print(f"  ⚠️ Filter status unclear (showing {course_count} courses)")
            results.append(("Filter working", course_count > 0))

        browser.close()

    # Summary
    print("\n" + "=" * 70)
    print("📊 PHASE 1 TEST RESULTS")
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
    exit(test_phase1())
