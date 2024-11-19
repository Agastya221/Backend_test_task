import express  from "express";
const Router = express.Router()
import { addProduct, getProducts }  from "../controllers/productController";
import { createInventory, increaseInventory, decreaseInventory, getInventory }  from "../controllers/inventoryController";
import { createStore, getStores }  from "../controllers/storeController";
import {getProductHistory} from "../controllers/productActions"
import {addBulkStores_For_testing} from "../blukDataTest/blukInsertFuntions/addblukStore"
import {addProducts} from "../blukDataTest/blukInsertFuntions/addBulkProducts"
import {createBulkInventory} from "../blukDataTest/blukInsertFuntions/addblukInventory"


Router.route("/addProduct").post(addProduct);
Router.route("/createInventory").post(createInventory);
Router.route("/createStore").post(createStore);
Router.route("/increaseInventory").post(increaseInventory); 
Router.route("/decreaseInventory").post(decreaseInventory); 
Router.route("/inventory").get(getInventory); 
Router.route("/product").get(getProducts); 
Router.route("/store").get(getStores); 
Router.route("/productHistory").get(getProductHistory); 
Router.route("/addblukStores").post(addBulkStores_For_testing); 
Router.route("/addblukProducts").post(addProducts); 
Router.route("/addblukInventory").post(createBulkInventory); 
Router.route("/addblukInventory").post(createBulkInventory); 




export default Router