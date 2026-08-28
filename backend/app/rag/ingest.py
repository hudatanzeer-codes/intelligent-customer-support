from app.rag.loader import load_documents
from app.rag.splitter import split_text
from app.rag.embeddings import create_embedding
from app.rag.vector_store import add_document, reset_collection


def ingest_documents():
    reset_collection()

    documents = load_documents()

    chunk_counter = 0

    for document in documents:
        chunks = split_text(document["text"])

        for chunk in chunks:
            embedding = create_embedding(chunk)

            add_document(
                chunk=chunk,
                embedding=embedding,
                source=document["source"],
                chunk_id=f"chunk_{chunk_counter}"
            )

            chunk_counter += 1

    print(f"Successfully stored {chunk_counter} chunks in ChromaDB.")


if __name__ == "__main__":
    ingest_documents()