// src/routes/commonRoute.js
const express = require('express');
const router = express.Router();

// Correct import path of all Controller
const HomeController = require('../controllers/HomeController');
const OrderController = require('../controllers/OrderController');
 
// Route for HomeController
router.get('/FetchSlider', HomeController.FetchSlider);//list category route
router.get('/FetchCategory', HomeController.FetchCategory);//list category route
router.get('/FetchLetestDesign', HomeController.FetchLetestDesign);//list category route
router.get('/FetchShopByType', HomeController.FetchShopByType);//list category route
router.get('/FetchTraditionalJwalelryAndAllProduct',HomeController.FetchTraditionalJwalelryAndAllProduct)
router.get('/FetchAllProduct',HomeController.FetchAllProduct)
router.get('/FetchProductByReels',HomeController.FetchProductByReels)
router.get('/fetchStates/:id',HomeController.fetchStates)
router.get('/fetchCities/:id',HomeController.fetchCities)
router.post('/placeOrder',OrderController.placeOrder)
router.post('/fetchRecommendedProduct',OrderController.fetchRecommendedProduct)
// router.get('/fetch-customer/:id',OrderController.fetchCustomer)
router.post('/fetch-orders',OrderController.fetchOrders)
router.post('/fetch-address',OrderController.fetchAddress)


module.exports = router;
