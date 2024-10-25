import React from "react"
import { useState } from "react"

function Article({returnToHomePage}) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorEmail, setAuthorEmial] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newArticle = {
            title,
            content,
            author: { name: authorName, email: authorEmail },
            tags: tags.split(" ").map(tag => tag.trim()),
        };

        try {
            const response = await fetch(`${apiURL}/wiki`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(articleData) // Send the article data here
            });
      
            if (response.ok) {
              const data = await response.json(); // Parse the JSON response
              console.log('Article created:', data); // Log the created article
              returnToHomePage(); // Go back to the home page after successful submission
            } else {
              console.error('Failed to create article');
            }
          } catch (err) {
            console.error('Error submitting article:', err);
          }

    }

    return(
    <>
    <h1>Create an Article</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Title:</label>
            <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required/>
        </div>
        <div>
            <label>Content:</label>
            <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required/>
        </div>
        <div>
            <label>Author Name:</label>
            <input
            type="text"
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            required/>
        </div>
        <div>
            <label>Author Email:</label>
            <input
            type="email"
            value={authorEmail}
            onChange={(event) => setAuthorEmial(event.target.value)}
            required/>
        </div>
        <div>
            <label>Tags:</label>
            <input
            type="text"
            value={tags}
            onChange={(event) => setTitle(event.target.value)}
            />
        </div>
    </form>
    <button onClick={returnToHomePage}>Return to Home Page</button>
    
    </>)
}

export default Article;