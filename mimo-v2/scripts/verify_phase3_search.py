#!/usr/bin/env python3
"""
Phase 3 Verification Script: Search Functionality
Tests search input and filtering functionality
"""

from playwright.sync_api import sync_playwright
import os
from datetime import datetime

BASE_URL = "http://localhost:5174"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/phase3-verification"


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def test_search():
    ensure_dir(SCREENSHOT_DIR)
    results = []

    print("=" * 70)
    print("🧪 PHASE 3 VERIFICATION: Search Functionality")
    print("=" * 70)
    print(f"Target URL: {BASE_URL}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Go to home page
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # Scroll to courses section
        page.evaluate("() => document.getElementById('courses')?.scrollIntoView()")
        page.wait_for_timeout(1000)

        # Test 1: Search input is visible
        print("\n📍 Test 1: Search input is visible")
        print("-" * 50)

        search_input = page.locator('input[placeholder="Search courses..."]')
        search_visible = search_input.is_visible()
        status = "✅" if search_visible else "❌"
        print(f"  {status} Search input visible: {search_visible}")
        results.append(("Search input visible", search_visible))
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-search-input.png")

        # Test 2: Type search query
        print("\n📍 Test 2: Type search query")
        print("-" * 50)

        if search_visible:
            search_input.fill("SolarWinds")
            page.wait_for_timeout(500)  # Wait for debounce

            # Check if results are filtered
            result_count = page.locator("text=Showing").first
            has_results = result_count.is_visible()
            status = "✅" if has_results else "❌"
            print(f"  {status} Search results count visible: {has_results}")
            results.append(("Search results count", has_results))
            page.screenshot(path=f"{SCREENSHOT_DIR}/02-search-results.png")
        else:
            print("  ❌ Cannot test - search input not visible")
            results.append(("Search results count", False))

        # Test 3: Clear search button
        print("\n📍 Test 3: Clear search button")
        print("-" * 50)

        clear_button = page.locator('button[aria-label="Clear search"]')
        clear_visible = clear_button.is_visible()
        status = "✅" if clear_visible else "❌"
        print(f"  {status} Clear search button visible: {clear_visible}")
        results.append(("Clear search button", clear_visible))

        if clear_visible:
            clear_button.click()
            page.wait_for_timeout(500)

            # Verify search is cleared
            search_value = search_input.input_value()
            is_cleared = search_value == ""
            status = "✅" if is_cleared else "❌"
            print(f"  {status} Search cleared: {is_cleared}")
            results.append(("Search clears correctly", is_cleared))

        # Test 4: No results state
        print("\n📍 Test 4: No results state")
        print("-" * 50)

        search_input.fill("xyznonexistentcourse")
        page.wait_for_timeout(500)

        no_results_msg = page.locator("text=No courses found").first
        has_no_results = no_results_msg.is_visible()
        status = "✅" if has_no_results else "❌"
        print(f"  {status} No results message visible: {has_no_results}")
        results.append(("No results state", has_no_results))
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-no-results.png")

        # Test 5: Search works with category filter
        print("\n📍 Test 5: Search with category filter")
        print("-" * 50)

        # Clear search
        clear_button = page.locator('button[aria-label="Clear search"]')
        if clear_button.is_visible():
            clear_button.click()
            page.wait_for_timeout(300)

        # Click a category filter
        security_btn = page.locator('button:has-text("Security")')
        if security_btn.is_visible():
            security_btn.click()
            page.wait_for_timeout(500)

            # Now search within that category
            search_input.fill("Manager")
            page.wait_for_timeout(500)

            # Should show filtered results
            combined_filter = page.locator("text=Showing").first.is_visible()
            status = "✅" if combined_filter else "❌"
            print(f"  {status} Search + category filter works: {combined_filter}")
            results.append(("Search with category filter", combined_filter))
            page.screenshot(path=f"{SCREENSHOT_DIR}/04-combined-filter.png")
        else:
            print("  ❌ Category filter button not found")
            results.append(("Search with category filter", False))

        browser.close()

    # Summary
    print("\n" + "=" * 70)
    print("📊 PHASE 3 VERIFICATION RESULTS")
    print("=" * 70)

    passed = sum(1 for _, status in results if status)
    total = len(results)

    print(f"\nPassed: {passed}/{total} ({passed / total * 100:.1f}%)")

    print("\nDetailed Results:")
    for test_name, status in results:
        icon = "✅" if status else "❌"
        print(f"  {icon} {test_name}")

    if passed == total:
        print("\n🎉 ALL PHASE 3 TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️ {total - passed} TEST(S) FAILED")
        return 1


if __name__ == "__main__":
    exit(test_search())
