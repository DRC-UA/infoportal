import fs from "fs";
import path from "path";

const projectRoot = '/Users/alex/Documents/Workspaces/infoportal/packages/infoportal-server/src'
const tsFiles = [];
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes("node_modules") && !fullPath.includes("dist")) {
        scanDir(fullPath);
      }
    } else if (file.endsWith(".ts")) {
      tsFiles.push(fullPath);
    }
  }
}

// Improved regex to match imports like `import ... from "../../path"`
const importRegex =
  // /(import\s+[\s\S]*?from\s*["'])(\.{1,2}\/[\w\/-]+)(["'];?)/g;
  /(import\s+[\s\S]*?from\s*["'])(\.{1,2}[.\w\/-]+?)(?<!\.js)(["'])/g


function fixImports(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  let updated = content.replace(importRegex, (match, before, importPath, after) => {
    if (!importPath.endsWith(".js") && !importPath.endsWith(".ts")) {
      return `${before}${importPath}.js${after}`;
    }
    return match;
  });

  if (content !== updated) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Updated: ${filePath}`);
  }
}

// Run the script
scanDir(projectRoot);
tsFiles.forEach(fixImports);

console.log(`🚀 Finished updating ${tsFiles.length} files.`);