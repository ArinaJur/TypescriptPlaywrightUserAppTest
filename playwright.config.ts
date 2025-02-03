import { defineConfig, devices } from '@playwright/test';
import * as os from "node:os";
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',

  testIgnore: 'template*',
  outputDir:'./reports/test-results',
  timeout: 20 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['json', { outputFile: 'reports/json-report/report.json' }],
    ['html', { outputFolder: 'reports/html-report/', open: 'never' }],
    ['junit', { outputFile: 'reports/junit-report/report.xml' }],
    ['@estruyf/github-actions-reporter'],
    ['monocart-reporter', { name: "Monocart Report", outputFile: 'reports/monocart-report/index.html'}],
    ['allure-playwright', {
        resultsDir: 'reports/allure-report',
        detail: true,
        suiteTitle: true,
        categories: [
          {
            name: "Reports",
            messageRegex: "bar",
            traceRegex: "baz",
          },
        ],
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
          process_platform: process.platform,
        },
        storeTrends: true,
      },
    ],
  ],
  use: {
    baseURL: process.env.URL,
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'SetUp',
      testMatch: /.*\.setup\.ts/,
      timeout: 100 * 1000,
    },
    {
      name: 'Chromium',
      testMatch: /.*\.test\.ts/,
      use: { ...devices['Desktop Chrome'],
        headless: !!process.env.CI,
      },
      dependencies: ['SetUp'],
    },
    {
      name: 'FireFox',
      testMatch: /.*\.test\.ts/,
      use: { ...devices['Desktop Firefox'],
        headless: !!process.env.CI,
      },
      dependencies: ['SetUp'],
    },
  ],
});
