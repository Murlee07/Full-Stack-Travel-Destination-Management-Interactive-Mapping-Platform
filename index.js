const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

function isValidEdge(edge) {
    return /^[A-Z]->[A-Z]$/.test(edge) && edge[0] !== edge[3];
}

function buildGraph(edges) {
    const graph = {};
    const children = new Set();

    edges.forEach(edge => {
        const [parent, child] = edge.split("->");

        if (!graph[parent]) graph[parent] = {};
        graph[parent][child] = {};

        children.add(child);
    });

    const nodes = new Set([...Object.keys(graph), ...children]);

    return { graph, nodes, children };
}

function findRoots(nodes, children) {
    return [...nodes].filter(n => !children.has(n));
}

function hasCycle(node, visited, stack, graph) {
    if (!visited.has(node)) {
        visited.add(node);
        stack.add(node);

        if (graph[node]) {
            for (let child in graph[node]) {
                if (!visited.has(child) && hasCycle(child, visited, stack, graph))
                    return true;
                else if (stack.has(child))
                    return true;
            }
        }
    }
    stack.delete(node);
    return false;
}

function getDepth(node, graph) {
    if (!graph[node] || Object.keys(graph[node]).length === 0) return 1;

    let max = 0;
    for (let child in graph[node]) {
        max = Math.max(max, getDepth(child, graph));
    }

    return max + 1;
}

app.post('/bfhl', (req, res) => {

    const data = req.body.data || [];

    const invalid_entries = [];
    const duplicate_edges = [];
    const seen = new Set();
    const validEdges = [];

    data.forEach(edge => {
        const trimmed = edge.trim();

        if (!isValidEdge(trimmed)) {
            invalid_entries.push(edge);
        } else if (seen.has(trimmed)) {
            if (!duplicate_edges.includes(trimmed))
                duplicate_edges.push(trimmed);
        } else {
            seen.add(trimmed);
            validEdges.push(trimmed);
        }
    });

    const { graph, nodes, children } = buildGraph(validEdges);
    let roots = findRoots(nodes, children);

    const hierarchies = [];
    let total_trees = 0;
    let total_cycles = 0;
    let largest_tree_root = "";
    let maxDepth = 0;

    if (roots.length === 0 && nodes.size > 0) {
        roots = [Array.from(nodes).sort()[0]];
    }

    roots.forEach(root => {
        const visited = new Set();
        const stack = new Set();

        const cycle = hasCycle(root, visited, stack, graph);

        if (cycle) {
            total_cycles++;
            hierarchies.push({
                root,
                tree: {},
                has_cycle: true
            });
        } else {
            total_trees++;

            const depth = getDepth(root, graph);

            if (depth > maxDepth || (depth === maxDepth && root < largest_tree_root)) {
                maxDepth = depth;
                largest_tree_root = root;
            }

            hierarchies.push({
                root,
                tree: { [root]: graph[root] || {} },
                depth
            });
        }
    });

    res.json({
        user_id: "yourname_ddmmyyyy",
        email_id: "your@email.com",
        college_roll_number: "yourroll",
        hierarchies,
        invalid_entries,
        duplicate_edges,
        summary: {
            total_trees,
            total_cycles,
            largest_tree_root
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});