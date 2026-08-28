from pathlib import Path


KNOWLEDGE_BASE_DIR = Path("knowledge_base")


def load_documents():
    documents = []

    for file_path in KNOWLEDGE_BASE_DIR.glob("*.txt"):
        text = file_path.read_text(encoding="utf-8")

        documents.append({
            "text": text,
            "source": file_path.name
        })

    return documents


if __name__ == "__main__":
    documents = load_documents()

    for document in documents:
        print("SOURCE:", document["source"])
        print("TEXT:")
        print(document["text"])