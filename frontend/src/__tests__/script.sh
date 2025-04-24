#!/bin/bash

# Рекурсивный поиск всех файлов с расширением .test.jsx и их переименование в .test.tsx
find . -type f -name "*.test.jsx" | while read -r file; do
  # Создание нового имени файла с расширением .test.tsx
  new_file="${file%.test.jsx}.test.tsx"
  
  # Переименование файла
  mv "$file" "$new_file"
  echo "Переименован файл: $file -> $new_file"
done