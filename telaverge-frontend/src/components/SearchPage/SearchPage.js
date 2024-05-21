import React, {useEffect, useState} from 'react';
import {urlConfig} from '../../config';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let baseUrl = `${urlConfig.backendUrl}/api/search/`;
      const queryParams = new URLSearchParams({}).toString();
      try {
        const response = await fetch(`${baseUrl}${queryParams}`);
        if (!response.ok) {
          throw new Error('Search failed');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log('Fetch error: ' + error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    const baseUrl = `${urlConfig.backendUrl}/api/search?`;
    const queryParams = new URLSearchParams({
      name: searchQuery,
    }).toString();

    try {
      const response = await fetch(`${baseUrl}${queryParams}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  const hideSearchOption = () => {
    let list = document.getElementById('list');
    list.style.display = 'none';
  };

  function searchProduct() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName('product');

    for (let i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = 'none';
      } else {
        x[i].style.display = 'block';
      }
    }
  }

  return (
    <div className='flex flex-col justify-center items-center my-5'>
      <div className='w-1/2 grid grid-cols-4 gap-1'>
        <input
          type='text'
          className='border rounded-lg p-1 px-2 col-span-3'
          placeholder='Search for items...'
          id='searchbar'
          value={searchQuery}
          onKeyUp={searchProduct}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClickCapture={() => {
            let list = document.getElementById('list');
            list.style.display = 'block';
          }}
        />
        <button
          className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          onClick={handleSearch}>
          Search
        </button>
        <ul
          id='list'
          className='col-span-4 text-center bg-gray-400/50 rounded hidden'>
          <li className='product my-1'>Lamp</li>
          <li className='product my-1'>Curtain</li>
          <li className='product my-1'>Bookshelf</li>
          <li className='product my-1'>Bookshelf</li>
          <li className='product my-1'>Desk</li>
          <li className='product my-1'>Chair</li>
          <li className='product my-1'>Desk Chair</li>
          <li className='product my-1'>Coffee Table</li>
          <li className='product my-1'>Coffee</li>
          <li className='product my-1'>Table</li>
          <li className='product my-1'>Laptop</li>
          <li className='product my-1'>Couch</li>
          <li className='product my-1'>TV Stand</li>
          <li className='product my-1'>Bed Frame</li>
          <li className='product my-1'>Cabinet</li>
        </ul>
      </div>

      <div
        className='w-full flex flex-row gap-3 justify-center flex-wrap my-8'
        onClick={hideSearchOption}>
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product.id} className='w-1/3 border rounded-lg'>
              <img
                src={urlConfig.backendUrl + product.image}
                alt={product.name}
                className='w-full h-52 object-contain'
              />
              <div className='p-2'>
                <h5 className='text-2xl my-2'>{product.name}</h5>
                <p className='text-left text-md'>
                  {product.description.slice(0, 70)}...
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='bg-red-400 text-white p-3 rounded-lg'>
            No products found. Please revise your filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
