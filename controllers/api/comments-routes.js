const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        // Verifies if the user is logged in to avoid posting without the username.
        if (req.session.logged_in) {
            const newComment = await Comment.create({
                comment: req.body.comment,
                post_id: req.body.postId,
                user_id: req.session.user_id,
            });
            res.status(200).json(newComment);
        }
        else {
            res.redirect('/login');
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

