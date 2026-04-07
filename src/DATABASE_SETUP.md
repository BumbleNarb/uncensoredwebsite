# Redakted E-Commerce - Database Setup Guide

## ✅ What's Been Done

Your Redakted clothing brand website is now connected to a **Supabase database**! Here's what changed:

### 🔄 Changes Made:

1. **Backend API Created** (`/supabase/functions/server/index.tsx`)
   - GET `/products` - Fetch all products
   - GET `/products/:category` - Fetch products by category
   - POST `/products` - Add new products

2. **Product Cards Simplified** (`/components/ProductListing.tsx`)
   - Cards now show: **Image, Name, Price** only
   - Click any card → Opens detailed popup modal
   - Modal shows: All details, colors, sizes, description, + "Add to Cart"

3. **Admin Page Created** (`/pages/AdminPage.tsx`)
   - Easy form to add products through the UI
   - Access at: `http://localhost:5173/admin`

### 📊 Product Data Structure:

```javascript
{
  name: "Product Name",
  price: 89.00,
  image: "https://image-url.com/photo.jpg",
  colors: ["#FFFFFF", "#000000", "#808080"],
  sizes: ["S", "M", "L", "XL"],
  category: "essentials" | "men" | "women" | "others",
  description: "Product description here"
}
```

---

## 🚀 How to Use

### Option 1: Add Products via Admin Page (Easiest!)

1. Go to `http://localhost:5173/admin`
2. Fill in the form:
   - Product name
   - Price (in RM)
   - Image URL (use Unsplash or any image link)
   - Category (essentials/men/women/others)
   - Colors (comma-separated hex codes: `#FFFFFF, #000000`)
   - Sizes (comma-separated: `S, M, L, XL`)
   - Description
3. Click "Add Product"
4. Product appears in the category page immediately!

### Option 2: Add Products Programmatically

Open browser console and run:

```javascript
const addProduct = async () => {
  const response = await fetch(
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-32210018/products',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_PUBLIC_KEY'
      },
      body: JSON.stringify({
        name: 'Classic White T-Shirt',
        price: 89.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        colors: ['#FFFFFF', '#000000'],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'essentials',
        description: 'Premium cotton t-shirt'
      })
    }
  );
  console.log(await response.json());
};

addProduct();
```

---

## 💾 Can You Still Download and Work Locally?

**YES! Nothing changes about your workflow:**

✅ Edit code in VS Code  
✅ Run `npm run dev` on localhost  
✅ Download/backup your code anytime  
✅ All changes sync with the database  

**The database lives in the cloud (Supabase), your code runs locally!**

---

## 🎨 How It Works Now

1. **Before:** Products were hardcoded in the component
2. **Now:** Products are fetched from Supabase database

### Product Display Flow:
```
User visits /category/essentials
    ↓
App fetches from Supabase API
    ↓
Shows simplified cards (image + name + price)
    ↓
User clicks card
    ↓
Opens popup with FULL details (colors, sizes, description)
    ↓
User selects size → Adds to cart
```

---

## 📝 Sample Products (For Testing)

Here are some sample products you can add via the admin page:

**Essentials:**
- Classic White T-Shirt - RM 89.00
- Oversized Hoodie - RM 149.00

**Men:**
- Slim Fit Denim Jacket - RM 299.00
- Tailored Blazer - RM 399.00

**Women:**
- Floral Summer Dress - RM 189.00
- Silk Blouse - RM 129.00

**Others:**
- Leather Crossbody Bag - RM 159.00
- Minimalist Watch - RM 249.00

---

## 🔍 Troubleshooting

**No products showing?**
- Make sure you've added products via `/admin` page
- Check browser console for errors
- Verify Supabase connection is working

**Products not appearing in correct category?**
- Check the category field matches exactly: `essentials`, `men`, `women`, or `others` (lowercase)

**Image not showing?**
- Use direct image URLs (Unsplash works great!)
- Example: `https://images.unsplash.com/photo-xxxxx`

---

## 🎯 Next Steps

1. Visit `/admin` and add your first product
2. Go to the category page to see it displayed
3. Click the product card to see the detailed popup
4. Select a size and add to cart

**Your site is fully functional with real database integration!** 🎉
