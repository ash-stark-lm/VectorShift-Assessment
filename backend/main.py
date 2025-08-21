from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from collections import deque

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input modelss
class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]





# Using Kahn's Algorithm to check if the graph is a DAG
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    if len(nodes) == 0:
        return False  # Edge Case Empty Graph is not a DAG

    #  Build graph and compute indegree
    graph = {node.id: [] for node in nodes}
    indegree = {node.id: 0 for node in nodes}

    for edge in edges:
        # Only add edge if both nodes exist
        if edge.source in graph and edge.target in graph:
            graph[edge.source].append(edge.target)
            indegree[edge.target] += 1

    #  Initialize queue with nodes having indegree 0
    queue = deque([node_id for node_id, deg in indegree.items() if deg == 0])
    processed_count = 0

    #  Process nodes
    while queue:
        node_id = queue.popleft()
        processed_count += 1
        for neighbor in graph[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    #  If all nodes processed, no cycle
    return processed_count == len(nodes)

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        dag_status = is_dag(pipeline.nodes, pipeline.edges)
        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag_status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
