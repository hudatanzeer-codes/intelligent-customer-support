import requests


OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2:3b"


def generate_answer(question, context):
    prompt = f"""
You are a customer support assistant.

Answer the customer's question using ONLY the information
provided in the context below.

If the answer is not available in the context, say:
"I don't have enough information to answer that."

Context:
{context}

Customer Question:
{question}

Answer:
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        }
    )

    response.raise_for_status()

    return response.json()["response"]


if __name__ == "__main__":
    question = "How long does a refund take?"

    context = """
    Refund Policy

    Customers can request a refund within 7 days of purchase.

    Eligible refunds are processed within 5 to 7 business days.

    Refunds are returned to the original payment method.
    """

    answer = generate_answer(question, context)

    print("\nAI Answer:")
    print(answer)