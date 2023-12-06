export const baseApiUrl = "https://dummyjson.com";

export const loginApiUrl = `${baseApiUrl}/auth/login`;
export const productsApiUrl = `${baseApiUrl}/products`;
export const searchProductsApiUrl = `${productsApiUrl}/search`;
export const categoriesApiUrl = `${productsApiUrl}/categories`;

export const userApiUrl = (userId) => `${baseApiUrl}/users/${userId}`;
export const cartApiUrl = (userId) => `${baseApiUrl}/carts/user/${userId}`;
