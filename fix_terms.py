import re

def clean_title(text):
    # Remove hashes
    text = re.sub(r'^\s*#+\s*', '', text)
    # Remove bold/italic markers
    text = text.replace('**', '').replace('*', '').replace('_', '').strip()
    # Remove leading numbers (e.g., "1.", "2.1", "1.1.")
    text = re.sub(r'^\d+(\.\d+)*\.?\s*', '', text)
    return text.strip()

def is_header(line):
    clean = line.lstrip('#').strip()
    # If it ends with a period/colon and is long, it's a sentence, not a header.
    if (clean.endswith('.') or clean.endswith(':')) and len(clean) > 50:
        return False
    # If it starts with a number but is a sentence
    if re.match(r'^\d+\.\s+[A-Z][a-z]', clean) and len(clean) > 50:
        return False
    
    return True

with open('OBCHODNI_PODMINKY.md', 'r') as f:
    lines = f.readlines()

h1_count = 0
h2_count = 0

new_lines = []

for line in lines:
    stripped = line.strip()
    
    # Special case for "3. SLUŽBY"
    if stripped.startswith('3. SLUŽBY – OBECNÁ USTANOVENÍ'):
        h1_count += 1
        h2_count = 0
        title = clean_title(stripped)
        new_lines.append(f'# {h1_count}. {title}\n')
        continue

    if stripped.startswith('# '):
        if is_header(stripped):
            title = clean_title(stripped)
            if title.upper() == 'OBCHODNÍ PODMÍNKY':
                 new_lines.append(f'# {title}\n')
                 h1_count = 0
            else:
                h1_count += 1
                h2_count = 0
                new_lines.append(f'# {h1_count}. {title}\n')
        else:
            # Convert to bullet
            content = stripped.lstrip('#').strip()
            content = re.sub(r'^\d+\.\s*', '', content) # Remove "1. "
            content = content.replace('**', '') # Remove bold if it was bolded
            new_lines.append(f'- {content}\n')
            
    elif stripped.startswith('## '):
        h2_count += 1
        title = clean_title(stripped)
        new_lines.append(f'## {h1_count}.{h2_count} {title}\n')
        
    else:
        new_lines.append(line)

with open('OBCHODNI_PODMINKY_CLEAN.md', 'w') as f:
    f.writelines(new_lines)
