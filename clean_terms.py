import re

def clean_markdown(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    cleaned_lines = []
    skip_mode = True # Skip the initial TOC
    
    # Regex for Notion links like [**2. DEFINICE POJMŮ**](https://www.notion.so/...)
    notion_link_pattern = re.compile(r'\[\*\*(.*?)\*\*\]\(https://www\.notion\.so/.*?\)')
    
    # Regex for headers
    # Matches "### 2. TITLE" or "2. TITLE" or "# 2. TITLE"
    header_pattern = re.compile(r'^(#+)?\s*(\d+\.|GDPR)\s+(.*)')

    for line in lines:
        # Check if we are past the TOC
        # The TOC seems to end before "# ÚVODNÍ USTANOVENÍ" or similar
        if skip_mode:
            if line.strip().startswith('# 1. ÚVODNÍ USTANOVENÍ') or line.strip().startswith('1. ÚVODNÍ USTANOVENÍ'):
                skip_mode = False
            elif 'notion.so' in line:
                continue
            elif line.strip() == 'OBCHODNÍ PODMÍNKY':
                continue
            elif line.strip() == '# ÚVODNÍ USTANOVENÍ': # Duplicate header
                continue
            elif line.strip() == '':
                continue
        
        if skip_mode:
            continue

        # Process line
        content = line
        
        # Fix bold
        content = content.replace(r'\*\*', '**')
        
        # Fix headers
        match = header_pattern.match(content.strip())
        if match:
            # Force H1
            number = match.group(2)
            title = match.group(3)
            content = f"# {number} {title}\n"
        
        # Remove horizontal rules if they are just noise
        if content.strip() == '---':
            continue
            
        # Remove escaped brackets if any remain
        content = content.replace(r'\[', '[').replace(r'\]', ']')
        
        cleaned_lines.append(content)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)

if __name__ == "__main__":
    clean_markdown('OBCHODNI_PODMINKY.md', 'OBCHODNI_PODMINKY_CLEAN.md')
