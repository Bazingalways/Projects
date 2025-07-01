import requests
from bs4 import BeautifulSoup
import time
import json

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import WebDriverException, TimeoutException

url = "https://www.askiitm.com/resources?tab=resources-quickreads"
QUESTION_ELEMENT_CLASS = 'articel-chip-title'
ANSWER_CONTENT_CLASS = "articles-rtf"
SUGGESTIONS_CONTAINER_CLASS = "reads-collection-list-wrapper"

extracted_faqs = []

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument(f"user-agent={HEADERS['User-Agent']}")

try:
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    print("--- Selenium WebDriver initialized successfully. ---")
except WebDriverException as e:
    print(f"Error initializing Selenium WebDriver: {e}")
    print("Please ensure Chrome browser is installed and check your internet connection.")
    exit()

print("--- Starting initial page fetch (using requests for main page) ---")
try:
    content = requests.get(url, headers=HEADERS)
    content.raise_for_status() 
    soup = BeautifulSoup(content.text, 'html.parser')
    print("--- Initial page fetched successfully. ---")
except requests.exceptions.RequestException as e:
    print(f"Error fetching the Quick Reads page: {e}")
    driver.quit()
    exit()

quickread_cards = soup.find_all('div', class_='reads-collection-item') 
if not quickread_cards:
    print("Can't find any quickread cards. Check 'reads-collection-item' class or page content.")
    driver.quit()
else:
    print(f"--- Found {len(quickread_cards)} quickread cards. Starting first pass... ---")
    for i, card in enumerate(quickread_cards): 
        tags_list = []
        question_text = "N/A"
        full_url = None

        full_url_element = card.find('a', class_='link-block') 
        if full_url_element:
            relative_url = full_url_element.get('href')
            if relative_url:
                if relative_url.startswith('http'):
                    full_url = relative_url
                else:
                    full_url = "https://www.askiitm.com" + relative_url

        question_element = card.find('h3', class_=QUESTION_ELEMENT_CLASS) 
        if question_element:
            question_text = question_element.get_text(strip=True)
        
        tag_elements = card.find_all('div', class_=['label-style-11', 'chips']) 
        for tag_el in tag_elements:
            tags_list.append(tag_el.get_text(strip=True))
        
        extracted_faqs.append({
            "question": question_text,
            "full_url": full_url,
            "tags": tags_list, 
            "answer": "YET TO SCRAPE",
            "suggestions":[]
        })
    print(f"--- First pass complete. {len(extracted_faqs)} FAQs extracted for further processing. ---")


print("\n--- Starting second pass: Scraping individual article pages (using Selenium) ---")
for q, faq in enumerate(extracted_faqs):
    suggestions = [] 
    
    article_url = faq["full_url"]
    
    # print(f"\n[{q+1}/{len(extracted_faqs)}] Processing FAQ: '{faq['question'][:70]}...'")

    if not article_url:
        print(f"  --> Skipping: No valid article URL found for this FAQ.")
        continue
    
    # print(f"  --> Attempting to fetch article with Selenium: {article_url}")
    try:
        driver.get(article_url)
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, ANSWER_CONTENT_CLASS))
        )
        # print(f"  --> Page loaded and answer element '{ANSWER_CONTENT_CLASS}' is present.")
        
        article_html_source = driver.page_source
        article_soup = BeautifulSoup(article_html_source, 'html.parser')

        answer_element = article_soup.find('div', class_=ANSWER_CONTENT_CLASS) 
        if answer_element:
            faq['answer'] = answer_element.get_text(separator='\n', strip = True)
            # print(f"  --> Answer content found and updated in FAQ data.")
        else:
            faq['answer'] = "Answer content element not found (even after wait) on this article page."
            print(f"  --> CRITICAL WARNING: Answer element '{ANSWER_CONTENT_CLASS}' NOT found in BeautifulSoup after Selenium fetch for {article_url}")

        suggestions_container = article_soup.find('div',class_=SUGGESTIONS_CONTAINER_CLASS) 
        if suggestions_container:
            # print(f"  --> Found suggestions_container.")
            sq_card = suggestions_container.find_all("div", class_="reads-collection-item") 
            # print(f"  --> Found {len(sq_card)} suggested questions.")

            for sq in sq_card:
                sq_text_element = sq.find('h3', class_="articel-chip-title")
                sq_link_element = sq.find('a', class_="link-block")

                if sq_text_element and sq_link_element:
                    sq_text = sq_text_element.get_text(strip=True)
                    sq_href = sq_link_element.get('href')
                    
                    full_sq_url = None
                    if sq_href:
                        if sq_href.startswith('http'):
                            full_sq_url = sq_href
                        else:
                            full_sq_url = "https://www.askiitm.com" + sq_href
                    
                    if sq_text:
                        suggestions.append({
                            "text": sq_text,
                            "url": full_sq_url
                        })
            
            faq['suggestions'] = suggestions
            print(f"  --> {len(suggestions)} suggestions collected and updated for this FAQ.")
        else:
            print(f"  --> WARNING: Suggestions container '{SUGGESTIONS_CONTAINER_CLASS}' NOT found for {article_url}. Suggestions will remain empty.")
            
    except TimeoutException:
        faq['answer'] = f"Timed out waiting for page to load or element to appear: {article_url}"
        faq['suggestions'] = []
        print(f"  --> ERROR: Timeout fetching article URL {article_url}")
    except WebDriverException as e:
        faq['answer'] = f"Selenium WebDriver error: {e}"
        faq['suggestions'] = []
        print(f"  --> ERROR: Selenium WebDriver issue for {article_url}: {e}")
    except Exception as e:
        faq['answer'] = f"An unexpected error occurred: {e}"
        faq['suggestions'] = []
        print(f"  --> UNEXPECTED ERROR: {e} for {article_url}")
    
    time.sleep(0.5) 

driver.quit()
print("\n--- Selenium WebDriver closed. ---")

print("\n--- All article pages processed. ---")
output_filename = "extracted_faqs.json"
with open(output_filename, 'w', encoding='utf-8') as f:
    json.dump(extracted_faqs, f, indent=4, ensure_ascii=False)
print(f"\nData successfully saved to {output_filename}")