// documents/.vitepress/sidebar.mts
import { readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

// The path to the directory containing your markdown files
const docsRoot = resolve(__dirname, '..')

/**
 * Formats a file or directory name into a sidebar-friendly title.
 * e.g., 'api-examples' becomes 'Api Examples'
 */
function formatName(str) {
  // Remove the .md extension if it exists
  const nameWithoutExt = str.endsWith('.md') ? str.slice(0, -3) : str
  const words = nameWithoutExt.replace(/-/g, ' ').split(' ')
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Generates sidebar items from a given directory.
 * @param {string} currentDir The directory path relative to the docs root.
 */
function getSidebarItems(currentDir = '') {
  const fullPath = join(docsRoot, currentDir)
  
  return readdirSync(fullPath)
    .filter(file => {
      // Ignore files/folders starting with a dot and the root index page
      return !file.startsWith('.') && file.toLowerCase() !== 'index.md'
    })
    .map(file => {
      const relativePath = join(currentDir, file)
      const isDirectory = statSync(join(docsRoot, relativePath)).isDirectory()

      if (isDirectory) {
        // This is a category folder, create a collapsible group
        return {
          text: formatName(file),
          collapsible: true,
          items: getSidebarItems(relativePath) // Recurse into the subdirectory
        }
      } else if (file.endsWith('.md')) {
        // This is a document file, create a link item
        const linkPath = `/${relativePath.slice(0, -3)}`.replace(/\\/g, '/')
        return {
          text: formatName(file),
          link: linkPath
        }
      }
      return null
    })
    .filter(Boolean) // Remove any null entries
}

// The final export must be in the format VitePress expects
export const sidebar = [
  {
    // This is your top-level group
    text: 'مستندات',
    items: getSidebarItems() // The generated items will be nested here
  }
]