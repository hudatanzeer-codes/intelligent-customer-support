from app.rag.embeddings import create_embedding
from app.rag.vector_store import search_documents


def retrieve_documents(query, top_k=3):
    query_embedding = create_embedding(query)

    results = search_documents(
        query_embedding=query_embedding,
        top_k=top_k
    )

    return results


if __name__ == "__main__":
    query = "How long does delivery take?"

    results = retrieve_documents(query)

    print("Retrieved Documents:")

    for document in results["documents"][0]:
        print("\n---")
        print(document)