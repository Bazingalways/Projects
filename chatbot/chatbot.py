import psycopg2
import os
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
#cONNECTION SETUP
load_dotenv()
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT", "5432")

if not all([DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT]):
    print("Error: One or more database credentials (DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT) not found in environment variables or .env file.")
    print("Please ensure your .env file is correctly set up and located in the script's directory.")
    exit()
try:
    DB_PORT = int(DB_PORT)
except ValueError:
    print(f"Error: DB_PORT '{DB_PORT}' is not a valid integer. Please check your .env file.")
    exit()

try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Sentence Transformer model 'all-MiniLM-L6-v2' loaded successfully.")
except Exception as e:
    print(f"Error loading Sentence Transformer model: {e}")
    print("Please ensure you have an internet connection or the model is cached.")
    exit()

print("\n--- RAG FAQ Chatbot Started ---")
print("Type your question and press Enter. Type 'exit' to quit.")

while True:
    input_q = input("Enter your question: ").strip()
    if input_q.lower() == 'exit':
        print("Closed chatbot.")
        break
    elif not input_q:
        print("No question received!")
        continue
    print(f"Querying question: {input_q}")

    try:
            query_embedding = model.encode(input_q).tolist()
    except Exception as e:
        print(f"  --> Error embedding question: {e}")
        query_embedding = None
        continue
    try:
        conn=psycopg2.connect(
            host=DB_HOST,
            user=DB_USER,
            port = DB_PORT,
            database=DB_NAME,
            password=DB_PASSWORD
        )
        cursor = conn.cursor()
        print("Connection to PostgreSQL DB successful!")
        search_query = """
        SELECT question, answer, url, suggestions
        FROM faqs
        ORDER BY embedding <=> %s::vector
        LIMIT 1;
        """
        cursor.execute(search_query, (query_embedding,))
        result = cursor.fetchone()

        if result:
            faq, faq_answer, faq_url, faq_suggestions =result
            print("Closest FAQ retrived:")
            print(f"FAQ: {faq}\nURL: {faq_url}\nAnswer: {faq_answer}\nSuggested Insights: {faq_suggestions}")
        else:
            print('No Similar FAQ returned')

    except (psycopg2.Error, Exception) as e:
        print(f"DB error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            cursor.close()
            conn.close()
            print(f"Connection to PostgreSQL DB closed.")
    