import re

def clean_markdown(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    cleaned_lines = []
    
    # Regex for headers
    # Matches "\### 2. TITLE" or "### 2. TITLE" or "# 2. TITLE" or "1\. TITLE"
    # We want to capture the number and the title
    header_pattern = re.compile(r'^\\?#*\s*(\d+\.|GDPR)\\?\.?\s+(.*)')

    for line in lines:
        content = line
        
        # Fix bold
        content = content.replace(r'\*\*', '**')
        
        # Fix escaped dots in headers like "1\."
        content = content.replace(r'1\.', '1.') 
        
        # Fix escaped headers
        content = content.replace(r'\#', '#')
        
        # Fix headers
        stripped = content.strip()
        match = header_pattern.match(stripped)
        if match:
             # It's a header
             number = match.group(1)
             title = match.group(2)
             content = f"# {number} {title}\n"
        
        # Remove horizontal rules
        if content.strip() == '---':
            continue
            
        # Remove Notion links if any remain in text
        content = re.sub(r'\[\*\*(.*?)\*\*\]\(https://www\.notion\.so/.*?\)', r'\1', content)
        content = re.sub(r'\[(.*?)\]\(https://www\.notion\.so/.*?\)', r'\1', content)
        
        # Remove escaped list items "\-"
        if content.strip().startswith(r'\-'):
            content = content.replace(r'\-', '-')

        cleaned_lines.append(content)

    # Remove excessive newlines
    final_lines = []
    last_was_newline = False
    for line in cleaned_lines:
        if line.strip() == "":
            if not last_was_newline:
                final_lines.append(line)
                last_was_newline = True
        else:
            final_lines.append(line)
            last_was_newline = False

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)

if __name__ == "__main__":
    clean_markdown('OBCHODNI_PODMINKY.md', 'OBCHODNI_PODMINKY_CLEAN.md')
