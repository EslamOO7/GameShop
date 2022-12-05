const express = require('express');
const { check, body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user')
const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [check('email').isEmail().withMessage('please enter a valid email').normalizeEmail(), check('password', 'Password has to be valid.')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()],authController.postLogin);

router.post('/signup', [check('email').isEmail().withMessage("please enter a valid email").normalizeEmail()
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E - Mail exists already, please pick a different one.')
            }
        })
    }),
        check('password', 'Please enter only numbers and letters at least 5 characters.!!!').isLength({ min: 5 }).isAlphanumeric().trim(), check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password is not match")
            }
            return true
        }).trim()], authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
