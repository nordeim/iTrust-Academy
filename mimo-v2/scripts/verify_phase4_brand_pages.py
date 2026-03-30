#!/usr/bin/env python3
"""
Phase 4 Verification Script: Brand Authority Pages
Tests all brand authority pages and footer links
"""

from playwright.sync_api import sync_playwright
import os
from datetime import datetime

BASE_URL = "http://localhost:5174"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/phase4-verification"


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def test_brand_pages():
    ensure_dir(SCREENSHOT_DIR)
    results = []

    print("=" * 70)
    print("🧪 PHASE 4 VERIFICATION: Brand Authority Pages")
    print("=" * 70)
    print(f"Target URL: {BASE_URL}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Test 1: About page loads
        print("\n📍 Test 1: About page loads")
        print("-" * 50)
        page.goto(f"{BASE_URL}/about")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        about_title = page.get_by_role(
            "heading", name="About iTrust Academy"
        ).is_visible()
        status = "✅" if about_title else "❌"
        print(f"  {status} About page title visible: {about_title}")
        results.append(("About page loads", about_title))
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-about-page.png")

        # Test 2: FAQ page loads
        print("\n📍 Test 2: FAQ page loads")
        print("-" * 50)
        page.goto(f"{BASE_URL}/faq")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        faq_title = page.get_by_role(
            "heading", name="Frequently Asked Questions"
        ).is_visible()
        status = "✅" if faq_title else "❌"
        print(f"  {status} FAQ page title visible: {faq_title}")
        results.append(("FAQ page loads", faq_title))
        page.screenshot(path=f"{SCREENSHOT_DIR}/02-faq-page.png")

        # Test 3: Privacy page loads
        print("\n📍 Test 3: Privacy page loads")
        print("-" * 50)
        page.goto(f"{BASE_URL}/privacy")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        privacy_title = page.get_by_role("heading", name="Privacy Policy").is_visible()
        status = "✅" if privacy_title else "❌"
        print(f"  {status} Privacy page title visible: {privacy_title}")
        results.append(("Privacy page loads", privacy_title))
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-privacy-page.png")

        # Test 4: Terms page loads
        print("\n📍 Test 4: Terms page loads")
        print("-" * 50)
        page.goto(f"{BASE_URL}/terms")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        terms_title = page.get_by_role("heading", name="Terms of Service").is_visible()
        status = "✅" if terms_title else "❌"
        print(f"  {status} Terms page title visible: {terms_title}")
        results.append(("Terms page loads", terms_title))
        page.screenshot(path=f"{SCREENSHOT_DIR}/04-terms-page.png")

        # Test 5: Footer links work
        print("\n📍 Test 5: Footer links work")
        print("-" * 50)

        # Go to home page
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        # Scroll to footer
        page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500)

        # Click About Us link
        about_link = page.locator('a[href="/about"]').first
        if about_link.is_visible():
            about_link.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            is_about = "/about" in page.url
            status = "✅" if is_about else "❌"
            print(f"  {status} About Us link works: {is_about}")
            results.append(("Footer About link works", is_about))
        else:
            print("  ❌ About Us link not found")
            results.append(("Footer About link works", False))

        # Go back to home and test FAQ link
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)
        page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500)

        faq_link = page.locator('a[href="/faq"]').first
        if faq_link.is_visible():
            faq_link.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            is_faq = "/faq" in page.url
            status = "✅" if is_faq else "❌"
            print(f"  {status} FAQ link works: {is_faq}")
            results.append(("Footer FAQ link works", is_faq))
        else:
            print("  ❌ FAQ link not found")
            results.append(("Footer FAQ link works", False))

        # Test 6: Privacy and Terms links in footer
        print("\n📍 Test 6: Privacy and Terms links")
        print("-" * 50)

        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)
        page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500)

        privacy_link = page.locator('a[href="/privacy"]').first
        terms_link = page.locator('a[href="/terms"]').first

        privacy_visible = privacy_link.is_visible()
        terms_visible = terms_link.is_visible()

        status = "✅" if (privacy_visible and terms_visible) else "❌"
        print(f"  {status} Privacy link visible: {privacy_visible}")
        print(f"  {status} Terms link visible: {terms_visible}")
        results.append(
            ("Privacy and Terms links visible", privacy_visible and terms_visible)
        )

        # Click Privacy link
        if privacy_visible:
            privacy_link.click()
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(500)

            is_privacy = "/privacy" in page.url
            status = "✅" if is_privacy else "❌"
            print(f"  {status} Privacy link navigates: {is_privacy}")
            results.append(("Privacy link navigates", is_privacy))

        browser.close()

    # Summary
    print("\n" + "=" * 70)
    print("📊 PHASE 4 VERIFICATION RESULTS")
    print("=" * 70)

    passed = sum(1 for _, status in results if status)
    total = len(results)

    print(f"\nPassed: {passed}/{total} ({passed / total * 100:.1f}%)")

    print("\nDetailed Results:")
    for test_name, status in results:
        icon = "✅" if status else "❌"
        print(f"  {icon} {test_name}")

    if passed == total:
        print("\n🎉 ALL PHASE 4 TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️ {total - passed} TEST(S) FAILED")
        return 1


if __name__ == "__main__":
    exit(test_brand_pages())
