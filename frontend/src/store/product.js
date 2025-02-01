import { create } from 'zustand';

// global state
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (product) => {
    try {
      const res = await fetch('/api/products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await res.text(); // Get response as text
      const data = text ? JSON.parse(text) : {}; // Parse the text if not empty

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, msg: 'Product created successfully' };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: 'Product creation failed' };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      // console.log('Fetched data:', data); // Log the received data
      set({ products: data.message });
    } catch (error) {
      console.error('Fetch products failed:', error);
    }
  },
  deleteProducts: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if(!data.success) {
      return {success: false, message: data.message }
    }
    set((state) => ({products: state.products.filter(product => product._id !== pid)}))
    return {success: true, message: data.message}
  },
  updateProducts: async (pid, updatedData) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PATCH",
      headers: {
        "Contenet-Type" : "application/json",
      },
      body: JSON.stringify(updatedData)
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message}
    set((state)=>({
      products: state.products.map((product) => product._id === pid ? data.data : product)
    }))
  }
}));
