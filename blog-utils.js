// Calculate and display read time for blog pages
function addReadTimeToBlogs() {
    const blogContent = document.querySelector('.blog-content');
    const blogMeta = document.querySelector('.blog-meta');

    if (!blogContent || !blogMeta) return;

    // Calculate read time based on word count
    const wordCount = blogContent.innerText.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    const readTime = Math.max(1, readTimeMinutes); // Minimum 1 minute

    // Create read time element
    const readTimeItem = document.createElement('div');
    readTimeItem.className = 'blog-meta-item';
    readTimeItem.innerHTML = `<span>⏱️</span><span>${readTime} min read</span>`;

    // Insert after the date
    const firstMetaItem = blogMeta.querySelector('.blog-meta-item');
    if (firstMetaItem && firstMetaItem.nextSibling) {
        blogMeta.insertBefore(readTimeItem, firstMetaItem.nextSibling);
    } else {
        blogMeta.appendChild(readTimeItem);
    }
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', addReadTimeToBlogs);
