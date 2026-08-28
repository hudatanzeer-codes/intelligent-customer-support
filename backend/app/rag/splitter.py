def split_text(text, chunk_size=500, overlap=50):
    chunks = []

    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]

        chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


if __name__ == "__main__":
    sample_text = """
    Customers can request a refund within 7 days of purchase.
    Eligible refunds are processed within 5 to 7 business days.
    Refunds are returned to the original payment method.
    """

    chunks = split_text(sample_text, chunk_size=100, overlap=20)

    for i, chunk in enumerate(chunks):
        print(f"\n--- CHUNK {i + 1} ---")
        print(chunk)