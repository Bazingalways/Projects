from sentence_transformers import SentenceTransformer
import json 
print("\n--- Starting embedding of questions ---")
input_filename = "embedded_faqs.json"

try:
    with open(input_filename, 'r', encoding='utf-8') as f:
        extracted_faqs = json.load(f)
    print(f"Successfully loaded data from {input_filename}")
    print(f"Number of loaded FAQs: {len(extracted_faqs)}")
    print(extracted_faqs[0])

except FileNotFoundError:
    print(f"Error: The file '{input_filename}' was not found. Please ensure it's in the correct directory.")
except json.JSONDecodeError as e:
    print(f"Error decoding JSON from '{input_filename}': {e}. The file might be corrupted or not valid JSON.")
except Exception as e:
    print(f"An unexpected error occurred while loading the file: {e}")

try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Sentence-Transformer model loaded successfully.")
except Exception as e:
    print(f"Error loading Sentence-Transformer model: {e}")
    print("Please check your internet connection or try a different model name.")
    exit()

for i, faq in enumerate(extracted_faqs):
    question_text = faq["question"]
    if question_text and question_text != "N/A":
        try:
            embedding = model.encode(question_text)
            faq['question_embedding'] = embedding.tolist()
            # print(f"  --> Embedded question {i+1}: '{question_text[:50]}...'")
        except Exception as e:
            print(f"  --> Error embedding question {i+1} ('{question_text[:50]}...'): {e}")
            faq['question_embedding'] = None
    else:
        print(f"  --> Skipping embedding for FAQ {i+1} due to missing or N/A question text.")
        faq['question_embedding'] = None

print("--- Question embedding complete. ---")

print("\n--- Sample FAQ with embedding ---")
if extracted_faqs:
    print(extracted_faqs[0])
    if 'question_embedding' in extracted_faqs[0]:
        print(f"\nExample embedding length: {len(extracted_faqs[0]['question_embedding'])}")
else:
    print("No FAQs to display.")

# --- Next recommended step: Save the updated data (e.g., to JSON) ---
output_filename = "embedded_faqs.json"
try:
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(extracted_faqs, f, indent=4, ensure_ascii=False)
    print(f"\nData with embeddings successfully saved to {output_filename}")
except Exception as e:
    print(f"Error saving data to JSON: {e}")