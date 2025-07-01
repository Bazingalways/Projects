import psycopg2
from psycopg2 import extras
import json
import os
from dotenv import load_dotenv

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
    with open("embedded_faqs.json", 'r', encoding='utf-8') as f:
        extracted_faqs = json.load(f)
    print(f"Successfully loaded {len(extracted_faqs)} FAQs from JSON for database upload.")
except FileNotFoundError:
    print("Error: 'extracted_faqs_with_embeddings.json' not found. Please run scraping and embedding first.")
    exit()
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}. File might be corrupted.")
    exit()

print("\n--- Starting full database insertion ---")

conn = None
try:
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )
    cur = conn.cursor()
    print("Successfully connected to PostgreSQL database.")

    data_to_insert = []
    for faq in extracted_faqs: 
        tags_value = faq.get('tags', [])
        suggestions_value = json.dumps(faq.get('suggestions', [])) 
        
        embedding_value = faq.get('question_embedding') 

        if (faq.get('question') and faq.get('question') != "N/A" and
            faq.get('answer') and faq.get('answer') != "Answer content element not found on this article page." and
            embedding_value is not None):
            
            data_to_insert.append((
                faq['question'],
                faq['answer'],
                tags_value,
                faq.get('full_url'),
                suggestions_value,
                embedding_value
            ))
        else:
            print(f"Skipping insertion for FAQ: '{faq.get('question', 'N/A')[:70]}...' due to missing essential data or embedding.")

    if data_to_insert:
        insert_query = """
        INSERT INTO faqs (question, answer, tags, url, suggestions, embedding)
        VALUES %s
        """
        extras.execute_values(
            cur,
            insert_query,
            data_to_insert
        )
        conn.commit()
        print(f"Successfully inserted {len(data_to_insert)} FAQs into the 'faqs' table.")
    else:
        print("No valid FAQs to insert into the database.")

except psycopg2.Error as e:
    print(f"Database error occurred: {e}")
    if conn:
        conn.rollback()
except Exception as e:
    print(f"An unexpected error occurred during database operation: {e}")
finally:
    if conn:
        cur.close()
        conn.close()
        print("PostgreSQL connection closed.")

print("--- Database insertion process complete. ---")