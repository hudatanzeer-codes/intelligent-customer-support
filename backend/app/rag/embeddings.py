from sentence_transformers import SentenceTransformer


model = SentenceTransformer("all-MiniLM-L6-v2")


def create_embedding(text):
    return model.encode(text).tolist()


if __name__ == "__main__":
    text = "Eligible refunds are processed within 5 to 7 business days."

    embedding = create_embedding(text)

    print("Embedding length:", len(embedding))
    print("First 5 values:", embedding[:5])