import { asyncHandler } from "../Utils/asyncHandler.js";
import { Category } from "../Models/category.model.js";
import ApiResponse from "../Utils/Apiresponse.js";
import Apierror from "../Utils/ApiError.js";
import { Product } from "../Models/product.model.js";

const createCategory=asyncHandler(async(req,res)=>{

    const categories = [
        { name: "Electronics", description: "Devices and gadgets including smartphones, laptops, cameras, and audio equipment." },
        { name: "Clothing", description: "Apparel for men, women, and children, including shirts, pants, dresses, and accessories." },
        { name: "Home & Kitchen", description: "Products for home improvement and kitchen needs, such as appliances, cookware, and furniture." },
        { name: "Books", description: "A wide range of books including fiction, non-fiction, textbooks, and educational materials." },
        { name: "Toys & Games", description: "Toys and games for children and adults, including action figures, puzzles, board games, and educational toys." },
        { name: "Beauty & Personal Care", description: "Products related to personal grooming and beauty, such as skincare products, cosmetics, and hair care items." }
      ];

     const resposne= await Category.insertMany(categories)
})




const getCategories=asyncHandler(async(req,res)=>{

    const allcategories=await Category.find({}).select("-description -createdAt -updatedAt")

    return res.json(
        new ApiResponse(
            200,
            allcategories,
            "successfully fetched all categories"
        )
    )
})

const insertProducts=asyncHandler(async(req,res)=>{

    // id is sent as a string 
    // it is automatically converted in to objectId
    const{name,description,price,stock,category,brand}=req.body
// it checks if the price and stock are empty or not
    if(!price || ! stock)
    {
        throw new Apierror(401,"Please provide category and stock value")
    }

    // find method works only with the string
    if([name,description,brand,category].find((field)=>field.trim() === ""))
    {
        throw new Apierror(400,"All fields are required")
    }

    const existingProduct=await Product.findOne({
        name,
        category
    })

    if(existingProduct)
    {
        throw new Apierror(401,"the product already exists in the database ")
    }

    const createdProduct=await Product.create({
        name,
        description,
        price,
        stock,
        category,
        brand
    })


    const products = [
        // Electronics (66ce0a04ee0d0158f3864407)
        {
          name: "Bluetooth Wireless Headphones",
          description: "Noise-canceling wireless headphones with 20-hour battery life.",
          price: 120,
          stock: 150,
          category: "66ce0a04ee0d0158f3864407",
          brand: "SoundBeat"
        },
        {
          name: "4K Smart TV",
          description: "50-inch Ultra HD Smart TV with streaming apps.",
          price: 700,
          stock: 30,
          category: "66ce0a04ee0d0158f3864407",
          brand: "TechVision"
        },
        {
          name: "Smartphone",
          description: "Latest model with 128GB storage and 5G connectivity.",
          price: 999,
          stock: 80,
          category: "66ce0a04ee0d0158f3864407",
          brand: "NextGen"
        },
        {
          name: "Wireless Charging Pad",
          description: "Qi-certified fast wireless charger for smartphones.",
          price: 35,
          stock: 200,
          category: "66ce0a04ee0d0158f3864407",
          brand: "ChargeX"
        },
        {
          name: "Laptop",
          description: "15-inch laptop with Intel i7 processor and 16GB RAM.",
          price: 1300,
          stock: 60,
          category: "66ce0a04ee0d0158f3864407",
          brand: "PowerTech"
        },
      
        // Clothing (66ce0a04ee0d0158f3864408)
        {
          name: "Casual Shirt",
          description: "Slim-fit casual shirt for men.",
          price: 40,
          stock: 100,
          category: "66ce0a04ee0d0158f3864408",
          brand: "UrbanWear"
        },
        {
          name: "Denim Jeans",
          description: "Classic blue jeans with stretch for comfort.",
          price: 50,
          stock: 200,
          category: "66ce0a04ee0d0158f3864408",
          brand: "DenimCo"
        },
        {
          name: "Summer Dress",
          description: "Lightweight floral dress for women.",
          price: 60,
          stock: 120,
          category: "66ce0a04ee0d0158f3864408",
          brand: "BloomFashion"
        },
        {
          name: "Leather Jacket",
          description: "Genuine leather jacket for a stylish look.",
          price: 180,
          stock: 40,
          category: "66ce0a04ee0d0158f3864408",
          brand: "EliteLeather"
        },
        {
          name: "Sports Tracksuit",
          description: "Athletic tracksuit for men and women.",
          price: 90,
          stock: 70,
          category: "66ce0a04ee0d0158f3864408",
          brand: "FitGear"
        },
      
        // Home & Kitchen (66ce0a04ee0d0158f3864409)
        {
          name: "Blender",
          description: "High-speed blender for smoothies and shakes.",
          price: 75,
          stock: 90,
          category: "66ce0a04ee0d0158f3864409",
          brand: "BlendMaster"
        },
        {
          name: "Coffee Maker",
          description: "Single-serve coffee maker with multiple brew sizes.",
          price: 120,
          stock: 60,
          category: "66ce0a04ee0d0158f3864409",
          brand: "BrewPro"
        },
        {
          name: "Microwave Oven",
          description: "1000-watt microwave with multiple power levels.",
          price: 140,
          stock: 80,
          category: "66ce0a04ee0d0158f3864409",
          brand: "HeatWave"
        },
        {
          name: "Air Fryer",
          description: "Oil-less air fryer for healthy cooking.",
          price: 130,
          stock: 70,
          category: "66ce0a04ee0d0158f3864409",
          brand: "CrispyCook"
        },
        {
          name: "Non-Stick Cookware Set",
          description: "10-piece non-stick cookware set for all types of cooking.",
          price: 200,
          stock: 50,
          category: "66ce0a04ee0d0158f3864409",
          brand: "ChefMaster"
        },
      
        // Books (66ce0a04ee0d0158f386440a)
        {
          name: "The Catcher in the Rye",
          description: "A classic novel by J.D. Salinger.",
          price: 15,
          stock: 200,
          category: "66ce0a04ee0d0158f386440a",
          brand: "Penguin Classics"
        },
        {
          name: "1984",
          description: "Dystopian novel by George Orwell.",
          price: 12,
          stock: 150,
          category: "66ce0a04ee0d0158f386440a",
          brand: "Penguin Classics"
        },
        {
          name: "Clean Code",
          description: "A handbook of agile software craftsmanship by Robert C. Martin.",
          price: 35,
          stock: 100,
          category: "66ce0a04ee0d0158f386440a",
          brand: "TechBooks"
        },
        {
          name: "Educated",
          description: "A memoir by Tara Westover.",
          price: 18,
          stock: 180,
          category: "66ce0a04ee0d0158f386440a",
          brand: "Random House"
        },
        {
          name: "To Kill a Mockingbird",
          description: "A novel by Harper Lee.",
          price: 14,
          stock: 130,
          category: "66ce0a04ee0d0158f386440a",
          brand: "HarperPerennial"
        },
      
        // Toys & Games (66ce0a04ee0d0158f386440b)
        {
          name: "Action Figure Set",
          description: "Superhero action figure set for kids.",
          price: 25,
          stock: 300,
          category: "66ce0a04ee0d0158f386440b",
          brand: "HeroPlay"
        },
        {
          name: "Board Game",
          description: "Strategy board game for family fun.",
          price: 45,
          stock: 80,
          category: "66ce0a04ee0d0158f386440b",
          brand: "GameMaster"
        },
        {
          name: "Remote Control Car",
          description: "Fast racing remote control car with rechargeable battery.",
          price: 70,
          stock: 60,
          category: "66ce0a04ee0d0158f386440b",
          brand: "ZoomPlay"
        },
        {
          name: "Jigsaw Puzzle",
          description: "1000-piece puzzle for all ages.",
          price: 20,
          stock: 150,
          category: "66ce0a04ee0d0158f386440b",
          brand: "PuzzleMasters"
        }
      ];

      await Product.insertMany(products)


    const populatedProduct=await Product.findById(createdProduct._id).populate("category")

    if(!createdProduct)
    {
        throw new Apierror(500,"Error creating the product")
    }


    res.json(
        new ApiResponse(
            200,
            populatedProduct,
            "product added successfully"
        )
    )

})

const searchProducts=asyncHandler(async(req,res)=>{

const searchQuery={
name:{$regex:req.query.name,$options:"i"}
}

const searchResults=await Product.find(searchQuery).populate("category","-createdAt -updatedAt")

if(!searchResults)
{
    throw new Apierror(401,"no product found")
}


res.json(
    new ApiResponse(
        200,
        searchResults,
        "searched successfully"

    )
)

})

const getAllProducts=asyncHandler(async(req,res)=>{
// variables from querty object is always a string
    const criteria=parseInt(req.query.sort)
    const searchQuery={}
    if(!criteria)
    {
        const allProducts=await Product.find(searchQuery).populate("category","-createdAt -updatedAt")

        res.json(
            new ApiResponse(
                200,
                allProducts,
                "fetched products succesfully"
            )
        )

    }

    const sortedProducts=await Product.find(searchQuery).sort({price:criteria})

    res.json(
        new ApiResponse(
            200,
            sortedProducts,
            "successfully fetched sorted products"
        )
    )





})



export{
    createCategory,
    getCategories,
    insertProducts,
    searchProducts,
    getAllProducts
}