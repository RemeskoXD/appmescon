import re

def clean_markdown(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    cleaned_lines = []
    start_found = False
    
    # Regex for headers
    # Matches "### 2. TITLE" or "2. TITLE" or "# 2. TITLE" or "1\. TITLE"
    header_pattern = re.compile(r'^(#+)?\s*(\d+\.|GDPR)\\?\.?\s+(.*)')

    for i, line in enumerate(lines):
        # Look for the start of the real content
        # We look for "MESCON DIGITAL s.r.o." and go back a bit to "OBCHODNÍ PODMÍNKY"
        if not start_found:
            if "MESCON DIGITAL s.r.o." in line:
                # We found the company name. Now let's look backwards for "OBCHODNÍ PODMÍNKY"
                # But since we are iterating forward, we can just say:
                # If we hit "MESCON DIGITAL", we assume we are in the intro.
                # But we want to capture the "OBCHODNÍ PODMÍNKY" title before it.
                # Let's just hardcode the start:
                cleaned_lines.append("# OBCHODNÍ PODMÍNKY\n\n")
                cleaned_lines.append("pro poskytování služeb v oblasti tvorby webů, e-shopů, webových aplikací, marketingových funnelů, PPC reklamy a grafického designu\n\n")
                cleaned_lines.append(line) # MESCON DIGITAL s.r.o.
                start_found = True
            continue
        
        # Skip lines that are just "OBCHODNÍ PODMÍNKY" or "# ÚVODNÍ USTANOVENÍ" if they appear immediately after start
        # to avoid duplication
        if line.strip() == "OBCHODNÍ PODMÍNKY" or line.strip() == "# ÚVODNÍ USTANOVENÍ":
            continue

        content = line
        
        # Fix bold
        content = content.replace(r'\*\*', '**')
        
        # Fix escaped dots in headers like "1\."
        content = content.replace(r'1\.', '1.') 
        
        # Fix headers
        # We want to catch "1. ÚVODNÍ USTANOVENÍ" and make it "# 1. ÚVODNÍ USTANOVENÍ"
        # We also want to catch "### 2. ..." and make it "# 2. ..."
        
        stripped = content.strip()
        # Check if it starts with a number and dot
        if re.match(r'^\d+\.\s+[A-ZÁ-Ž]', stripped) or re.match(r'^###\s+\d+\.', stripped) or re.match(r'^GDPR', stripped):
             # It's a header
             # Remove existing hashes
             clean_header = stripped.lstrip('#').strip()
             content = f"# {clean_header}\n"
        
        # Remove horizontal rules
        if content.strip() == '---':
            continue
            
        # Remove Notion links if any remain in text
        content = re.sub(r'\[\*\*(.*?)\*\*\]\(https://www\.notion\.so/.*?\)', r'\1', content)
        content = re.sub(r'\[(.*?)\]\(https://www\.notion\.so/.*?\)', r'\1', content)
        
        cleaned_lines.append(content)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)

if __name__ == "__main__":
    clean_markdown('OBCHODNI_PODMINKY.md', 'OBCHODNI_PODMINKY_CLEAN.md')
