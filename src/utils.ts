export const hexToRGB = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

export const capitalizeFirstLetter = (str: string): string => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export const relativeDate = (date: string | number | Date): string => {
  const d = new Date(date);
  const delta = Math.round((+new Date() - +d) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (delta < 30) {
    return 'just now';
  } else if (delta < minute) {
    return delta + ' seconds ago';
  } else if (delta < 2 * minute) {
    return 'a minute ago';
  } else if (delta < hour) {
    return Math.floor(delta / minute) + ' minutes ago';
  } else if (Math.floor(delta / hour) == 1) {
    return '1 hour ago';
  } else if (delta < day) {
    return Math.floor(delta / hour) + ' hours ago';
  } else if (delta < day * 2) {
    return 'yesterday';
  } else {
    return delta + ' days ago';
  }
};

export const fetchWithError = async (url: string, opts?: RequestInit) => {
  const response = await fetch(url, opts);

  if (response.status !== 200) throw new Error('Error in request');

  const data = await response.json();
  const { error } = data;

  if (error) throw new Error(error);

  return data;
};
