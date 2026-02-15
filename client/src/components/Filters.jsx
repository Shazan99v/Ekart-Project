import { useEffect, useState } from "react";

export default function Filters({ products, setFiltered }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(100000);

  const categories = ["All", "Mobile", "Laptop", "Headphone"];
  const brands = ["All", "Apple", "Samsung", "HP"];

  /* ================= APPLY FILTERS AUTO ================= */

  useEffect(() => {
    let data = [...products];

    // Search
    if (search.trim()) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      data = data.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Brand
    if (brand !== "All") {
      data = data.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    // Price
    data = data.filter((p) => Number(p.price) <= Number(price));

    setFiltered(data);

  }, [search, category, brand, price, products]);

  /* ================= RESET ================= */

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPrice(100000);
  };

  /* ================= UI ================= */

  return (
    <div className="filters">

      <h2 className="filter-title">Filter Products</h2>

      {/* SEARCH */}
      <div className="filter-group">

        <label>Search Product</label>

        <input
          type="text"
          placeholder="Type product name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* CATEGORY */}
      <div className="filter-group">

        <label>Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

      </div>

      {/* BRAND */}
      <div className="filter-group">

        <label>Brand</label>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

      </div>

      {/* PRICE */}
      <div className="filter-group">

        <label>
          Max Price: <strong>${price}</strong>
        </label>

        <input
          type="range"
          min="0"
          max="100000"
          step="500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

      </div>

      {/* RESET */}
      <button
        className="reset-btn"
        onClick={resetFilters}
      >
        Reset Filters
      </button>

    </div>
  );
}
