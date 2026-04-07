import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Create storage bucket on startup
const bucketName = 'make-32210018-products';
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: true, // Make bucket public so images are accessible
      });
      console.log(`Created bucket: ${bucketName}`);
    }
  } catch (error) {
    console.log(`Error creating bucket: ${error}`);
  }
})();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-32210018/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all products
app.get("/make-server-32210018/products", async (c) => {
  try {
    const products = await kv.getByPrefix("product:");
    return c.json({ products });
  } catch (error) {
    console.log(`Error fetching products: ${error}`);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

// Get products by category
app.get("/make-server-32210018/products/:category", async (c) => {
  try {
    const category = c.req.param("category");
    const allProducts = await kv.getByPrefix("product:");
    const categoryProducts = allProducts.filter(
      (p: any) => p.category?.toLowerCase() === category.toLowerCase()
    );
    return c.json({ products: categoryProducts });
  } catch (error) {
    console.log(`Error fetching products by category: ${error}`);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});

// Add a new product
app.post("/make-server-32210018/products", async (c) => {
  try {
    const product = await c.req.json();
    const productId = `product:${Date.now()}`;
    await kv.set(productId, { ...product, id: productId });
    return c.json({ success: true, id: productId });
  } catch (error) {
    console.log(`Error creating product: ${error}`);
    return c.json({ error: "Failed to create product" }, 500);
  }
});

// Upload product image
app.post("/make-server-32210018/upload-image", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, uint8Array, {
        contentType: file.type,
        cacheControl: '3600',
      });

    if (error) {
      console.log(`Error uploading image: ${error.message}`);
      return c.json({ error: `Failed to upload image: ${error.message}` }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return c.json({ success: true, url: publicUrl });
  } catch (error) {
    console.log(`Error in upload-image endpoint: ${error}`);
    return c.json({ error: "Failed to upload image" }, 500);
  }
});

// Delete a product
app.delete("/make-server-32210018/products/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(id);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting product: ${error}`);
    return c.json({ error: "Failed to delete product" }, 500);
  }
});

Deno.serve(app.fetch);