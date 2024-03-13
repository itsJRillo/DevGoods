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
