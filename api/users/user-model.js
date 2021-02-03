// user-model
const db = require('../../data/db-config');

module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove
};

async function find() {
    const users = await db('users');
    return users;
};

async function findById(id) {
    const [postId] = await db('users').where({ id });
    return postId;
};

async function findPosts(id) {
    const posts = await db('posts')
        .join('users', 'users.id', 'posts.user_id')
        .select('posts.id', 'users.username', 'posts.contents')
        .where({ user_id: id });
    return posts;
};

async function add(user) {
    const newUserId = await db('users').insert(user);
    const newUser = await findById(newUserId);
    return newUser;
};

 async function update(id, changes) {
     const count = await('users').where({ id }).update(changes);
     return count;
 };

 async function remove(id) {
     const count = await db('users').where({ id }).del();
     return count;
 }