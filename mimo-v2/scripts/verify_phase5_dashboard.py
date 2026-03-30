#!/usr/bin/env python3
"""
Phase 5 Verification Script: User Dashboard Enhancement
Tests all dashboard features including achievements and quick actions
"""

from playwright.sync_api import sync_playwright
import os
from datetime import datetime

BASE_URL = "http://localhost:5174"
SCREENSHOT_DIR = "/home/project/iTrust-Academy/mimo-v2/screenshots/phase5-verification"


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def test_dashboard():
    ensure_dir(SCREENSHOT_DIR)
    results = []

    print("=" * 70)
    print("🧪 PHASE 5 VERIFICATION: User Dashboard Enhancement")
    print("=" * 70)
    print(f"Target URL: {BASE_URL}")
    print(f"Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Test 1: Dashboard shows login prompt for unauthenticated users
        print("\n📍 Test 1: Dashboard shows login prompt")
        print("-" * 50)
        page.goto(f"{BASE_URL}/dashboard")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        login_prompt = page.locator("text=Please Sign In").is_visible()
        status = "✅" if login_prompt else "❌"
        print(f"  {status} Login prompt visible: {login_prompt}")
        results.append(("Login prompt for unauthenticated", login_prompt))
        page.screenshot(path=f"{SCREENSHOT_DIR}/01-login-prompt.png")

        # Test 2: Register a user and check dashboard
        print("\n📍 Test 2: Register user and check dashboard")
        print("-" * 50)

        # Go to home page
        page.goto(BASE_URL)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        # Click Register button
        register_btn = page.locator('button:has-text("Register")').first
        if register_btn.is_visible():
            register_btn.click()
            page.wait_for_timeout(500)

            # Fill registration form
            page.locator("#firstName").fill("Test")
            page.locator("#lastName").fill("User")
            page.locator("#username").fill(
                f"testuser{datetime.now().strftime('%H%M%S')}"
            )
            page.locator("#registerEmail").fill(
                f"test{datetime.now().strftime('%H%M%S')}@example.com"
            )
            page.locator("#registerPassword").fill("TestPass123!")
            page.locator("#confirmPassword").fill("TestPass123!")

            # Submit form
            submit_btn = page.locator(
                'button[type="submit"]:has-text("Create Account")'
            )
            submit_btn.click()
            page.wait_for_timeout(3000)  # Wait for registration to complete

            # Verify user is logged in (check for user avatar)
            user_avatar = page.locator("button").filter(has_text="T").first
            is_logged_in = user_avatar.is_visible()
            print(
                f"  {'✅' if is_logged_in else '❌'} User logged in after registration"
            )

            if not is_logged_in:
                print("  ❌ Registration may have failed")

        # Wait a moment for auth state to persist
        page.wait_for_timeout(1000)

        # Now navigate to dashboard
        page.goto(f"{BASE_URL}/dashboard")
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1000)

        # Test 3: Dashboard loads for authenticated user
        print("\n📍 Test 3: Dashboard loads for authenticated user")
        print("-" * 50)

        welcome_msg = page.locator("text=Welcome back").is_visible()
        status = "✅" if welcome_msg else "❌"
        print(f"  {status} Welcome message visible: {welcome_msg}")
        results.append(("Dashboard loads for authenticated", welcome_msg))
        page.screenshot(path=f"{SCREENSHOT_DIR}/02-dashboard-main.png")

        # Test 4: Quick stats display
        print("\n📍 Test 4: Quick stats display")
        print("-" * 50)

        courses_enrolled = page.locator("text=Courses Enrolled").is_visible()
        hours_learned = page.locator("text=Hours Learned").is_visible()
        certificates = page.locator("text=Certificates").is_visible()
        avg_progress = page.locator("text=Avg. Progress").is_visible()

        all_stats = courses_enrolled and hours_learned and certificates and avg_progress
        status = "✅" if all_stats else "❌"
        print(f"  {status} All quick stats visible: {all_stats}")
        results.append(("Quick stats display", all_stats))

        # Test 5: Learning streak display
        print("\n📍 Test 5: Learning streak display")
        print("-" * 50)

        streak = page.locator("text=7 day streak").is_visible()
        status = "✅" if streak else "❌"
        print(f"  {status} Learning streak visible: {streak}")
        results.append(("Learning streak display", streak))

        # Test 6: My Courses section
        print("\n📍 Test 6: My Courses section")
        print("-" * 50)

        my_courses = page.locator("text=My Courses").is_visible()
        status = "✅" if my_courses else "❌"
        print(f"  {status} My Courses section visible: {my_courses}")
        results.append(("My Courses section", my_courses))

        # Check for course progress cards
        progress_bars = page.locator(".bg-brand-500.rounded-full").count()
        has_progress = progress_bars > 0
        status = "✅" if has_progress else "❌"
        print(f"  {status} Course progress bars: {progress_bars}")
        results.append(("Course progress bars", has_progress))
        page.screenshot(path=f"{SCREENSHOT_DIR}/03-my-courses.png")

        # Test 7: Quick Actions section
        print("\n📍 Test 7: Quick Actions section")
        print("-" * 50)

        quick_actions = page.locator("text=Quick Actions").is_visible()
        browse_courses = page.locator("text=Browse Courses").is_visible()
        training_calendar = page.get_by_role(
            "link", name="Training Calendar View"
        ).is_visible()

        has_actions = quick_actions and browse_courses and training_calendar
        status = "✅" if has_actions else "❌"
        print(f"  {status} Quick Actions visible: {has_actions}")
        results.append(("Quick Actions section", has_actions))
        page.screenshot(path=f"{SCREENSHOT_DIR}/04-quick-actions.png")

        # Test 8: Achievement badges
        print("\n📍 Test 8: Achievement badges")
        print("-" * 50)

        achievements = page.locator("text=Achievements").is_visible()
        streak_badge = page.get_by_role("heading", name="7-Day Streak").is_visible()
        first_course = page.get_by_role("heading", name="First Course").is_visible()

        has_achievements = achievements and streak_badge and first_course
        status = "✅" if has_achievements else "❌"
        print(f"  {status} Achievement badges visible: {has_achievements}")
        results.append(("Achievement badges", has_achievements))
        page.screenshot(path=f"{SCREENSHOT_DIR}/05-achievements.png")

        # Test 9: Recommended courses
        print("\n📍 Test 9: Recommended courses")
        print("-" * 50)

        recommended = page.locator("text=Recommended For You").is_visible()
        status = "✅" if recommended else "❌"
        print(f"  {status} Recommended courses section: {recommended}")
        results.append(("Recommended courses section", recommended))

        # Scroll to bottom to see recommended courses
        page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(500)
        page.screenshot(path=f"{SCREENSHOT_DIR}/06-recommended.png")

        browser.close()

    # Summary
    print("\n" + "=" * 70)
    print("📊 PHASE 5 VERIFICATION RESULTS")
    print("=" * 70)

    passed = sum(1 for _, status in results if status)
    total = len(results)

    print(f"\nPassed: {passed}/{total} ({passed / total * 100:.1f}%)")

    print("\nDetailed Results:")
    for test_name, status in results:
        icon = "✅" if status else "❌"
        print(f"  {icon} {test_name}")

    if passed == total:
        print("\n🎉 ALL PHASE 5 TESTS PASSED!")
        return 0
    else:
        print(f"\n⚠️ {total - passed} TEST(S) FAILED")
        return 1


if __name__ == "__main__":
    exit(test_dashboard())
