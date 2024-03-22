export function dateFormatter(date: string | undefined) {
  if (!date) {
    return "";
  }

  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const storageURL =
  "https://iovmeejceocblildcubg.supabase.co/storage/v1/object/public/avatars/public";

export const storageProductURL =
  "https://iovmeejceocblildcubg.supabase.co/storage/v1/object/public/avatars/products";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  photo_url: string;
};

export type ReviewsUser = {
  id: string
  username: string
  email: string
  avatar_url: string
}

export type Review = {
  id: number
  user_id: number
  product_id: number
  rating: number
  comment: string
  created_at: string
}
