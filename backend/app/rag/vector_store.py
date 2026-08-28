import chromadb


client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="customer_support_knowledge"
)


def add_document(chunk, embedding, source, chunk_id):
    collection.add(
        ids=[chunk_id],
        documents=[chunk],
        embeddings=[embedding],
        metadatas=[{"source": source}]
    )


def search_documents(query_embedding, top_k=3):
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    return results


def reset_collection():
    global collection

    try:
        client.delete_collection(name="customer_support_knowledge")
    except Exception:
        pass

    collection = client.get_or_create_collection(
        name="customer_support_knowledge"
    )