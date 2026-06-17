const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '..', 'public', 'models', 'animator.glb');
const buffer = fs.readFileSync(glbPath);

const magic = buffer.readUInt32LE(0);
const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);

let offset = 12;
while (offset < length) {
  const chunkLength = buffer.readUInt32LE(offset);
  const chunkType = buffer.readUInt32LE(offset + 4);
  
  if (chunkType === 0x4E4F534A) {
    const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    
    const nodes = gltf.nodes;
    if (!nodes) {
      console.log("No nodes found");
      process.exit(1);
    }
    
    // Find the node index for VCQqxpxkUlzqcJI_62 (Node 121)
    const targetIdx = 121;
    const node121 = nodes[targetIdx];
    console.log(`=== NODE 121 INFO ===`);
    console.log(`Name: ${node121.name}`);
    console.log(`Translation: ${JSON.stringify(node121.translation)}`);
    console.log(`Rotation: ${JSON.stringify(node121.rotation)}`);
    console.log(`Scale: ${JSON.stringify(node121.scale)}`);
    console.log(`Children count: ${node121.children ? node121.children.length : 0}`);
    
    if (node121.children) {
      node121.children.forEach(childIdx => {
        const child = nodes[childIdx];
        console.log(`  Child Node ${childIdx}: "${child.name || '(unnamed)'}" | children: ${JSON.stringify(child.children)}`);
        // if this child has children, print them too
        if (child.children) {
          child.children.forEach(subChildIdx => {
            const subChild = nodes[subChildIdx];
            console.log(`    Sub-child Node ${subChildIdx}: "${subChild.name || '(unnamed)'}"`);
          });
        }
      });
    }

    // Let's print the parent of Node 121
    // Build child-to-parent mapping
    const parentMap = {};
    nodes.forEach((node, i) => {
      if (node.children) {
        node.children.forEach(childIndex => {
          parentMap[childIndex] = i;
        });
      }
    });

    const parentIdx = parentMap[targetIdx];
    console.log(`\nParent of Node 121: Node ${parentIdx} "${nodes[parentIdx]?.name}"`);
  }
  offset += 8 + chunkLength;
}
