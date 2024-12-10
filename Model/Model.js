const inMemory = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ],
  posts: [
    { id: 1, title: 'Post 1', content: 'This is post 1', userId: 1 },
    { id: 2, title: 'Post 2', content: 'This is post 2', userId: 2 },
  ],
  comments: [
    { id: 1, postId: 1, content: 'This is comment 1' },
    { id: 2, postId: 1, content: 'This is comment 2' },
    { id: 3, postId: 2, content: 'This is comment 3' },
  ],

  async getData() {    
    return {
      users: this.users,
      posts: this.posts,
      comments: this.comments,
    };
  },

  // Method to add data dynamically
  async addData({ type, data }) {
    console.log("post api called..");
    if (!this[type]) {
      throw new Error(`Collection "${type}" does not exist.`);
    }

    // Add an `id` if it doesn't exist
    const newId = this[type].length ? this[type][this[type].length - 1].id + 1 : 1;
    const newData = { id: newId, ...data };

    this[type].push(newData);

    return newData;
  },
}


export default inMemory