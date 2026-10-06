import { test as base, Page } from '@playwright/test';

export interface TestFixtures {
  appPage: Page;
  mockVideoApi: () => Promise<void>;
  mockPhotoApi: () => Promise<void>;
  mockErrorApi: (status?: number, message?: string) => Promise<void>;
}

export const test = base.extend<TestFixtures>({
  // Isolated test page with automated teardown / cleanup
  appPage: async ({ page }, use) => {
    // Seeding: ensure clean localStorage and cookies
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });

    await use(page);

    // Cleanup after each test run
    await page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }).catch(() => {});
  },

  // Mock Video Response Seeder
  mockVideoApi: async ({ page }, use) => {
    const setup = async () => {
      await page.route('**/api/process', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: '71234567890',
            title: 'Viral Dance Video #trend #fyp',
            authorName: 'dance_pro',
            authorUrl: 'https://www.tiktok.com/@dance_pro',
            thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=720&h=1280',
            duration: '00:30',
            mediaType: 'video',
            downloadMp4: 'https://sample.url/video.mp4',
            downloadMp3: 'https://sample.url/audio.mp3',
            images: [],
          }),
        });
      });
    };
    await use(setup);
  },

  // Mock Photo Slide Response Seeder
  mockPhotoApi: async ({ page }, use) => {
    const setup = async () => {
      await page.route('**/api/process', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: '79876543210',
            title: 'Aesthetic Photography Slide',
            authorName: 'photo_creator',
            authorUrl: 'https://www.tiktok.com/@photo_creator',
            thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779?w=600',
            duration: '00:15',
            mediaType: 'photo',
            downloadMp4: '',
            downloadMp3: 'https://sample.url/music.mp3',
            images: [
              'https://images.unsplash.com/photo-1511671782779?w=600',
              'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
            ],
          }),
        });
      });
    };
    await use(setup);
  },

  // Mock Network Error Seeder
  mockErrorApi: async ({ page }, use) => {
    const setup = async (status = 500, message = 'Gagal memproses video. Silakan coba lagi nanti.') => {
      await page.route('**/api/process', async (route) => {
        await route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify({ error: message }),
        });
      });
    };
    await use(setup);
  },
});

export { expect } from '@playwright/test';
