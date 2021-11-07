const fs = require("fs");

let rawdata = fs.readFileSync(process.env.FILE_TO_CONVERT);
let info_json = JSON.parse(rawdata);

// {
//     "nodes": [
//       {
//         "id": "4062045",
//         "user": "mbostock",
//         "description": "Force-Directed Graph"
//       },
//     ]
//     "links": [
//         { "source": "950642", "target": "4062045" },
//     ]
// }

converted_info_json = {
  nodes: [],
  links: [],
};

info_json.elements.nodes.forEach((node) => {
  converted_info_json.nodes.push({
    id: node.data.id,
    name: node.data.name,
    category: node.data.category,
  });
});

info_json.elements.edges.forEach((edge) => {
  converted_info_json.links.push({
    id: edge.data.id,
    source: edge.data.source,
    target: edge.data.target,
  });
});

function uniqByKeepFirst(a, key) {
  let seen = new Set();
  return a.filter((item) => {
    let k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
}

converted_info_json.nodes = uniqByKeepFirst(
  converted_info_json.nodes,
  (item) => item.id
);

let data = JSON.stringify(converted_info_json);
fs.writeFileSync("public/blocks.json", data);
