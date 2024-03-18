"use client";

import React, { useState } from 'react';
import Modal from './Modal';
import styles from './blog.module.css';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Blogpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [blogs, setBlogs] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]); // Update image state when a file is selected
  const handleEditorChange = (content) => setContent(content);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert("Please fill out all fields and upload an image before submitting.");
      return;
    }
    const newBlog = { title, description, image };
    setBlogs([...blogs, newBlog]);
    setTitle('');
    setDescription('');
    setImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.blogPageContainer}>
      <button onClick={() => setIsModalOpen(true)} className={styles.addBlogButton}>
        + Add Blog
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className={styles.blogForm}>
          <div className={styles.formRow}>
            <div className={styles.titleField}>
              <label htmlFor="title">Title</label>
              <input id="title" className={styles.inputField} value={title} onChange={handleTitleChange} />
            </div>
            <div className={styles.descriptionField}>
              <label htmlFor="description">Description</label>
              <textarea id="description" className={styles.textAreaField} value={description} onChange={handleDescriptionChange} />
            </div>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit" className={styles.createBlogButton}>Create Blog Post</button>
        </form>
      </Modal>

      <div className={styles.blogsDisplay}>
        {blogs.map((blog, index) => (
          <div key={index} className={styles.blogPost}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            {blog.image && <img src={URL.createObjectURL(blog.image)} alt="Blog Post" />}
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogpage;
