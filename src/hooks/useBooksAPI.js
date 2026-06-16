// src/hooks/useBooksAPI.js
import { useState, useEffect } from 'react';


export function useBooksAPI(query = 'literatura') {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchBooks() {
      try {
        setLoading(true);
        
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`);
        const data = await response.json();
        
        const formattedBooks = data.docs.map((doc, index) => ({
          id: doc.key ? doc.key.replace('/works/', '') : String(index),
          title: doc.title,
          author: doc.author_name ? doc.author_name[0] : 'Autor Desconhecido',
          coverImage: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null,
          totalPages: doc.number_of_pages_median || 250,
          description: doc.first_sentence ? doc.first_sentence[0] : 'Uma obra incrível disponível para leitura e catalogação na sua biblioteca digital Lume.'
        }));

        if (isMounted) {
          setBooks(formattedBooks);
        }
      } catch (error) {
        console.error("Erro ao buscar livros na API:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, [query]); 
  return { books, loading };
}