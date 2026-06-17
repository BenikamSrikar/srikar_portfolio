// Quick script to inspect the GLB model structure
const fs = require('fs');
const path = require('path');

// Read the GLB file
const glbPath = path.join(__dirname, '..', 'public', 'models', 'animator.glb');
const buffer = fs.readFileSync(glbPath);

// Parse GLB header
const magic = buffer.readUInt32LE(0);
const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);

console.log(`GLB Magic: 0x${magic.toString(16)}, Version: ${version}, Length: ${length}`);

// Parse chunks
let offset = 12;
while (offset < length) {
  const chunkLength = buffer.readUInt32LE(offset);
  const chunkType = buffer.readUInt32LE(offset + 4);
  
  if (chunkType === 0x4E4F534A) { // JSON chunk
    const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    
    console.log('\n=== NODES ===');
    if (gltf.nodes) {
      gltf.nodes.forEach((node, i) => {
        const info = [`Node ${i}: "${node.name || '(unnamed)'}"`];
        if (node.mesh !== undefined) info.push(`mesh=${node.mesh}`);
        if (node.skin !== undefined) info.push(`skin=${node.skin}`);
        if (node.children) info.push(`children=[${node.children.join(',')}]`);
        if (node.rotation) info.push(`rot=[${node.rotation.map(r => r.toFixed(3)).join(',')}]`);
        if (node.translation) info.push(`pos=[${node.translation.map(t => t.toFixed(3)).join(',')}]`);
        console.log(info.join(' | '));
      });
    }
    
    console.log('\n=== ANIMATIONS ===');
    if (gltf.animations) {
      gltf.animations.forEach((anim, i) => {
        console.log(`\nAnimation ${i}: "${anim.name}"`);
        if (anim.channels) {
          anim.channels.forEach((ch, ci) => {
            const targetNode = gltf.nodes[ch.target.node];
            console.log(`  Channel ${ci}: node=${ch.target.node} ("${targetNode?.name || '?'}") path="${ch.target.path}"`);
          });
        }
      });
    }
    
    console.log('\n=== MESHES ===');
    if (gltf.meshes) {
      gltf.meshes.forEach((mesh, i) => {
        console.log(`Mesh ${i}: "${mesh.name || '(unnamed)'}" primitives=${mesh.primitives?.length}`);
      });
    }
    
    // Look for keywords related to lid/screen/top
    console.log('\n=== NODES WITH LID/SCREEN/TOP/DISPLAY KEYWORDS ===');
    if (gltf.nodes) {
      gltf.nodes.forEach((node, i) => {
        const name = (node.name || '').toLowerCase();
        if (name.includes('lid') || name.includes('screen') || name.includes('top') || 
            name.includes('display') || name.includes('cover') || name.includes('hinge') ||
            name.includes('bone') || name.includes('armature') || name.includes('object_12')) {
          console.log(`  Node ${i}: "${node.name}" children=[${node.children || []}]`);
        }
      });
    }
  }
  
  offset += 8 + chunkLength;
}
