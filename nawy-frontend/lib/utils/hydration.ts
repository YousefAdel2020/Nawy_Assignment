import { useEffect } from 'react'

/**
 * Utility functions to handle hydration issues caused by browser extensions
 */

/**
 * Removes browser extension attributes that cause hydration mismatches
 * This should be called on the client side after hydration
 */
export function cleanupBrowserExtensionAttributes() {
  if (typeof window === 'undefined') return

  // Remove Grammarly attributes
  const grammarlyAttributes = [
    'data-new-gr-c-s-check-loaded',
    'data-gr-ext-installed',
    'data-gr-c-s-loaded'
  ]

  grammarlyAttributes.forEach(attr => {
    document.body.removeAttribute(attr)
  })

  // Remove other common browser extension attributes
  const otherExtensionAttributes = [
    'data-grammarly-shadow-root',
    'data-grammarly-origin',
    'data-grammarly-origin-shadow-root'
  ]

  otherExtensionAttributes.forEach(attr => {
    document.body.removeAttribute(attr)
  })
}

/**
 * Hook to clean up browser extension attributes after hydration
 */
export function useCleanupBrowserExtensions() {
  useEffect(() => {
    // Clean up immediately
    cleanupBrowserExtensionAttributes()

    // Also clean up after a short delay to catch extensions that load later
    const timeoutId = setTimeout(cleanupBrowserExtensionAttributes, 1000)

    return () => clearTimeout(timeoutId)
  }, [])
}
