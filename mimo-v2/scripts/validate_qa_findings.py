#!/usr/bin/env python3
"""
QA Findings Validation Script
Validates the 11 non-functional elements from QA_findings_4.md
"""

from playwright.sync_api import sync_playwright, expect
import os
import json
from datetime import datetime

BASE_URL = "http://localhost:5174"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/qa-validation"
RESULTS_FILE = "/home/project/iTrust-Academy/mimo-v2/qa-validation-results.json"


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def log_result(test_id, element, expected, actual, status, details=""):
    return {
        "test_id": test_id,
        "element": element,
        "expected": expected,
        "actual": actual,
        "status": status,
        "details": details,
        "timestamp": datetime.now().isoformat(),
    }


def main():
    ensure_dir(SCREENSHOT_DIR)
    results = []

    print("=" * 80)
    print("🧪 QA FINDINGS VALIDATION SUITE")
    print("=" * 80)
    print(f"Target URL: {BASE_URL}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # Navigate to site
        print("\n📍 Phase 1: Page Load")
        print("-" * 40)
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        # Take baseline screenshot
        page.screenshot(path=f"{SCREENSHOT_DIR}/00-baseline-homepage.png")
        print("✅ Homepage loaded successfully")

        # ============================================================
        # PHASE 2: Primary CTAs Validation
        # ============================================================
        print("\n📍 Phase 2: Primary CTAs")
        print("-" * 40)

        # CTA-01: EXPLORE SCP FUNDAMENTALS
        print("\n  Testing CTA-01: EXPLORE SCP FUNDAMENTALS...")
        explore_btn = page.locator('button:has-text("Explore SCP Fundamentals")')
        if explore_btn.count() > 0:
            explore_btn.first.click()
            page.wait_for_timeout(500)
            url_after = page.url
            scroll_y = page.evaluate("() => window.scrollY")

            screenshot_path = f"{SCREENSHOT_DIR}/cta-01-explore-scp.png"
            page.screenshot(path=screenshot_path)

            if scroll_y > 100:
                results.append(
                    log_result(
                        "CTA-01",
                        "EXPLORE SCP FUNDAMENTALS",
                        "Navigate/modal",
                        f"Scrolled to {scroll_y}px",
                        "PASS",
                        "Button scrolls to courses section",
                    )
                )
                print("    ✅ WORKS - Scrolled to courses section")
            else:
                results.append(
                    log_result(
                        "CTA-01",
                        "EXPLORE SCP FUNDAMENTALS",
                        "Navigate/modal",
                        "No visible action",
                        "FAIL",
                        "Button does not scroll or open modal",
                    )
                )
                print("    ❌ FAIL - No visible action")
        else:
            results.append(
                log_result(
                    "CTA-01",
                    "EXPLORE SCP FUNDAMENTALS",
                    "Navigate/modal",
                    "Button not found",
                    "FAIL",
                    "Element not found on page",
                )
            )
            print("    ❌ FAIL - Button not found")

        # Reset scroll
        page.evaluate("() => window.scrollTo(0, 0)")
        page.wait_for_timeout(500)

        # CTA-02 to CTA-05: ENROLL NOW buttons
        print("\n  Testing CTA-02 to CTA-05: ENROLL NOW buttons...")
        enroll_buttons = page.locator("text=ENROLL NOW")
        count = enroll_buttons.count()
        print(f"    Found {count} ENROLL NOW buttons")

        for i in range(min(count, 4)):
            test_id = f"CTA-{2 + i:02d}"
            print(f"\n    Testing ENROLL NOW button {i + 1}...")

            # Scroll to make button visible
            button = enroll_buttons.nth(i)
            button.scroll_into_view_if_needed()
            page.wait_for_timeout(300)

            # Click the button
            button.click()
            page.wait_for_timeout(800)

            # Check for login modal
            modal_visible = page.locator("text=Welcome Back").is_visible()
            toast_visible = page.locator("text=Please sign in").is_visible()

            screenshot_path = f"{SCREENSHOT_DIR}/cta-{2 + i:02d}-enroll-now-{i + 1}.png"
            page.screenshot(path=screenshot_path)

            if modal_visible or toast_visible:
                results.append(
                    log_result(
                        test_id,
                        f"ENROLL NOW (button {i + 1})",
                        "Open enrollment/login modal",
                        "Login modal or toast shown",
                        "PASS",
                        "Action interception working",
                    )
                )
                print(f"    ✅ WORKS - Triggers login modal/toast")
            else:
                results.append(
                    log_result(
                        test_id,
                        f"ENROLL NOW (button {i + 1})",
                        "Open enrollment/login modal",
                        "No visible action",
                        "FAIL",
                        "No modal or feedback shown",
                    )
                )
                print(f"    ❌ FAIL - No visible action")

            # Close modal if open
            try:
                page.keyboard.press("Escape")
                page.wait_for_timeout(300)
            except:
                pass

        # ============================================================
        # PHASE 3: Platform Cards Validation
        # ============================================================
        print("\n📍 Phase 3: Platform Cards")
        print("-" * 40)

        platform_cards = ["SolarWinds", "Securden", "Quest", "Ivanti"]
        for i, platform in enumerate(platform_cards, 1):
            test_id = f"PC-{i:02d}"
            print(f"\n  Testing {test_id}: {platform} card...")

            # Find platform card
            card = page.locator(f"text={platform}").first
            if card.is_visible():
                # Check if card is clickable (has href or onClick)
                card_parent = card.locator("..")
                tag_name = card_parent.evaluate("el => el.tagName")
                has_href = card_parent.evaluate("el => el.hasAttribute('href')")

                card.click()
                page.wait_for_timeout(500)
                url_after = page.url

                screenshot_path = (
                    f"{SCREENSHOT_DIR}/{test_id}-{platform.lower()}-card.png"
                )
                page.screenshot(path=screenshot_path)

                if url_after != BASE_URL + "/":
                    results.append(
                        log_result(
                            test_id,
                            f"{platform} card",
                            "Navigate to course listings",
                            f"Navigated to {url_after}",
                            "PASS",
                            "Card navigates to platform page",
                        )
                    )
                    print(f"    ✅ WORKS - Card navigates")
                    page.goto(BASE_URL)
                    page.wait_for_timeout(500)
                else:
                    results.append(
                        log_result(
                            test_id,
                            f"{platform} card",
                            "Navigate to course listings",
                            "No action",
                            "FAIL",
                            "Card does not navigate",
                        )
                    )
                    print(f"    ❌ FAIL - Card does not navigate")
            else:
                results.append(
                    log_result(
                        test_id,
                        f"{platform} card",
                        "Navigate to course listings",
                        "Card not visible",
                        "FAIL",
                        "Element not found",
                    )
                )
                print(f"    ❌ FAIL - Card not visible")

        # ============================================================
        # PHASE 4: Footer CTAs Validation
        # ============================================================
        print("\n📍 Phase 4: Footer CTAs")
        print("-" * 40)

        # Scroll to footer
        page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(1000)

        footer_ctas = [
            ("CTA-06", "SCHEDULE CONSULTATION"),
            ("CTA-07", "REQUEST CORPORATE DEMO"),
            ("CTA-08", "CONTACT SALES"),
        ]

        for test_id, cta_text in footer_ctas:
            print(f"\n  Testing {test_id}: {cta_text}...")

            cta_btn = page.locator(f'button:has-text("{cta_text}")')
            if cta_btn.count() > 0:
                cta_btn.first.click()
                page.wait_for_timeout(800)

                # Check for modal or navigation
                modal_visible = page.locator('[role="dialog"]').is_visible()
                url_changed = page.url != BASE_URL + "/"

                screenshot_path = f"{SCREENSHOT_DIR}/{test_id}-{cta_text.lower().replace(' ', '-')}.png"
                page.screenshot(path=screenshot_path)

                if modal_visible or url_changed:
                    results.append(
                        log_result(
                            test_id,
                            cta_text,
                            "Open form/modal",
                            "Modal shown or navigation occurred",
                            "PASS",
                            "CTA triggers expected action",
                        )
                    )
                    print(f"    ✅ WORKS - Triggers modal/navigation")
                else:
                    results.append(
                        log_result(
                            test_id,
                            cta_text,
                            "Open form/modal",
                            "No visible action",
                            "FAIL",
                            "CTA does nothing",
                        )
                    )
                    print(f"    ❌ FAIL - No visible action")

                # Close any modal
                try:
                    page.keyboard.press("Escape")
                    page.wait_for_timeout(300)
                except:
                    pass
            else:
                results.append(
                    log_result(
                        test_id,
                        cta_text,
                        "Open form/modal",
                        "Button not found",
                        "FAIL",
                        "Element not found on page",
                    )
                )
                print(f"    ❌ FAIL - Button not found")

        # ============================================================
        # PHASE 5: Footer Links Validation
        # ============================================================
        print("\n📍 Phase 5: Footer Links")
        print("-" * 40)

        footer_links = [
            ("FL-01", "About Us"),
            ("FL-02", "Careers"),
            ("FL-03", "Partners"),
            ("FL-04", "Blog"),
            ("FL-05", "Documentation"),
            ("FL-06", "FAQ"),
        ]

        for test_id, link_text in footer_links:
            print(f"\n  Testing {test_id}: {link_text}...")

            link = page.locator(f'a:has-text("{link_text}")').first
            if link.is_visible():
                # Check if link has href
                has_href = link.evaluate("el => el.hasAttribute('href')")
                href_value = (
                    link.evaluate("el => el.getAttribute('href')") if has_href else None
                )

                if (
                    has_href
                    and href_value
                    and href_value not in ["#", "", "javascript:void(0)"]
                ):
                    results.append(
                        log_result(
                            test_id,
                            link_text,
                            "Navigate to page",
                            f"Has href: {href_value}",
                            "PASS",
                            "Link properly configured",
                        )
                    )
                    print(f"    ✅ WORKS - Link has proper href")
                else:
                    results.append(
                        log_result(
                            test_id,
                            link_text,
                            "Navigate to page",
                            f"Invalid href: {href_value}",
                            "FAIL",
                            "Link has no valid href",
                        )
                    )
                    print(f"    ❌ FAIL - Link has no valid href")
            else:
                results.append(
                    log_result(
                        test_id,
                        link_text,
                        "Navigate to page",
                        "Link not visible",
                        "FAIL",
                        "Element not found",
                    )
                )
                print(f"    ❌ FAIL - Link not visible")

        # ============================================================
        # PHASE 6: Social Links Validation
        # ============================================================
        print("\n📍 Phase 6: Social Links")
        print("-" * 40)

        social_links = [
            ("SL-01", "LinkedIn"),
            ("SL-02", "Twitter"),
            ("SL-03", "YouTube"),
        ]

        for test_id, social_name in social_links:
            print(f"\n  Testing {test_id}: {social_name}...")

            # Look for social link by aria-label or title
            social_link = page.locator(
                f'a[aria-label*="{social_name}"], a[title*="{social_name}"]'
            ).first

            if not social_link.is_visible():
                # Try to find by common patterns
                social_link = page.locator(
                    f'a[href*="{social_name.lower()}.com"]'
                ).first

            if social_link.is_visible():
                has_target = social_link.evaluate("el => el.hasAttribute('target')")
                target_value = (
                    social_link.evaluate("el => el.getAttribute('target')")
                    if has_target
                    else None
                )
                href = social_link.evaluate("el => el.getAttribute('href')")

                screenshot_path = (
                    f"{SCREENSHOT_DIR}/{test_id}-{social_name.lower()}-link.png"
                )
                social_link.screenshot(path=screenshot_path)

                if has_target and target_value == "_blank" and href and "http" in href:
                    results.append(
                        log_result(
                            test_id,
                            social_name,
                            "Open external in new tab",
                            f"target='_blank', href={href}",
                            "PASS",
                            "Social link properly configured",
                        )
                    )
                    print(f"    ✅ WORKS - Opens in new tab")
                else:
                    results.append(
                        log_result(
                            test_id,
                            social_name,
                            "Open external in new tab",
                            f"Missing target='_blank' or invalid href",
                            "FAIL",
                            "Social link not properly configured",
                        )
                    )
                    print(f"    ❌ FAIL - Not opening in new tab")
            else:
                results.append(
                    log_result(
                        test_id,
                        social_name,
                        "Open external in new tab",
                        "Link not found",
                        "FAIL",
                        "Social link element not found",
                    )
                )
                print(f"    ❌ FAIL - Link not found")

        browser.close()

    # ============================================================
    # Generate Report
    # ============================================================
    print("\n" + "=" * 80)
    print("📊 VALIDATION RESULTS SUMMARY")
    print("=" * 80)

    passed = sum(1 for r in results if r["status"] == "PASS")
    failed = sum(1 for r in results if r["status"] == "FAIL")

    print(f"\nTotal Tests: {len(results)}")
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"Success Rate: {passed / len(results) * 100:.1f}%")

    print("\n" + "-" * 80)
    print("FAILED ITEMS (Require Remediation):")
    print("-" * 80)

    for r in results:
        if r["status"] == "FAIL":
            print(f"\n  ❌ {r['test_id']}: {r['element']}")
            print(f"     Expected: {r['expected']}")
            print(f"     Actual: {r['actual']}")
            print(f"     Details: {r['details']}")

    print("\n" + "-" * 80)
    print("PASSED ITEMS:")
    print("-" * 80)

    for r in results:
        if r["status"] == "PASS":
            print(f"  ✅ {r['test_id']}: {r['element']} - {r['details']}")

    # Save results to JSON
    with open(RESULTS_FILE, "w") as f:
        json.dump(
            {
                "validation_date": datetime.now().isoformat(),
                "target_url": BASE_URL,
                "summary": {
                    "total": len(results),
                    "passed": passed,
                    "failed": failed,
                    "success_rate": f"{passed / len(results) * 100:.1f}%",
                },
                "results": results,
            },
            f,
            indent=2,
        )

    print(f"\n📁 Results saved to: {RESULTS_FILE}")
    print(f"📸 Screenshots saved to: {SCREENSHOT_DIR}")
    print("=" * 80)


if __name__ == "__main__":
    main()
