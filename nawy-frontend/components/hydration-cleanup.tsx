"use client"

import { useCleanupBrowserExtensions } from '@/lib/utils/hydration'

/**
 * Component that handles cleanup of browser extension attributes
 * that cause hydration mismatches
 */
export function HydrationCleanup() {
  useCleanupBrowserExtensions()
  return null
}
