import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory to search for Vue files
const pagesDir = path.join(__dirname, 'src', 'pages');

// Function to recursively find all Vue files
function findVueFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findVueFiles(filePath, fileList);
    } else if (file.endsWith('.vue')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to add default-opened attribute to q-expansion-item tags
function addDefaultOpened(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace <q-expansion-item> with <q-expansion-item default-opened>
  // but only if it doesn't already have the attribute
  const updatedContent = content.replace(/<q-expansion-item(?!\s+default-opened)(\s+[^>]*)?>/g, '<q-expansion-item default-opened$1>');
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated: ${filePath}`);
    return true;
  }
  
  return false;
}

// Find all Vue files and add default-opened attribute
const vueFiles = findVueFiles(pagesDir);
let updatedCount = 0;

vueFiles.forEach(file => {
  if (addDefaultOpened(file)) {
    updatedCount++;
  }
});

console.log(`\nTotal files updated: ${updatedCount} out of ${vueFiles.length}`);