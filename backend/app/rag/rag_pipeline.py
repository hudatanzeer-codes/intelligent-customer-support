from app.rag.retriever import retrieve_documents
from app.rag.generator import generate_answer


def answer_query(question):
    results = retrieve_documents(question, top_k=3)

    documents = results["documents"][0]

    context = "\n\n".join(documents)

    answer = generate_answer(
        question=question,
        context=context
    )

    return {
        "question": question,
        "answer": answer,
        "sources": results["metadatas"][0]
    }


if __name__ == "__main__":
    question = "How long does a refund take?"

    result = answer_query(question)

    print("\nQuestion:")
    print(result["question"])

    print("\nAnswer:")
    print(result["answer"])

    print("\nSources:")
    for source in result["sources"]:
        print(source["source"])