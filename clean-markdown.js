const fs = require('fs').promises;
const path = require('path');

async function findMarkdownFiles(dir) {
    const files = await fs.readdir(dir, { withFileTypes: true });
    let markdownFiles = [];

    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            markdownFiles = markdownFiles.concat(await findMarkdownFiles(fullPath));
        } else if (file.name.endsWith('.md')) {
            markdownFiles.push(fullPath);
        }
    }

    return markdownFiles;
}

async function replaceBrTags(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        // Replace <br> or <br/> tags with newlines
        const cleanedContent = content.replace(/<br\s*\/?>/gi, '\n');
        await fs.writeFile(filePath, cleanedContent, 'utf8');
        console.log(`Processed: ${filePath}`);
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

async function main() {
    try {
        const docsDir = path.join(__dirname, 'docs');
        const markdownFiles = await findMarkdownFiles(docsDir);
        
        console.log('Found markdown files:', markdownFiles);
        
        for (const file of markdownFiles) {
            await replaceBrTags(file);
        }
        
        console.log('All files processed successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();