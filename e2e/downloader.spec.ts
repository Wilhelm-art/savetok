import { test, expect } from './fixtures';

test.describe('SaveTok End-to-End User Journeys', () => {

  test.beforeEach(async ({ appPage }) => {
    await appPage.goto('/');
  });

  test('Journey 1: Happy Path — Download Video HD & Audio', async ({ appPage, mockVideoApi }) => {
    await mockVideoApi();

    const input = appPage.locator('[data-testid="url-input"]');
    const submitBtn = appPage.locator('[data-testid="btn-download"]');

    await input.fill('https://www.tiktok.com/@dance_pro/video/71234567890');
    await submitBtn.click();

    // Verify Download Card appears with correct video information
    const downloadCard = appPage.locator('[data-testid="download-card"]');
    await expect(downloadCard).toBeVisible({ timeout: 10000 });

    await expect(downloadCard).toContainText('Viral Dance Video');
    await expect(downloadCard).toContainText('@dance_pro');

    // Verify MP4 and MP3 download buttons are present
    const mp4Btn = appPage.locator('[data-testid="btn-download-mp4"]');
    const mp3Btn = appPage.locator('[data-testid="btn-download-mp3"]');
    await expect(mp4Btn).toBeVisible();
    await expect(mp3Btn).toBeVisible();

    // Verify back button resets state
    const backBtn = appPage.locator('[data-testid="btn-back-to-downloader"]');
    await backBtn.click();
    await expect(downloadCard).not.toBeVisible();
  });

  test('Journey 2: Happy Path — Download Photo Slide Carousel', async ({ appPage, mockPhotoApi }) => {
    await mockPhotoApi();

    const input = appPage.locator('[data-testid="url-input"]');
    const submitBtn = appPage.locator('[data-testid="btn-download"]');

    await input.fill('https://www.tiktok.com/@photo_creator/video/79876543210');
    await submitBtn.click();

    const downloadCard = appPage.locator('[data-testid="download-card"]');
    await expect(downloadCard).toBeVisible({ timeout: 10000 });

    // Verify photo slides counter
    await expect(downloadCard).toContainText('1 / 3');

    // Verify photo download buttons
    const photoBtn = appPage.locator('[data-testid="btn-download-photo"]');
    const allPhotosBtn = appPage.locator('[data-testid="btn-download-all-photos"]');
    const audioBtn = appPage.locator('[data-testid="btn-download-mp3"]');

    await expect(photoBtn).toBeVisible();
    await expect(allPhotosBtn).toBeVisible();
    await expect(audioBtn).toBeVisible();
  });

  test('Journey 3: Input Validation & Failure State Handling', async ({ appPage }) => {
    const input = appPage.locator('[data-testid="url-input"]');
    const submitBtn = appPage.locator('[data-testid="btn-download"]');

    // 1. Empty input validation
    await submitBtn.click();
    const errorMsg = appPage.locator('[data-testid="error-message"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Tautan video wajib diisi.');

    // 2. Invalid non-TikTok URL
    await input.fill('https://youtube.com/watch?v=123');
    await submitBtn.click();
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Tautan tidak valid.');

    // 3. Clear button resets input
    const clearBtn = appPage.locator('[data-testid="btn-clear"]');
    await expect(clearBtn).toBeVisible();
    await clearBtn.click();
    await expect(input).toHaveValue('');
    await expect(errorMsg).not.toBeVisible();
  });

  test('Journey 4: Multilingual Switcher (ID & EN)', async ({ appPage }) => {
    const input = appPage.locator('[data-testid="url-input"]');

    // Default Indonesian placeholder
    await expect(input).toHaveAttribute('placeholder', /Tempel tautan video/);

    // Switch to English
    const enBtn = appPage.locator('[data-testid="lang-btn-en"]');
    await enBtn.click();
    await expect(input).toHaveAttribute('placeholder', /Paste TikTok URL/);

    // Switch back to Indonesian
    const idBtn = appPage.locator('[data-testid="lang-btn-id"]');
    await idBtn.click();
    await expect(input).toHaveAttribute('placeholder', /Tempel tautan video/);
  });

  test('Journey 5: Legal Modals Navigation', async ({ appPage }) => {
    // Click Privacy Policy in footer
    const privacyBtn = appPage.locator('#footer-link-privacy');
    await privacyBtn.click();

    // Verify modal overlay appears with title
    const modalTitle = appPage.locator('[data-testid="legal-modal-title"]');
    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toContainText('Kebijakan Privasi');

    // Close modal
    const closeBtn = appPage.locator('[data-testid="btn-close-legal-modal"]');
    await closeBtn.click();
    await expect(modalTitle).not.toBeVisible();
  });

  test('Journey 6: Server & Network Error Handling', async ({ appPage, mockErrorApi }) => {
    await mockErrorApi(500, 'Server sedang sibuk. Silakan coba beberapa saat lagi.');

    const input = appPage.locator('[data-testid="url-input"]');
    const submitBtn = appPage.locator('[data-testid="btn-download"]');

    await input.fill('https://www.tiktok.com/@user/video/1234567890');
    await submitBtn.click();

    // Verify error notification is rendered and app doesn't freeze
    const errorMsg = appPage.locator('[data-testid="error-message"]');
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
    await expect(errorMsg).toContainText('Server sedang sibuk');
  });

  test('Journey 7: Sub-Page Keyword Routes & Educational Guides', async ({ appPage }) => {
    // Navigate to /mp3 via Header
    const mp3Link = appPage.locator('#header-nav-mp3');
    await mp3Link.click();
    await expect(appPage.locator('#hero-title')).toContainText('Download Lagu & Sound TikTok');
    await expect(appPage.locator('[data-testid="url-input"]')).toHaveAttribute('placeholder', /ekstrak MP3/);

    // Navigate to /foto
    const fotoLink = appPage.locator('#header-nav-foto');
    await fotoLink.click();
    await expect(appPage.locator('#hero-title')).toContainText('Download Foto Slide TikTok');

    // Verify Educational Guides Section is rendered
    const guidesSection = appPage.locator('#guides-section');
    await expect(guidesSection).toBeVisible();
    await expect(guidesSection).toContainText('Pusat Panduan & Edukasi');
  });

  test('Journey 8: Photo Slide Carousel ZIP Button Presence', async ({ appPage, mockPhotoApi }) => {
    await mockPhotoApi();

    const input = appPage.locator('[data-testid="url-input"]');
    const submitBtn = appPage.locator('[data-testid="btn-download"]');

    await input.fill('https://www.tiktok.com/@photo_creator/video/79876543210');
    await submitBtn.click();

    const downloadCard = appPage.locator('[data-testid="download-card"]');
    await expect(downloadCard).toBeVisible({ timeout: 10000 });

    const zipBtn = appPage.locator('[data-testid="btn-download-zip"]');
    await expect(zipBtn).toBeVisible();
    await expect(zipBtn).toContainText('.ZIP');
  });

});

