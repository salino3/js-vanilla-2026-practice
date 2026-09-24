import React, { useState } from "react";
import "./dashboard-cart.styles.css";

type Category = "electronics" | "clothing" | "books" | "all";

interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
}

interface Cart extends Product {
  quantity: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "Laptop", price: 999, category: "electronics" },
  { id: 2, name: "T-Shirt", price: 29, category: "clothing" },
  { id: 3, name: "Libro React", price: 39, category: "books" },
];

export function ShopApp() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [category, setCategory] = useState<Category>("all");

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const totalPrice: number = cart.reduce(
    (acc: number, c: Cart) => (acc += c.price * c.quantity),
    0,
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Shop TypeScript</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Filtra per Categoria: </label>
        <select
          onChange={(e) => setCategory(e.target.value as Category)}
          value={category}
        >
          <option value="all">Tutte</option>
          <option value="electronics">Elettronica</option>
          <option value="clothing">Abbigliamento</option>
          <option value="books">Libri</option>
        </select>
      </div>

      <h3>Prodotti</h3>
      <ul>
        {MOCK_PRODUCTS.filter(
          (pFiltered: Product) =>
            category === "all" || pFiltered.category === category,
        ).map((p: Product) => (
          <div key={p.id}>
            <strong>{p.name}</strong> &nbsp;
            <button onClick={() => handleAddToCart(p)}>Add Product</button>
          </div>
        ))}
      </ul>

      <hr />
      <h3>Carrello</h3>
      <ul>
        {cart.map((p: Product) => (
          <div className="containerCart" key={p.id}>
            <span>
              <strong> Name:</strong> <span>{p.name}</span>
            </span>
            <span>
              <strong> Price:</strong> <span>{p.price}</span>
            </span>
            <span>
              <strong> Quantity:</strong> <span>{p.quantity}</span>
            </span>
          </div>
        ))}
      </ul>
      <h4>Totale: {totalPrice} € </h4>
    </div>
  );
}
