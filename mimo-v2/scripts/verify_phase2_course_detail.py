#!/usr/bin/env python3
"""
Phase 2 Verification Script: Course Detail Enhancement
Tests all new course detail page features
"""

from playwright.sync_api import sync_playwright
import os
from datetime import datetime

BASE_URL = "http://localhost:5174"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/phase2-verification"


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def test_course_detail():
    ensure_dir(SCREENSHOT_DIR)
    results = []

    print("=" * 70)
    print("🧪 PHASE 2 VERIFICATION: Course Detail Enhancement")
    print("=" * 70)
    print(f"Target URL: {BASE_URL}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Test 1: Course detail page loads
        print("\n📍 Test 1: Course detail page loads")
        print("-" * 50)
        page.goto(f"{BASE_URL}/courses/solarwinds-network-performance-monitor")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        course_title = page.get_by_role(
            "heading", name="SolarWinds Network Performance Monitor"
        ).is_visible()
        status = "✅" if course_title else "❌"
        print(f"  {status} Course title visible: {course_title}")
        results.append(("Course detail loads", course_title))
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-course-detail.png")

        # Test 2: Tab navigation
        print("\n📍 Test 2: Tab navigation")
        print("-" * 50)

        # Check Overview tab is active by default
        overview_content = page.locator("text=Course Description").is_visible()
        status = "✅" if overview_content else "❌"
        print(f"  {status} Overview tab content visible: {overview_content}")
        results.append(("Overview tab active", overview_content))

        # Click Curriculum tab
        curriculum_tab = page.get_by_role("tab", name="Curriculum")
        if curriculum_tab.is_visible():
            curriculum_tab.click()
            page.wait_for_timeout(500)

            curriculum_content = page.locator("text=Course Curriculum").is_visible()
            status = "✅" if curriculum_content else "❌"
            print(f"  {status} Curriculum tab content visible: {curriculum_content}")
            results.append(("Curriculum tab works", curriculum_content))
            page.screenshot(path=f"{SCREENSHOT_DIR}/02-curriculum-tab.png")
        else:
            print("  ❌ Curriculum tab not found")
            results.append(("Curriculum tab exists", False))

        # Click Instructor tab
        instructor_tab = page.get_by_role("tab", name="Instructor")
        if instructor_tab.is_visible():
            instructor_tab.click()
            page.wait_for_timeout(500)

            instructor_content = page.locator("text=Meet Your Instructor").is_visible()
            status = "✅" if instructor_content else "❌"
            print(f"  {status} Instructor tab content visible: {instructor_content}")
            results.append(("Instructor tab works", instructor_content))
            page.screenshot(path=f"{SCREENSHOT_DIR}/03-instructor-tab.png")
        else:
            print("  ❌ Instructor tab not found")
            results.append(("Instructor tab exists", False))

        # Click Certification tab
        certification_tab = page.get_by_role("tab", name="Certification")
        if certification_tab.is_visible():
            certification_tab.click()
            page.wait_for_timeout(500)

            certification_content = page.locator("text=Certification Path").is_visible()
            status = "✅" if certification_content else "❌"
            print(
                f"  {status} Certification tab content visible: {certification_content}"
            )
            results.append(("Certification tab works", certification_content))
            page.screenshot(path=f"{SCREENSHOT_DIR}/04-certification-tab.png")
        else:
            print("  ❌ Certification tab not found")
            results.append(("Certification tab exists", False))

        # Test 3: Curriculum modules expand
        print("\n📍 Test 3: Curriculum modules expand")
        print("-" * 50)

        # Go back to Curriculum tab
        curriculum_tab = page.get_by_role("tab", name="Curriculum")
        if curriculum_tab.is_visible():
            curriculum_tab.click()
            page.wait_for_timeout(500)

        # Click first module to expand
        module_button = page.locator(
            "button:has-text('Introduction to Network Monitoring')"
        ).first
        if module_button.is_visible():
            module_button.click()
            page.wait_for_timeout(500)

            # Check if topics are visible
            topics_visible = page.locator("text=NPM architecture").is_visible()
            status = "✅" if topics_visible else "❌"
            print(f"  {status} Module topics expand: {topics_visible}")
            results.append(("Module expansion works", topics_visible))
            page.screenshot(path=f"{SCREENSHOT_DIR}/05-module-expanded.png")
        else:
            print("  ❌ Module button not found")
            results.append(("Module button exists", False))

        # Test 4: Related courses section
        print("\n📍 Test 4: Related courses section")
        print("-" * 50)

        # Scroll to bottom of page
        page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(1000)

        related_courses = page.locator("text=Related Courses").is_visible()
        status = "✅" if related_courses else "❌"
        print(f"  {status} Related courses section visible: {related_courses}")
        results.append(("Related courses section", related_courses))
        page.screenshot(path=f"{SCREENSHOT_DIR}/06-related-courses.png")

        # Test 5: Enroll Now button
        print("\n📍 Test 5: Enroll Now button")
        print("-" * 50)

        enroll_btn = page.get_by_role("button", name="Enroll Now").first
        if enroll_btn.is_visible():
            status = "✅"
            print(f"  {status} Enroll Now button visible: True")
            results.append(("Enroll Now button", True))
        else:
            status = "❌"
            print(f"  {status} Enroll Now button not found")
            results.append(("Enroll Now button", False))

        # Test 6: Breadcrumb navigation
        print("\n📍 Test 6: Breadcrumb navigation")
        print("-" * 50)

        back_link = page.locator("text=Back to Courses").is_visible()
        status = "✅" if back_link else "❌"
        print(f"  {status} Back to Courses link visible: {back_link}")
        results.append(("Breadcrumb navigation", back_link))

        browser.close()

    # Summary
    print("\n" + "=" * 70)
    print("📊 PHASE 2 VERIFICATION RESULTS")
    print("=" * 70)

    passed = sum(1 for _, status in results if status)
    total = len(results)

    print(f"\nPassed: {passed}/{total} ({passed / total * 100:.1f}%)")

    print("\nDetailed Results:")
    for test_name, status in results:
        icon = "✅" if status else "❌"
        print(f"  {icon} {test_name}")

    if passed == total:
        print("\n🎉 ALL PHASE 2 TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️ {total - passed} TEST(S) FAILED")
        return 1


if __name__ == "__main__":
    exit(test_course_detail())
