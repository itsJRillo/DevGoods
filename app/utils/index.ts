export function dateFormatter(date: string | undefined) {
    if (!date) {
      return "";
    }
  
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-EN", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  