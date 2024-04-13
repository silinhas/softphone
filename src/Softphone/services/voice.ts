const getToken = async (url: string, identity: string) => {
  try {
    const fetchTokenUrl = new URL(url);
    fetchTokenUrl.searchParams.append("identity", identity);

    const response = await fetch(fetchTokenUrl.toString());
    const data = await response.json();
    return data.token;
  } catch (error) {
    throw new Error("Failed to fetch token.");
  }
};

export { getToken };
